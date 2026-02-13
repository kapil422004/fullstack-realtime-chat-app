import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password do not match.",
      });
    }

    const checkUserName = await User.findOne({ userName });

    if (checkUserName) {
      return res.status(400).json({
        message: "Username is already taken.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const maleProfilePhoto = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${userName}&flip=true`;
    const femaleProfilePhoto = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${userName}&flip=true`;

    const user = await User.create({
      fullName,
      userName,
      password: hashPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    return res.status(201).json({
      success: true,
      message: "Account created succesfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username is not registered.",
      });
    }

    const isPwMatch = await bcrypt.compare(password, user.password);
    if (!isPwMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect.",
      });
    }

    const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECERET,
      { expiresIn: "1d" },
    );

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        http: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .json({
        success: true,
        message: `Welcome back ${user.fullName}`,
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password",
    );
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};
