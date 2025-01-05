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

export async function updateProfile(userId: string, updatedProfile: Omit<Profile, "id">): Promise<boolean> {
    try {
        const profileRef = doc(db, "users", userId, "profiles", "profile");
        await setDoc(profileRef, updatedProfile, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating profile:", error);
        return false;
    }
}