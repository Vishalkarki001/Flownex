'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
 } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

const UserAvatar = ({ user,id }) => {
  const router = useRouter();
  const handleLogout = async () => {
  try {
    await signOut(auth)
    toast.success("User Logout Sucessfully!")
  } catch (error) {
    console.error(error)
  }
};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.photoURL || user?.displayName?.[0]} />
          <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-50 mt-2">
        <DropdownMenuItem>
          <Link href={`/edit/${id}`}>
          Update Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
        onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
