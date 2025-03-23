"use client";

import { z } from "zod";
import formSchema from "@/app/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BiSolidShow, BiHide } from "react-icons/bi";
import RegisterAnimation from "@/app/animation/register";
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

export default function Register() {
  const [show, setShow] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    toast.success("Register sucessfully")
  };

  return (
    <div className=" min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-500 to-orange-300 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Left side animation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
       className="hidden md:block md:w-1/2">
    <RegisterAnimation />
     </motion.div>

      {/* Right side - Registration Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 p-6 "
      >
        <h2 className="text-3xl font-semibold text-white dark:text-gray-200 text-center mb-6">
          Create an Account
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-white text-white text-2xl">Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your username"
                      className="dark:bg-gray-800 text-white text-2xl dark:border-gray-600 p-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-white text-white text-2xl">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="dark:bg-gray-800 text-white text-2xl dark:border-gray-600 p-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-white text-white text-2xl">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10 dark:bg-gray-800 text-white text-2xl dark:border-gray-600 p-3"
                      />
                      <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                      >
                        {show ? <BiHide size={24} /> : <BiSolidShow size={24} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-3 rounded-lg text-xl"
            >
              Register
            </Button>
          </form>
        </Form>

        <p className="text-center dark:text-white text-gray-800 text-lg mt-4"> Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a> 
        </p>   
      </motion.div>
    </div>
  );
}
