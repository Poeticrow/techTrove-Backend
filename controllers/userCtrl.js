const Users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  return res.status(200).json({
    message: "Successfully from controller",
  });
};

const usersignUp = async (req, res) => {
  const { name, email, password } = req.body;

  const alreadyExisting = await Users.findOne({ email });

  if (alreadyExisting) {
    return res
      .status(400)
      .json({ message: "This user account already exixt!" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new Users({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return res.status(200).json({
    mesasge: "Registration successful",
    User: newUser,
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const alreadyExisiting = await Users.findOne({ email });

  if (!alreadyExisiting) {
    return res.status(404).json({ message: "This user does not exist!" });
  }

  const isMatch = await bcrypt.compare(password, alreadyExisiting.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect email or password!" });
  }

  const payload = {
    id: alreadyExisiting._id,
    role: "user",
  };

  const activeToken = await jwt.sign(payload, process.env.Token, {
    expiresIn: "5h",
  });
  const accessToken = await jwt.sign(payload, process.env.Token, {
    expiresIn: "3m",
  });
  const refreshToken = await jwt.sign(payload, process.env.Token, {
    expiresIn: "3d",
  });

  alreadyExisiting.refreshToken = refreshToken;

  await alreadyExisiting.save();

  return res.status(200).json({
    message: "Login successful",
    accessToken,
    user: alreadyExisiting,
  });
};

module.exports = {
  getAllUsers,
  usersignUp,
  userLogin,
};
