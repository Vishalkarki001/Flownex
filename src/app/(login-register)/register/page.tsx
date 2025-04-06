"use client";

import { z } from "zod";
import {RegisterSchema} from '@/app/zod/schema'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BiSolidShow, BiHide } from "react-icons/bi";
import RegisterAnimation from "@/app/animation/register";
import { addUser } from "@/app/firebase/firebase_filestore";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
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
import { auth, provider } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import { signInWithPopup } from 'firebase/auth';

export default function Register() {
  const router = useRouter()
  const [show, setShow] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      const  userCredential  = await createUserWithEmailAndPassword(auth,data.email,data.password)
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: data.username,
      });
      await addUser(data.email,data.username,user.uid)
      await sendEmailVerification(user);
      toast.success("Email Verificaton sent to Your email")
      router.push("/login")
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error("This email is already in use.");
      } else {
        toast.error("Something went wrong during registration.");
      }
      console.log("Firebase Auth Error:", error);
    }
  };
  const handlegooglesignup = async () =>{
    try {
      const res = await signInWithPopup(auth,provider)
      const user = res.user;
      await addUser(user.email,user.displayName,user.uid)
      toast.success("User Signup Sucessfully!")
      router.push("/user-dashboard")
    } catch (error) {
      
    }
  }


  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-500 to-orange-300 dark:from-gray-900 dark:to-gray-800 p-4">
    {/* Left side animation - visible on medium and up */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
    >
      <div className="max-w-sm w-full">
        <RegisterAnimation />
      </div>
    </motion.div>
  
    {/* Right side - Registration Form */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full md:w-1/2 max-w-md mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-white dark:text-gray-200 text-center mb-6">
        Create an Account
      </h2>
  
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white text-white text-lg md:text-2xl">Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your username"
                    className="dark:bg-gray-800 text-white text-lg md:text-2xl dark:border-gray-600 p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white text-white text-lg md:text-2xl">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    className="dark:bg-gray-800 text-white text-lg md:text-2xl dark:border-gray-600 p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white text-white text-lg md:text-2xl">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={show ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pr-10 dark:bg-gray-800 text-white text-lg md:text-2xl dark:border-gray-600 p-3"
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                    >
                      {show ? <BiHide size={20} /> : <BiSolidShow size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 rounded-lg text-lg md:text-xl"
          >
            Sign Up
          </Button>
        </form>
      </Form>
  
      {/* Google Sign Up */}
      <Button
        onClick={handlegooglesignup}
        className="w-full py-3 rounded-lg text-lg md:text-xl flex items-center justify-center gap-2 mt-2"
      >
        <FcGoogle size={24} /> Sign up with Google
      </Button>
  
      {/* Already have account? */}
      <p className="text-center dark:text-white text-gray-800 text-base mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </motion.div>
  </div>
  
  );
}
