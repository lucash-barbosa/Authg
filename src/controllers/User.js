const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "7d",
  });
};

// Signup user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

    const token = createToken(user._id);

    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { signupUser, loginUser };
