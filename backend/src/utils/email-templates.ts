const baseUrl = "http://localhost:4004";

export const getVerificationEmailTemplate = (code: string) => {
  const verificationLink = `${baseUrl}/auth/email/verify/${code}`;

  return `
  <div>
    <h2>Email verification</h2>
    <p>Click the link below to verify your account:</p>
     <a href="${verificationLink}">${verificationLink}</a>
    <p>This code will expire in 1 year.</p>
  </div>
`;
};

export const getPasswordResetEmailTemplate = (resetUrl: string) => {
  return `
  <div>
    <h2>Password reset request</h2>
    <p>We received a request to reset your password.</p>
    <p>Click the link below to set a new password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>This link will expire in 1 hour.</p>
    <p>If you did not request a password reset, you can safely ignore this email.</p>
  </div>
  `;
};
