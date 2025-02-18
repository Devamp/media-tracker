const mongoose = require("mongoose");
const User = require("./models/user");

// function to establish connection to MongoDB
const ConnectDB = async () => {
  try {
    const mongoURI =
      "mongodb+srv://media-tracker:QCqKaQ8VjVTXrK8k@media-tracker.0rfau.mongodb.net/MediaTracker?retryWrites=true&w=majority&appName=media-tracker";

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// function to insert new User data into the database
const InsertUser = async (userData) => {
  try {
    await ConnectDB(); // establish connection

    // Check if the user already exists (based on email or username)
    const existingUser = await User.findOne({ email: userData.email }); // or use { username: userData.username }

    if (existingUser) {
      console.log("User already exists.");
      return false; // Return false to indicate user already exists
    }

    // If user doesn't exist, create a new user
    const newUser = await User.create(userData);
    console.log("User created successfully.");
    return true; // Return true to indicate success
  } catch (error) {
    console.log("Error inserting user:", error.message);
    return false; // Return false if there is an error
  }
};

// function to verify user log in information
const VerifyUser = async (userData) => {
  try {
    await ConnectDB(); // establish connection

    const user = await User.findOne({ email: userData.email });
    if (user && user.password === userData.password) {
      console.log("User verified successfully.");
      return true; 
    }
    console.log("Invalid credentials.");
  } catch (error) {
    console.log("Error verifying user:", error.message);
  }
  return false;
};

module.exports = { ConnectDB, InsertUser, VerifyUser };
