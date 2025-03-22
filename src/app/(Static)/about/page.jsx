"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const services = [
    "Team Collaboration",
    "Project Management",
    "Task Tracking",
    "Seamless Communication",
    "Role-based Access Control"
];

export default function About() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % services.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-orange-200 dark:from-gray-900 dark:to-gray-800 text-white flex flex-col items-center justify-center p-10">
            <motion.h1 
                className="text-6xl font-extrabold mb-8 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Build Great Teams, Work Smarter!
            </motion.h1>
            
            <motion.p 
                className="text-2xl font-semibold text-white max-w-3xl text-center mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Our platform allows anyone to create an organization, invite team members, and collaborate efficiently on projects. 
                With seamless management, every project stays on track under one unified workspace.
            </motion.p>
            
            <motion.h2 
                className="text-4xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Our Services
            </motion.h2>
            <hr/>
            
            <div className="relative w-full max-w-xl h-40 overflow-hidden  flex items-center justify-center">
                <motion.div 
                    key={index}
                    className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8 }}
                >
                    {services[index]}
                </motion.div>
            </div>
            
        </div>
        </>
    );
}
