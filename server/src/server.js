const express = require("express");
const cors = require("cors");
const DB = require("./database");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const port = 5001;

// login route to process user login and jwt token creation
app.post("/login", async (req, res) => {
  try {
    if (req.body) {
      // check all body parms and save as lowecase
      const userEmail = req.body.email ? req.body.email.toLowerCase() : "";
      const userPassword = req.body.password ? req.body.password : "";

      const response = await DB.VerifyUser({ userEmail, userPassword });

      if (response == false) {
        return res.status(402).send("Invalid credentials");
      }

      const user = { id: response.username, email: userEmail };

      // sign the JWT with a secret key and set an expiration
      const token = jwt.sign(
        user,
        "bBGIn68xpGu0k1LP0HFleWEculQqZEmK23ZGNGjYegA",
        {
          expiresIn: "1h", // 1 hour expire time
        }
      );

      res.status(200).send({ token }); // send token back
    } else {
      res.status(400).send("Invalid request data");
    }
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
});

// signup route to process new user signups
app.post("/signup", async (req, res) => {
  try {
    if (req.body) {
      // check all body parms and save as lowecase
      const user = req.body.user ? req.body.user.toLowerCase() : "";
      const email = req.body.email ? req.body.email.toLowerCase() : "";
      const password = req.body.password ? req.body.password : "";

      const response = await DB.InsertUser({ user, email, password });

      if (!response) {
        return res.status(401).send("Invalid Key");
      }

      res.status(200).send("New user registered successfully");
    } else {
      res.status(400).send("Invalid request data");
    }
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
});

// route to update user preferences during onboarding and jwt token creation (supports /signup)
app.post("/submit-preferences", async (req, res) => {
  try {
    if (req.body) {
      const musicPreferences = req.body.musicPreferences
        ? req.body.musicPreferences
        : [];
      const audiobookPreferences = req.body.audiobookPreferences
        ? req.body.audiobookPreferences
        : [];
      const podcastPreferences = req.body.podcastPreferences
        ? req.body.podcastPreferences
        : [];
      const userEmail = req.body.userEmail ? req.body.userEmail : "";

      const preferences = {
        musicPreferences,
        audiobookPreferences,
        podcastPreferences,
        userEmail,
      };

      // update the user's preferences with given preferences
      const response = await DB.InsertPreferences(preferences);

      // define user to sign the JWT
      const newUser = { id: response.user, email: response.email };

      // sign the JWT with a secret key and set an expiration
      const token = jwt.sign(
        newUser,
        "bBGIn68xpGu0k1LP0HFleWEculQqZEmK23ZGNGjYegA",
        {
          expiresIn: "1h", // 1 hour expire time
        }
      );

      if (!response) {
        return res.status(401).send("Invalid Key");
      }

      res.status(200).send({ token });
    } else {
      res.status(400).send("Invalid request data");
    }
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
});

// route to fetch current [logged in] user's information
app.get("/user-data", (req, res) => {
  const authHeader = req.headers["authorization"];

  // check if the Authorization header exists
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]; // extract token from "Bearer <token>"

    // verify the token
    jwt.verify(
      token,
      "bBGIn68xpGu0k1LP0HFleWEculQqZEmK23ZGNGjYegA",
      (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Token is invalid or expired" });
        }

        // if token is valid, decoded contains the user data
        const user = decoded;
        res.status(200).json({ user });
      }
    );
  } else {
    res.status(401).json({ message: "Authorization token not provided" });
  }
});

// start server 
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
