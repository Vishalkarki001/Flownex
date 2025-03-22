'use client';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-blue-500 to-orange-200" 
         style={{ backgroundImage: "url('/contact-bg.jpg')" }}>
      <div className="absolute inset-0 bg-blue bg-opacity-50 bg-gradient-to-r from-blue-500 to-orange-200 dark:from-gray-900 dark:to-gray-800"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-blue-500 to-orange-200  dark:from-gray-900 dark:to-gray-800 shadow-2xl rounded-2xl p-8 max-w-lg w-full">
        
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Get in Touch</h2>
        
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Have a question? Feel free to reach out!
        </p>

        {/* Contact Form */}
        <div className="space-y-4">
          <Input type="text" placeholder="Your Name" className="p-3" />
          <Input type="email" placeholder="Your Email" className="p-3" />
          <textarea 
            className="w-full p-3 rounded-md border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="Your Message" 
            rows="4"
          ></textarea>
          <Button className="w-full p-3 text-lg hover:bg-gray-800">Send Message</Button>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-6">
          <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-500 dark:text-gray-300 hover:text-blue-500">
            <FaXTwitter size={28} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-500 dark:text-gray-300 hover:text-pink-500">
            <FaInstagram size={28} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-500 dark:text-gray-300 hover:text-blue-700">
            <FaLinkedin size={28} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="mailto:example@mail.com" className="text-gray-500 dark:text-gray-300 hover:text-red-500">
            <Mail size={28} />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
