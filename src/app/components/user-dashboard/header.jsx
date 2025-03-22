"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/modetoogle";

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true)
  },[])

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

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline">
            <Link href="/register" className="text-lg font-medium">
              Logout
            </Link>
          </Button>
          {isMounted &&
          <ModeToggle />
}
        </div>
      </div>

      <hr className="text-black "/>
    </nav>
  );
}
