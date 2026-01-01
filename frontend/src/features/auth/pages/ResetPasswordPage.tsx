import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useSearchParams } from "react-router";
import type { ResetPasswordFormData } from "../api/auth.types";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));

  const [password, setPassword] = useState<string>("");

  const valid = code && exp > Date.now();

  if (!valid) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <h1 className="text-xl font-semibold text-red-400">
          Invalid or expired token
        </h1>
      </div>
    );
  }

  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleSubmit = () => {
    const resetPasswordData: ResetPasswordFormData = {
      verificationCode: code,
      password,
    };

    resetPassword(resetPasswordData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8  shadow border">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h2>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              New Password
            </label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter new password"
              className="border border-gray-300 focus:border-gray-600 focus:ring-0 text-sm h-10 px-2 rounded"
            />
          </div>

          <Button onClick={handleSubmit} disabled={isPending} type="button">
            Reset password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
