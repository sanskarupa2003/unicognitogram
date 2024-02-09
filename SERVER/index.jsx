const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const port = 8000;
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/unicog", {
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

let responseData = [];

// Parse JSON bodies
app.use(bodyParser.json());


app.post('/home/feed', (req, res) => {
    const inputData = req.body.data;
    // Store the posted data in memory
    responseData.push(inputData);
    // Send back the posted data
    res.json({ data: inputData });
});

app.get('/home/feed', (req, res) => {
    // Send back only the data posted during the current session
    res.json({ data: responseData });
});


// Signin route
app.post("/home/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (password === user.password) {
            return res.json({ message: "Signin successful", user: user });
        } else {
            return res.status(401).json({ message: "Incorrect password" });
        }
    } catch (error) {
        console.error("Error signing in:", error);
        return res.status(500).json({ message: "Internal server error" });
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
        const newUser = new User({
            username,
            email,
            password,
        });
        await newUser.save();
        return res.json({ message: "Account has been created. Please login" });
    } catch (error) {
        console.error("Error signing up:", error);
        return res.status(500).json({ message: "Failed to create user" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

