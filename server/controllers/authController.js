import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import {
  Welcome_Email_Template,
  VERIFICATION_EMAIL_TEMPLATE,
  RESET_EMAIL_TEMPLATE,
} from "../config/emailtemplate.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Already Existing" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save(); // new user will saved into the database

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Coding Stars",
      html: Welcome_Email_Template.replace("{name}", name),
      category: "Email Verification",
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: "Successfully registered" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email Or Password are Required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "Login Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.status(200).json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account Already Verified" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", otp),
      category: "Email Verification",
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Verification OTP sent on email" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.status(404).json({ success: false, message: "Missing Details" });
  }
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(404).json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res
        .status(404)
        .json({ success: false, message: "OTP Expired Resend It" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified Successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Send Password Reset OTP

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(404)
      .json({
        success: false,
        message: "Email required",
      });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found with this email" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      html: RESET_EMAIL_TEMPLATE.replace("{verificationCode}", otp),
      category: "Reset Email Verification",
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Reset OTP sent to your email" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const resetPassword = async(req,res) => {
    const {email, otp, newPassword} =req.body;
    if(!email || !otp || !newPassword){
      return res.status(404).json({success: false, message: 'Email, OTP and NewPassword are required'});
    }
    try {
      
      const user = await userModel.findOne({email});
      if(!user) {
        return res.status(400).json({success: false, message: 'User not found in DB'});
      }
      if(user.resetOtp === "" || user.resetOtp !== otp){
        return res.status(400).json({success: false, message: 'Invalid OTP'});
      }
      if(user.resetOtpExpireAt < Date.now()){
        return res.status(400).json({success: false, message: 'OTP Expired'});
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.resetOtp = "";
      user.resetOtpExpireAt = 0;
      await user.save();

      return res.status(200).json({success: true, message: "Password has been reset successsfully"});

    } catch (error) {
      return res.status(401).json({success: false, message: error.message});
    }
};

