"use client";
import HomeAnimation from "@/app/(Static)/animation/home";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import About from "../about/page";
import Contact from "../contact/page";
export default function Home() {
  return (
    <>
    <div className="bg-gradient-to-r from-blue-500 to-orange-200 dark:from-gray-900 dark:to-gray-800 text-white min-h-screen flex flex-col md:flex-row items-center justify-center px-6">
      <div className="md:w-1/2 text-center md:text-left">
        <motion.h1 className="text-7xl md:text-8xl font-extrabold drop-shadow-xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay:0.5, duration: .4 }}>
          FLOWNEX
        </motion.h1>
        <motion.p
         className="text-xl md:text-2xl mt-4 font-semibold opacity-100"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.5, duration: .4 }}>
          "Empower Teams, Simplify Workflows, Achieve Success."
        </motion.p>
        <motion.p className="text-lg font-medium md:text-lg mt-6 max-w-lg opacity-95"
           initial={{ opacity: 0 , y:50 }}
           animate={{ opacity: 1, y:0 }}
           transition={{ delay: 0.5, duration: 1 }}>
          Flownex is a cutting-edge collaboration platform designed to bring 
          teams together, optimize workflows, and drive success through seamless 
          project management.
        </motion.p>
        <motion.div className="mt-8"
        initial={{opacity:0 , y:50}}
        animate={{opacity:1 , y:0}}
        transition={{delay:0.5 , duration:.4}}
        >
          <Button
          >
          <Link
            href="/start"
          >
            Get Started
          </Link>
          </Button>
        </motion.div>
      </div>
      <motion.div className="md:w-1/2 flex justify-center mt-8 md:mt-0"
        initial={{opacity:0 , y:-50}}
        animate={{opacity:1 , y:0}}
        transition={{delay:0.5 , duration:1}}
      >
        <HomeAnimation />
      </motion.div>
    </div>
    <hr/>
    <div><About/></div>
    <hr/>
    <div><Contact/></div>
    </>
  );
}
