const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 8000;

// MongoDB connection string
const dbUri = "mongodb+srv://sanskarupadhyay:hello123@cluster1.uxo0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// CORS configuration
const corsOptions = {
    origin: ['https://unicognito.netlify.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204, // For successful OPTIONS preflight requests
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(helmet()); // Security headers
app.use(rateLimit({ // Rate limiter
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
}));

// Connect to MongoDB
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to database:'));
db.once('open', () => {
    console.log('DB connected');
});

// Define user schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Define post schema and model
const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Routes

// Get all posts
app.get('/home/feed', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('userId', 'username')
            .lean();
        res.json({ data: posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Post a new feed
app.post('/home/feed', async (req, res) => {
    const { userId, content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    const newPost = new Post({
        userId,
        content,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json({ data: savedPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Error creating post" });
    }
});

// Signup route
app.post("/home/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.json({ message: "Account has been created. Please login" });
    } catch (error) {
        console.error("Error signing up:", error);
        return res.status(500).json({ message: "Failed to create user" });
    }
});

// Signin route
app.post("/home/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Successful signin
        return res.json({
            message: "Signin successful",
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error("Error signing in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
