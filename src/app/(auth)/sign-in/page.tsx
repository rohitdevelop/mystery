"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { signInSchema } from "@/src/schemas/signInSchema";
import { signIn } from "next-auth/react";

const SigninPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    setIsSubmitting(false);

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast.error("Invalid username/email or password");
      } else {
        toast.error(result.error || "Something went wrong");
      }
      return;
    }

    if (result?.url) {
      router.replace("/dhasbord");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center px-4">
      <div className="bg-white text-black rounded-xl shadow-lg p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500">Sign in to continue your journey</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* Identifier */}
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email / Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email or username" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-opacity-90 transition duration-200 flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

          </form>
        </Form>

        {/* Footer */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-black hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SigninPage;
