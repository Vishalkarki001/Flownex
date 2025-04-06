"use client";
import { auth } from "@/app/firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loadingspiner"
import { useState, useEffect } from "react";


export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);

      try {
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
        console.log("User ID:", currentUser.uid);
        console.log("Email:", currentUser.email);
        console.log("Access Token:", idToken);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Optional: Show loading state while checking auth
  if (!user) return <LoadingSpinner/>;

  return (
    <>
    <h1 className="text-3xl text-center">Hi {user.displayName}</h1>
    
    </>
  );
}
