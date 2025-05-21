import mailer from "../lib/mailer.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (verificationToken, recipient) => {
  try {
    const subject = "Verify Your Email Address";
    const text = `Your verification code is: ${verificationToken}`;
    const template = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    );

    await mailer(template, recipient, subject, text);
    console.log("Verification Mail Sent Successfully");
  } catch (error) {
    console.log("Error sending verification mail:", error);
  }
};
