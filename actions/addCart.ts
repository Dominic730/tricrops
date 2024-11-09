"use server";

import { realtimeDB } from "@/lib/firebase/firebase";
import { ref, get, set, update } from "firebase/database";

interface AddToCartProps {
    productName: string;
    price: number;
    weight: number;
    userId?: string;
}

export default async function addToCart({ productName, price, weight, userId }: AddToCartProps) {
    const cartRef = ref(realtimeDB, `cart/${userId}/${productName}`);
    const snapshot = await get(cartRef);

    if (snapshot.exists()) {
        // Product exists, so we update the price and weight
        const existingData = snapshot.val();
        const updatedPrice = existingData.price + price;
        const updatedWeight = existingData.weight + weight;

        await update(cartRef, {
            price: updatedPrice,
            weight: updatedWeight,
        });
    } else {
        // Product doesn't exist, so we create a new entry
        await set(cartRef, { 
            price,
            weight,
        });
    }

}
