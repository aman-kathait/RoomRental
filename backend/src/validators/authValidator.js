import { body } from "express-validator";

export const userRegisterValidator = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .notEmpty()
    .withMessage("Email field cannot be empty."),
  body("password")
    .notEmpty()
    .withMessage("Password field cannot be empty.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character."),
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Full name must contain only letters and spaces"),
  body("role").notEmpty().withMessage("Role field cannot be empty."),
  body("contactNumber")
    .notEmpty()
    .withMessage("Contact number field cannot be empty.")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number must be exactly 10 digits long.")
    .matches(/^[0-9]+$/)
    .withMessage("Contact number must contain only digits"),
];

export const userLoginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .notEmpty()
    .withMessage("Email field cannot be empty."),
  body("password").notEmpty().withMessage("Password field cannot be empty."),
];

export const userChangeCurrentPasswordValidator = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Current password field cannot be empty."),
  body("newPassword")
    .notEmpty()
    .withMessage("New password field cannot be empty.")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long.")
    .matches(/[a-z]/)
    .withMessage("New password must contain at least one lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("New password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("New password must contain at least one number.")
    .matches(/[@$!%*?&]/)
    .withMessage("New password must contain at least one special character."),
];
export const resetPasswordValidator = [
  body("newPassword")
    .notEmpty()
    .withMessage("New password field cannot be empty.")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long.")
    .matches(/[a-z]/)
    .withMessage("New password must contain at least one lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("New password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("New password must contain at least one number.")
    .matches(/[@$!%*?&]/)
    .withMessage("New password must contain at least one special character."),
];
