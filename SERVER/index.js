const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 8000;

// CORS configuration
const corsOptions = {
    origin: ['https://unicognito.netlify.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://sanskarupadhyay:hello123@cluster1.uxo0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", {
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
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

// Define post schema and model
const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Get all posts
app.get('/home/feed', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username');
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