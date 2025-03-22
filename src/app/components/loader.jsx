"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Loader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={loading ? "bg-blue-500" : "dark:bg-gray-900"}>
      {loading ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-blue-500 dark:bg-gray-900 z-50"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-white dark:text-white text-4xl font-bold"
          >
            Welcome to Flownex
          </motion.h1>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "80%" }}
            transition={{ duration: 1 }}
            className="h-1 bg-white mt-4"
          />
        </motion.div>
      ) : (
        // Show Page Content After Loading
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex flex-col dark:bg-gray-900"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
