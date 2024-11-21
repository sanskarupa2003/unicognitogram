require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Environment variables
const port = process.env.PORT || 8000;
const dbUri = process.env.MONGODB_URI || "mongodb+srv://sanskarupadhyay:hello123@cluster1.uxo0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const allowedOrigins = [
    'https://unicognito.netlify.app',
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean);

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
};

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { message: "Too many requests, please try again later." }
});

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);

// Error handling for JSON parsing
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: "Invalid JSON" });
    }
    next();
});

// Connect to MongoDB with retry logic
const connectDB = async () => {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

connectDB();

// MongoDB connection error handling
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    connectDB();
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    password: { 
        type: String, 
        required: true 
    },
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

// Post Schema
const postSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    content: { 
        type: String, 
        required: true,
        trim: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

// Health check route
app.get('/', (req, res) => {
    res.json({ 
        status: 'Server is running',
        environment: process.env.NODE_ENV
    });
});

// Get all posts
app.get('/home/feed', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('userId', 'username')
            .sort({ createdAt: -1 }) // Sort by newest first
            .lean();
        
        res.json({ 
            success: true,
            data: posts 
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching posts",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Post a new feed
app.post('/home/feed', async (req, res) => {
    const { userId, content } = req.body;

    if (!content?.trim()) {
        return res.status(400).json({ 
            success: false,
            message: "Content is required" 
        });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }

        const newPost = new Post({
            userId,
            content: content.trim()
        });

        const savedPost = await newPost.save();
        const populatedPost = await Post.findById(savedPost._id)
            .populate('userId', 'username')
            .lean();

        res.status(201).json({ 
            success: true,
            data: populatedPost 
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ 
            success: false,
            message: "Error creating post",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Signup route
app.post("/home/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password) {
        return res.status(400).json({ 
            success: false,
            message: "All fields are required" 
        });
    }

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "User already registered" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ 
            success: true,
            message: "Account has been created. Please login" 
        });
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to create user",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Signin route
app.post("/home/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
        return res.status(400).json({ 
            success: false,
            message: "Email and password are required" 
        });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "Invalid email or password" 
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid email or password" 
            });
        }

        res.json({
            success: true,
            message: "Signin successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        success: false,
        message: "An unexpected error occurred",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Graceful shutdown
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    // Graceful shutdown
    process.exit(1);
});