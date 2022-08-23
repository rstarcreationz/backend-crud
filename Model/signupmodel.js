const mongoose = require("mongoose");

const SignupdataSchema = new mongoose.Schema({
  fullname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  number: {
    required: true,
    type: Number,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("signup", SignupdataSchema);
