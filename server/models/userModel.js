import mongoose from "mongoose";
import { Schema } from "mongoose";
import { model } from "mongoose";

const UserSchema = Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
});

export const User = model("User", UserSchema);
