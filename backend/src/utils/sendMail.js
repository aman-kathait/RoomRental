import sgMail from "@sendgrid/mail";

export const sendEmail = async ({ email, subject, mailgenContent }) => {
  // Ensure the API key is set at call time, after dotenv has loaded .env
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject,
    html: mailgenContent,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error("Error sending email via SendGrid:");
    console.error("Status code:", error.code);
    console.error("Response body:", error.response?.body);
    throw error;
  }
};
