import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function mailer(template, recipient, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Auth App" <${process.env.USER_EMAIL}>`,
      to: recipient,
      replyTo: process.env.USER_EMAIL,
      subject,
      text: text,
      html: template,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
}

export default mailer;
