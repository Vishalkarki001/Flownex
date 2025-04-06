"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/modetoogle";
import { auth } from "@/app/firebase/firebase";
import UserAvatar from "@/app/components/avatar"
import { onAuthStateChanged } from "firebase/auth";
export default function Header() {
  const router = useRouter()
  const [user, setuser] = useState()
  const [userid, setUserid]  = useState()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true)
    const unsubscribe = onAuthStateChanged(auth,async (currentuser)=>{
      setuser(currentuser)
      if(currentuser){
      setUserid(currentuser.uid)
      }else{
        setUserid(null)
      }
    })
    return ()=> unsubscribe();
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
        <div className="flex items-center space-x-4">
           <UserAvatar user={user} id = {userid}/>
          {isMounted &&
          <ModeToggle />
}
        </div>
      </div>

      <hr className="text-black "/>
    </nav>
  );
}
