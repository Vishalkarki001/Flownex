"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; 
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/modetoogle";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const unsubscribe = onAuthStateChanged(auth,(currentuser)=>{
      setUser(currentuser)
    });
    return ()=> unsubscribe()

  },[])
  const handleLogout = async ()=>{
    try {
      await signOut(auth)
      toast.success("user logout sucessfully!")
      setUser(null)
    } catch (error) {
      console.log("error during logout")
    }
  }
  return (
    <nav className="bg-blue-500 dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image src="/images/flownex.png" alt="Logo" width={40} height={40} />
          <Link href="/" className="text-white dark:text-gray-200 text-2xl font-bold">
            FLOWNEX
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 hidden-[768px]">
          <Link href="/" className="text-2xl font-medium text-white hover:text-gray-200 transition">
            Home
          </Link>
          <Link href="/about" className="text-2xl font-medium text-white hover:text-gray-200 transition">
            About
          </Link>
          <Link href="/contact" className="text-2xl font-medium text-white hover:text-gray-200 transition">
            Contact Us
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="outline">
              <Link href="/register" className="text-lg font-medium">
                Register
              </Link>
            </Button>
          )}
          {isMounted && <ModeToggle />}
        </div>

        {/* Mobile Menu Toggle */}
        {isMounted && (
          <div className="md:hidden flex items-center space-x-4">
            <ModeToggle />
            <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div
        className={`md:hidden bg-blue-600 dark:bg-gray-900 transition-all overflow-hidden ${
          isOpen ? "min-h-screen p-4" : "max-h-0 p-0"
        } duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-center space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="w-full text-center text-lg font-medium text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="w-full text-center text-lg font-medium text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center text-lg font-medium text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            Contact Us
          </Link>
          {user ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
            >
              Logout
            </Button>
          ) : (
            <Button variant="outline" className="w-full">
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center text-lg"
              >
                Register
              </Link>
            </Button>
          )}
        </div>
      </div>
      <hr className="text-black " />
    </nav>
  );
}

