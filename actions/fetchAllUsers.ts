import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";

interface User {
  id: string;
  displayName: string;
  email: string;
  createdAt: string;
}

export const fetchAllUsers = async (): Promise<User[]> => {
  const usersCollectionRef = collection(db, "users");

  try {
    const querySnapshot = await getDocs(usersCollectionRef);
    const users: User[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        displayName: data.displayName || "N/A",
        email: data.email || "N/A",
        createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : "N/A",
      };
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
