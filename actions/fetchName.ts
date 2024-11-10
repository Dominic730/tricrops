"use server";

import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function fetchName(userID: string): Promise<string | null> {
    try {
        const nameRef = doc(db, "users", userID); // Assuming "users" is your collection name
        const nameSnapshot = await getDoc(nameRef);

        if (nameSnapshot.exists()) {
            const nameData = nameSnapshot.data().displayName;
            return nameData;
        } else {
            console.log("No such user found!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}