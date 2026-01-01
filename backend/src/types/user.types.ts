export type User = {
  id: string;
  email: string;
  role: "user" | "admin";
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
