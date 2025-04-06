"use client";

import { z } from "zod";
import { LoginSchema } from "@/app/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import { BiSolidShow, BiHide } from "react-icons/bi";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateemailstatus } from "@/app/firebase/firebase_filestore";

export default function Register() {
  const router = useRouter()
  const [show, setShow] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try{
    const userCredential = await signInWithEmailAndPassword(auth,data.email,data.password)
    const user = userCredential.user;
    if(user.emailVerified){
    toast.success("user login sucessfully")
    await updateemailstatus(user.uid,user.emailVerified)
    router.push("/user-dashboard")
    }else{
      toast.error("Verified Your Email first , check your mail")
      router.push("/login")
    }
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      toast.error("No user found with this email.");
    } else if (error.code === 'auth/wrong-password') {
      toast.error("Incorrect password.");
    } else {
      toast.error("Invalid email or password.");
    }
    console.log("Login error:", error);
  }
};
const resetpassword = async () => {
  const email = form.getValues("email");
  if (!email) {
    toast.error("Please enter your email first.");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent! Check your inbox.");
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      toast.error("No user found with this email.");
    } else if (error.code === "auth/invalid-email") {
      toast.error("Invalid email address.");
    } else {
      toast.error("Something went wrong. Try again later.");
    }
    console.log("Reset error:", error);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-orange-300 dark:from-gray-900 dark:to-gray-800 px-4 py-10">
    <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white dark:text-gray-200 text-center mb-6">
        Login to Your Account
      </h2>
  
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-lg sm:text-xl">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="text-base sm:text-lg dark:bg-gray-800 text-white dark:border-gray-600 p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-lg sm:text-xl">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={show ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      className="pr-10 text-base sm:text-lg dark:bg-gray-800 text-white dark:border-gray-600 p-3"
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
                    >
                      {show ? <BiSolidShow size={22} /> : <BiHide size={22} />}
                    </button>
                  </div>
                </FormControl>
                <div className="mt-1">
                  <Link
                    href="#"
                    onClick={resetpassword}
                    className="text-md text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Submit Button */}
          <Button type="submit" className="w-full py-3 rounded-lg text-lg">
            Login
          </Button>
        </form>
      </Form>
  
      {/* Signup Link */}
      <p className="text-center text-white text-sm sm:text-base mt-5">
        Dont have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  </div>
  
  
  );
}
