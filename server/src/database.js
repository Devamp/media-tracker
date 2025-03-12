const mongoose = require("mongoose");
const User = require("./models/user");
const Log = require("./models/Log");

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

// function to update the users preferences based on userEmail
const InsertPreferences = async ({
  musicPreferences,
  audiobookPreferences,
  podcastPreferences,
  userEmail,
}) => {
  try {
    await ConnectDB(); // establish connection
    const existingUser = await User.findOne({ email: userEmail });

    if (existingUser) {
      await User.findOneAndUpdate(
        { email: userEmail },
        {
          musicPreferences: musicPreferences,
          audiobookPreferences: audiobookPreferences,
          podcastPreferences: podcastPreferences,
        }
      );
      console.log("User preferences updated.");
      return { user: existingUser.user, email: existingUser.email };
    }

    console.log("User does not exist");
    return false;
  } catch (error) {
    console.log("Error inserting user:", error.message);
    return false; // Return false if there is an error
  }
};

// function to insert new User data into the database
const InsertUser = async (userData) => {
  try {
    await ConnectDB(); // establish connection

    // Check if the user already exists (based on email or username)
    const existingUser = await User.findOne({ email: userData.email });

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

    const user = await User.findOne({ email: userData.userEmail });
    if (user && user.password === userData.userPassword) {
      console.log("User verified successfully.");
      return { username: user.user };
    }
    console.log("Invalid credentials.");
  } catch (error) {
    console.log("Error verifying user:", error.message);
  }
  return false;
};

// function to insert log data for current user
const InsertLog = async (logData) => {
  try {
    await ConnectDB(); // establish connection

    // Check if the user already exists (based on email)
    const existingUser = await Log.findOne({ userEmail: logData.userEmail });

    if (existingUser) {
      // Append the new media log to the 'data' array for the existing user
      await Log.findOneAndUpdate(
        { userEmail: logData.userEmail },
        {
          $push: {
            data: {
              mediaName: logData.mediaName,
              mediaImage: logData.mediaImage,
              mediaCategory: logData.mediaCategory,
              date: logData.mediaDate || Date.now(), // use provided mediaDate or current date
            },
          },
        }
      );
      console.log(`Log updated for ${logData.userEmail}`);
      return true; // Update successful
    }

    // If user doesn't exist, create a new user log
    const newLog = await Log.create({
      userEmail: logData.userEmail,
      data: [
        {
          mediaName: logData.mediaName,
          mediaImage: logData.mediaImage,
          mediaCategory: logData.mediaCategory,
          date: logData.mediaDate || Date.now(),
        },
      ],
    });
    console.log(`Log created for ${logData.userEmail}`);
    return true; // Creation successful
  } catch (error) {
    console.log("Error inserting or updating log:", error.message);
    return false; // Return false if there is an error
  }
};

// function to fetch user logs and return them
const GetUserLogs = async (userEmail) => {
  try {
    await ConnectDB(); // establish connection

    const user = await Log.findOne({ userEmail: userEmail });
    
    // if there is a match
    if (user) {
      return user.data;
    }
    // otherwise return error
    console.log(`Couldn't find a user with ${userEmail} to fetch logs.`);
  } catch (error) {
    console.log("Error fetching user logs:", error.message);
  }
  return false;
};

module.exports = {
  ConnectDB,
  InsertUser,
  VerifyUser,
  InsertPreferences,
  InsertLog,
  GetUserLogs,
};
