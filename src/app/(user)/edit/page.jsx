"use client";

import { useEffect, useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { sendEmailVerification, verifyBeforeUpdateEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { auth } from "@/app/firebase/firebase";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { toast } from "sonner";
import { BiSolidShow, BiHide } from "react-icons/bi";
import LoadingSpinner from "@/components/loadingspiner";
import { updateuseremail, updateusername } from "@/app/firebase/firebase_filestore";

export default function UpdateUser({ userid }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setvisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setOpen(true);
        const user = auth.currentUser;
        setFormData({
          username: user.displayName || "",
          email: user.email || "",
          password: "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    console.log(currentUser);
    try {
      if (formData.username !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: formData.username });
        await updateusername(formData.username,currentUser.uid)
        toast.success("Username Update Sucessfully!");
      }
      // 📧 Update Email
      if (formData.email !== currentUser.email) {
        const password = prompt("Enter your current password to verify:");
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          password
        );
        await auth.currentUser.reload();

        try {
          await reauthenticateWithCredential(currentUser, credential);
          await verifyBeforeUpdateEmail(currentUser, formData.email);
          toast.success(
            "Email updated! A verification link has been sent to your new email."
          );
          await updateuseremail(currentUser.uid,formData.email)
          await auth.signOut();
          router.push("/login");
        } catch (error) {
          if (error.code === "auth/operation-not-allowed") {
            toast.error(
              "Email change blocked: You must verify your current email before changing to a new one."
            );
          } else {
            toast.error("Failed to update email: " + error.message);
          }
        }
      }

      if (formData.password) {
        await updatePassword(currentUser, formData.password);
        toast.success("User Password Update Sucessfully!");
      }

      router.push("/user-dashboard");
      setOpen(false);
    } catch (error) {
      console.log("Error updating profile:", error.message);
      alert("Update failed: " + error.message);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Dialog
          open={open}
          onOpenChange={(open) => {
            if (open) {
              setOpen(true);
            }
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your name"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={visible ? "password" : "text"}
                  placeholder="**********"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setvisible(!visible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                >
                  {visible ? <BiSolidShow size={24} /> : <BiHide size={24} />}
                </button>
                </div>
              </div>

              <DialogFooter className="mt-2 flex justify-between">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/user-dashboard">Close</Link>
                </Button>
                <Button type="submit">Update</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
