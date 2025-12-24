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
