import { db } from "../lib/firebase/firebase";
import { User as UserType } from "firebase/auth"; // Import User type from Firebase
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const createUserDoc = async (user: UserType) => {
  const docRef = doc(db, "users", user.uid);

  // Get user document
  const userDoc = await getDoc(docRef);

  // Create one if it does not exist
  if (!userDoc.exists()) {
    await setDoc(docRef, {
      displayName: user.displayName,
      email: user.email,
      createdAt: serverTimestamp(),
    });
    console.log("User document created in Firestore.");
  } else {
    console.log("User document already exists in Firestore.");
  }
};
