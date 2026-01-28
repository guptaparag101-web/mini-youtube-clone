const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { email, password, channelName } = req.body;

    if (!email || !password || !channelName) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: channelName,       
      email,
      password: hashedPassword,
      channelName,
    });

    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        channelName: user.channelName,
      },
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Signup failed" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        channelName: user.channelName
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { signup, login };
