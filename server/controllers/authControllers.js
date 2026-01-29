import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transtorter from "../config/nodemailer.js";
import userModel from "../models/userModel.js";


export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing details ",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exist.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", //in jwt we have payload, secret, expiresIn
    });

    res.cookie("token", token, {
      //called as options
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //it will be true if in .env its production (https only)else false if development because it should be false if we are running project in local
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //in strict it allow to send cookie if req is from same site/domain
      maxAge: 7 * 24 * 60 * 60 * 1000, //beacuse it should be in milliseconds
    });

    const mail = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Welcome ${name}`,
      text: `You are sucessfully registered whith ${email}`,
      html: `<h2>Welcome ${name}</h2>
        <p>You are successfully registered with <b>${email}</b></p>
    `, //either text will be displayed or html not both.
    };

    await transtorter.sendMail(mail);

    return res.json({ success: true });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Enter both email and password",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Email id is not registered.",
      });
    }

    const checkPw = await bcrypt.compare(password, user.password);

    if (!checkPw) {
      return res.json({ success: false, message: "password is incorrect" });
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

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Logged out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    // const { userId } = req.body;
    const userId = req.user.id;


    const user = await userModel.findById( userId );

    if (user.isAccountVerified) {
      res.json({ success: false, message: "This email is already verified." });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    //string because otp can start with 0 also like 001233 so with string we can compair properly

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mail = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verification OTP",
      text: `Use this OTP to verify your account ${otp}`,
    };

    await transtorter.sendMail(mail);
    return res.json({ success: true, message: "OTP sent on your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {

    const userId = req.user.id;
    const { otp } = req.body;

    if (!userId || !otp) {
      return res.json({ success: false, message: "Missing details" });
    }

    const user = await userModel.findById(userId); //because findbyid accepts only id not obj

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Otp is expired" });
    }

    if(user.verifyOtp !== otp){
        return res.json({success:false, message:"Otp is incorrect."})
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Account is succesfully verified.",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
