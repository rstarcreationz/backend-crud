const mongoose = require("mongoose");

const loginschema = new mongoose.Schema({
  email: { required: true, type: String },
  password: { required: true, type: String },
});

module.exports = mongoose.model("login", loginschema);
