"use server";

import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

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

export default async function fetchProfile(userId: string): Promise<Profile | null> {
    try {
        // Reference to the user's profile document directly in the "users" collection
        const profileRef = doc(db, "users", userId, "profiles", "profile");

        const profileSnapshot = await getDoc(profileRef);

        if (profileSnapshot.exists()) {
            const profileData = profileSnapshot.data();
            // console.log(profileData);
            return {
                id: profileSnapshot.id,
                ...(profileData as Omit<Profile, "id">),
            } as Profile;
        } else {
            console.log("No such profile found!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}
