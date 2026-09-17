/**
 * Signup page — React Hook Form + Zod validation.
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Network, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { getErrorMessage } from "@/services/api";

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Enter your full name."),
    email: z.string().email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (values: SignupForm) => {
    try {
      await signup(values.email, values.fullName, values.password);
      toast.success("Account created! Let's get started 🚀");
      router.push("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-accent-100/60 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-accent-950/40">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent-300/30 blur-3xl dark:bg-accent-700/20" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary-300/30 blur-3xl dark:bg-primary-700/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-strong relative w-full max-w-md rounded-3xl p-8"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-bg text-white shadow-lg shadow-accent-500/30">
            <Network className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Start turning documents into stories
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Full name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="input-field"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input-field"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              className="input-field"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="Repeat your password"
              className="input-field"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isSubmitting}
          >
            <UserPlus className="h-4 w-4" />
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary-600 hover:underline dark:text-primary-400"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

