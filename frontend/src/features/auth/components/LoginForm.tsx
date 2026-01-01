import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signIn, isPending } = useLogin();

  const onSubmit = (formData: LoginFormData) => {
    signIn(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white border">
        <h2 className="text-2xl font-semibold mb-6 ">Login</h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={`border border-gray-300 focus:border-gray-600 focus:ring-0 text-sm h-9 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={`border border-gray-300 focus:border-gray-600 focus:ring-0 text-sm h-9 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}

            {/* Forgot Password Link */}
            <div className=" mt-1">
              <Link
                to="/password/forgot"
                className="text-sm text-black hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-sm bg-black text-white hover:bg-gray-800"
          >
            Login
          </Button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-black hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
