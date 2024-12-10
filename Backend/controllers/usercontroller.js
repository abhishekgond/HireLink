import { catchAsyncErrors } from "../middlewares/caatchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      password,
      FirstNiche,
      SecondNiche,
      thirdNiche,
      coverLetter,
      role,
    } = req.body;

    if (!name || !password || !email || !address || !phone || !role) {
      return next(new ErrorHandler("fileds Are required ", 400));
    }
    if (role === "job Seeker" && (!FirstNiche || !SecondNiche || !thirdNiche)) {
      return next(new ErrorHandler("provide job niches", 400));
    }
    const User_ = await User.findOne({ email });
    if (User_) {
      return next(new ErrorHandler("Email already Registerd...", 400));
    }
    const UserData = {
      name,
      phone,
      email,
      address,
      password,
      niches: {
        FirstNiche,
        SecondNiche,
        thirdNiche,
      },
      coverLetter,
      role,
    };

    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const resumeUrl = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "Job_Resume" }
          );
          if (!resumeUrl || resumeUrl.error) {
            return next(new ErrorHandler("File Does`t apload"));
          }
          UserData.resume = {
            public_id: resumeUrl.public_id,
            url: resumeUrl.secure_url,
          };
        } catch {
          return next(new ErrorHandler("Error Uploading Resume", 500));
        }
      }
    }
    const user = await User.create(UserData);
    res.status(201).json({
      success: true,
      message: "User Registered",
    });
  } catch (error) {
    return next(new ErrorHandler("fileds Are required ", 400));
  }
});
