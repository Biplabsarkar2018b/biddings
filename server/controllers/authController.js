import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  if (req.method === "GET")
    return res.status(400).json({ error: "Bad Request" });
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  const existingUser = await User.findOne({ email });
  if (existingUser === null) {
    try {
      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, password: hashedPass });
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
      return res
        .status(200)
        .json({ message: "User created", data: { user: newUser, token } });
    } catch (error) {
      return res.status(400).json({ error: "User could not be created" });
    }
  }

  const isPasswordMatching = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordMatching)
    return res.status(404).json({ error: "Wrong password" });
  const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);
  return res
    .status(200)
    .json({ message: "Success", data: { user: existingUser, token } });
};

export const getUserData = async(req,res)=>{
  try {
    const {id} = req.body;
    const user = await User.findById(id);
    if(!user) return res.status(404).json({error:"User Not Found"});
    return res.status(200).json({user:user});
  } catch (error) {
    return res.status(404).json({error:"User Not Found"});
  }
}
