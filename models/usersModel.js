const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, lowercase: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    roles: { type: String, enum: ["admin", "user"], default: "user" },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
