const express = require("express");
const cors = require("cors");
const DB = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

const port = 5001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  try {
    if (req.body) {
      // check all body parms and save as lowecase
      const email = req.body.email ? req.body.email.toLowerCase() : "";
      const password = req.body.password ? req.body.password : "";

      const response = await DB.VerifyUser({ email, password });

      if (!response) {
        return res.status(402).send("Invalid credentials");
      }

      res.status(200).send("User verified successfully!");
    } else {
      res.status(400).send("Invalid request data");
    }
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
});

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

      res.status(200).send("User registered successfully!");
    } else {
      res.status(400).send("Invalid request data");
    }
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
