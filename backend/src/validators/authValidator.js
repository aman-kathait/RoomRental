import { body } from "express-validator";

export const userRegisterValidator =  [
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
      .notEmpty()
      .withMessage("Full name field cannot be empty."),
    body("role")
      .notEmpty()
      .withMessage("Role field cannot be empty."),
    body("contactNumber")
      .notEmpty()   
      .withMessage("Contact number field cannot be empty.")
      .isLength({ min: 10, max: 10 })
      .withMessage("Contact number must be exactly 10 digits long.")
];

export const userLoginValidator = [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address.")
      .notEmpty()
      .withMessage("Email field cannot be empty."),
    body("password")
      .notEmpty()
      .withMessage("Password field cannot be empty.")
];
