"use server";

import { realtimeDB } from "@/lib/firebase/firebase";
import { ref, onValue } from "firebase/database";

interface SackItem {
    image: string;
    price: number;
    weight: number;
};

interface SackDataSub {
    [productId: string]: SackItem;
};

export default async function fetchSack(userID: string): Promise<SackDataSub> {
    const cartRef = ref(realtimeDB, `sack/${userID}`);
    return new Promise<SackDataSub>((resolve, reject) => {
        onValue(cartRef, (snapshot) => {
            const data = snapshot.val();
            const sackData: SackDataSub = {};
            if (data !== null) {
                for (const key in data) {
                    sackData[key] = data[key];
                }
            }
            resolve(sackData);
        }, (error) => {
            reject(error);
        });
    });
};