const mongoose = require("mongoose");

const logDetailSchema = new mongoose.Schema({
  mediaName: {
    type: String,
    required: true,
  },
  mediaImage: {
    type: String,
    required: true,
  },
  mediaCategory: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const logSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    data: {
      type: [logDetailSchema],
      required: true,
    },
  },
  {
    collection: "Logs",
  }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
