import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = () => {
    forgotPassword(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 shadow border">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter your email below and we’ll send you a link to reset your
          password.
        </p>
        <form className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="border border-gray-300 focus:border-gray-600 rounded-none focus:ring-0 text-sm h-10"
            />
          </div>

          <Button
            type="button"
            disabled={isPending}
            onClick={handleSubmit}
            className="w-full bg-black text-white hover:bg-gray-800 text-sm h-10"
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
