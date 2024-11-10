"use server";

import { db } from "@/lib/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

interface BankDetails {
    upi: string;
    bankname: string;
    accountnumber: string;
    ifsc: string;
}
  
interface Profile {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    bank: BankDetails[];
}

export async function addProfile(userId: string, profile: Omit<Profile, "id">): Promise<boolean> {
    try {
        // Reference to the "profiles" document under the specified userId
        const profileDocRef = doc(db, "users", userId, "profiles", "profile");

        // Set the profile data, without manually including the "id" field
        await setDoc(profileDocRef, profile);

        console.log("Profile added successfully!");
        return true;
    } catch (error) {
        console.error("Error adding profile:", error);
        return false;
    }
}
