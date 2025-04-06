'use client';
import { useParams } from "next/navigation";
import UpdateUser from "../page.jsx";
export default function UpdateProfile() {
  const params = useParams();
  const userid = params.id;

  return (
    <>
    <UpdateUser userid={userid}/>
    </>
  )
}
