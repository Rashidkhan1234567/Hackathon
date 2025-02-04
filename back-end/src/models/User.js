const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cnic: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  change_password : { type: String, default: "true"}
});

module.exports = mongoose.model("User", userSchema);
