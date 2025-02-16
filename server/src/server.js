const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const port = 5001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  if (req.body) {
    // logic for verifcation successful
    const { email, password } = req.body;
    res.status(200);

  } else {
    // logic if verification failed
    res.status(400);
  }

  // send the server response
  res.send();
});

app.post("/signup", (req, res) => {
  if (req.body) {
    const { user, email, password } = req.body;
    console.log(user, email, password);
    res.status(200);
  } else {
    res.status(400);
  }
  res.send();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
