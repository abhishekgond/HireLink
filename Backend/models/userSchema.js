import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { validate } from "node-cron";

const userSchema = new mongoose.Schemma({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name Must Contain atlist 3 Character"],
    maxLength: [30, "Name Shoud Not more Then 30 character"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Enter Valid Email "],
  },
  phone: {
    type: Number,
    maxLength: [12, "Please Enter Valid Mobile Number"],
    minLength: [10, "Please Enter Valid Mobile Number "],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password Should Not Less then 8 Character"],
    maxLength: [32, "Password scould Not More The 32 character password "],
  },
  role: {
    type: String,
    required: true,
    enum: ["job Seeker", "Employer"],
  },
  address: {
    type: String,
    required: true,
  },
  niches: {
    FirstNiche: String,
    SecondNiche: String,
    ThirdNiche: String,
  },
  resume: {
    type: String,
    url: String,
  },
  coverLetter: {
    type: Strign,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const User = mongoose.model("User", userSchema);
