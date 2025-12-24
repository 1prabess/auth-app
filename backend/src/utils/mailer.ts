import nodemailer from "nodemailer";
import { EMAIL, EMAIL_APP_PASSWORD } from "../constants/env";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: EMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  const info = await transporter.sendMail({
    from: `"Auth App" <${EMAIL}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent: %s", info.messageId);
  return info;
};
