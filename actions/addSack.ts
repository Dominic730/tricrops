"use server";

import { realtimeDB } from "@/lib/firebase/firebase";
import { ref, get, set, update } from "firebase/database";

interface AddToSackProps {
    productName: string;
    image: string;
    price: number;
    weight: number;
    userId?: string;
}

export default async function addToSack({ productName, image, price, weight, userId }: AddToSackProps) {
    const cartRef = ref(realtimeDB, `sack/${userId}/${productName}`);
    const snapshot = await get(cartRef);

    if (snapshot.exists()) {
        // Product exists, so we update the price and weight
        const existingData = snapshot.val();
        const updatedWeight = existingData.weight + weight;

        await update(cartRef, {
            weight: updatedWeight,
        });
    } else {
        // Product doesn't exist, so we create a new entry
        await set(cartRef, {
            image, 
            price,
            weight,
        });
    }

}
