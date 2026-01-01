export interface ApiSuccessResponse<T = unknown> {
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  message: string;
  errorCode: string;
  validationError?: {
    path: string;
    message: string;
  };
}
