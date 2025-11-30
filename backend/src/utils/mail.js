import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Room Rental",
      link: "http://localhost:3000/",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(
    options.mailgenContent,
  );
  const emailHTML = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USERNAME,
      pass: process.env.MAILTRAP_SMTP_PASSWORD,
    },
  });

  const mail = {
    from: "amankathait2003@gmail.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHTML,
  };
  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
const emailVerificationContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to Room Rental! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Room Rental, please click here:",
        button: {
          color: "#22BC66",
          text: "Confirm your account",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "You have requested to reset your password.",
      action: {
        instructions: "To reset your password, please click here:",
        button: {
          color: "#2d53fbff",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { emailVerificationContent, forgotPasswordContent, sendEmail };
