import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

 
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }


    const user = await User.findOne({ userName });
    if (user) {
      return res
        .status(400)
        .json({
          message: "Username already exists. Please try a different one.",
        });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

  
    await User.create({
      userName,
      fullName,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    res.status(201).json({
      message: "Account successfully created",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

   
    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

  
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }

   
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }

  
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

   
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};


export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message:"logged out successfully."
        })
    } catch (error) {
        
    }
}
export const getOtherUsers = async (req, res) => {
  try {
    const LoggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: LoggedInUserId } }).select("-password")
    return res.status(200).json(otherUsers)
  } catch (error) {
    console.log(error);
  }
}