import User from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { sendEmail, emailVerificationContent } from "../utils/mail.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, fullName, password, avatar, role, contactNumber } = req.body;

  if (!email || !fullName || !password || !role || !contactNumber) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    email,
    fullName,
    password,
    avatar,
    role,
    contactNumber,
    isEmailVerified: false,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save();

  await sendEmail({
    email: user.email,
    subject: "Verify your Email",
    mailgenContent: emailVerificationContent(
      user.fullName,
      `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email?token=${unHashedToken}`
    ),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -forgotPasswordToken -forgotPasswordExpiry -emailVerificationToken -emailVerificationExpiry"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, { user: createdUser }, "User registered successfully"));
});
