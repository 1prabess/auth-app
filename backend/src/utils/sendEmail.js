import mailer from "../lib/mailer.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (verificationToken, recipient) => {
  const subject = "Verify Your Email Address";
  const text = `Your verification code is: ${verificationToken}`;
  const template = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationToken
  );

  await mailer(template, recipient, subject, text);
  console.log("Verification Mail Sent Successfully");
};

export const sendWelcomeEmail = async (recipient) => {
  const subject = "Welcome to our app!";
  const text = `Hope you enjoy our company.`;
  await mailer(WELCOME_EMAIL_TEMPLATE, recipient, subject, text);
  console.log("Welcome Mail Sent Successfully");
};
