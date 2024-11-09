"use server";

import { realtimeDB } from "@/lib/firebase/firebase";
import { ref, onValue } from "firebase/database";

interface CartItem {
    price: number;
    weight: number;
};

interface CartDataSub {
    [productId: string]: CartItem;
};

export default async function fetchCart(userID: string): Promise<CartDataSub> {
    const cartRef = ref(realtimeDB, `cart/${userID}`);
    return new Promise<CartDataSub>((resolve, reject) => {
        onValue(cartRef, (snapshot) => {
            const data = snapshot.val();
            const cartData: CartDataSub = {};
            if (data !== null) {
                for (const key in data) {
                    cartData[key] = data[key];
                }
            }
            resolve(cartData);
        }, (error) => {
            reject(error);
        });
    });
};