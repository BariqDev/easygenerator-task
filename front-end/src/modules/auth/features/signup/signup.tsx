import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { passwordRegex } from "../../../../util/const";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const schema = z
    .object({
      name: z.string().min(5, "name must be at least 5 characters"),
      email: z.email({ error: "Invalid Email address" }),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(passwordRegex, {
          message:
            "Password must contain at least one letter, one number, and one special character",
        }),
    })
    .required();

  //  type Schema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <>
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-block p-3 bg-linear-to-br from-purple-600 to-pink-500 rounded-full mb-2">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-500">Sign up to get started</p>
      </div>

      {/* Form fields */}
      <form
        onSubmit={handleSubmit((data) => {
          // handle inputs
          console.log(data);
        })}
        className="flex flex-col gap-2"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              {...register("name")}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="John Doe"
            />
            {errors.name?.message && (
              <span className="text-xs text-red-500">{errors.name?.message}</span>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              {...register("email")}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="john@example.com"
            />
            {errors.email?.message && (
              <span className="text-xs text-red-500">{errors.email?.message}</span>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password?.message && (
              <span className="text-xs text-red-500">{errors.password?.message}</span>
            )}

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-linear-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200"
        >
          Sign Up
        </button>
      </form>

      {/* submit button */}
    </>
  );
};

export default SignupForm;
