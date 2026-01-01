export type ApiSuccessResponse<T = unknown> = {
  message: string;
  data?: T;
};

export interface ApiErrorResponse {
  message: string;
  errorCode: string;
  validationError?: {
    path: string;
    message: string;
  };
}

export type User = {
  id: string;
  email: string;
  role: "user" | "admin";
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
