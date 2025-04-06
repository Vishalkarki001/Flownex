import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { toast } from "sonner";

export const addUser = async(email : string,username: string,userid: string)=>{
    try {
        const docRef = await addDoc(collection(db, "user"), {
         username,
         userid,
         email,
         emailVerified: false,
         createdAt : new Date(),
         role: "user",
        });
        toast.success("user created sucessfully")
        console.log(docRef)
    } catch (error) {
        console.error("something wrong at the user register firebase",error)
    }
}
export const updateusername = async(username:string,userid:string)=>{
  try {  
    const userRef = collection(db,("user"))
    const q = query(userRef, where("userid", "==", userid));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "user", userDoc.id); 
      await updateDoc(userDocRef, {
        username: username
      });
      console.log("user name update sucessfully!")
    }
  } catch (error) {
    console.log("somthing went wrong")
    
  }
}
export const updateuseremail = async(userid:string,email:string,)=>{
  try {  
    const userRef = collection(db,("user"))
    const q = query(userRef, where("userid", "==", userid));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "user", userDoc.id); 
      await updateDoc(userDocRef, {
        email:email
      });
      console.log("user data update sucessfully!")
    }
  } catch (error) {
    console.log("somthing went wrong")
    
  }
}
export const updateemailstatus = async(userid:string,status:boolean,)=>{
  try {  
    const userRef = collection(db,("user"))
    const q = query(userRef, where("userid", "==", userid));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(db, "user", userDoc.id); 
      await updateDoc(userDocRef, {
        emailVerified:status
       
      });
      console.log("user data update sucessfully!")
    }
  } catch (error) {
    console.log("somthing went wrong")
    
  }
}

  
  export const getUserById = async (userid: string) => {
    try {
      const userRef = collection(db, "user");
      const q = query(userRef, where("userid", "==", userid));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.error(" No user found with this ID");
        return null;
      }
      const userDoc = querySnapshot.docs[0];
      return {
        id: userDoc.id,
        ...userDoc.data()
      };
  
    } catch (error) {
      console.error("🔥 Error fetching user:", error);
      return null;
    }
  };
  