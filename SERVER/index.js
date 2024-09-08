const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JWT for authentication

const app = express();
const port = 8000;

// Middleware
app.use(cors());
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
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to the User
    content: { type: String, required: true }, // Ensure content is required
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Secret key for JWT, remember to replace with a secure key in production
const JWT_SECRET = 'your-secret-key';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Store user info in request
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// Get all posts
app.get('/home/feed', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username'); // Populate userId to get usernames
        res.json({ data: posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Post a new feed
app.post('/home/feed', verifyToken, async (req, res) => {
    const inputData = req.body.data;
    
    if (!inputData) {
        return res.status(400).json({ message: "Input data is required" });
    }

    const newPost = new Post({
        userId: req.user.id,
        content: inputData,
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

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Successful signin
        return res.json({
            message: "Signin successful",
            token: token,
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
