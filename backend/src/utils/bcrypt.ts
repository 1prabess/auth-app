import bcrypt from "bcrypt";

export const hashPassword = async (
  value: string,
  saltRounds?: number
): Promise<string> => {
  return await bcrypt.hash(value, saltRounds || 10);
};

export const comparePassword = async (
  value: string,
  hashedValue: string
): Promise<boolean> => {
  return await bcrypt.compare(value, hashedValue);
};
