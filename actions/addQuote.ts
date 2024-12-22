"use server";

import { realtimeDB } from "@/lib/firebase/firebase";
import { ref, get, set, push } from "firebase/database";

interface CreateOrderProps {
    productId: string;
    productName: string;
}

export default async function addQuote({ productId, productName }: CreateOrderProps) {
    // Reference to the user's quote
    const quoteRef = ref(realtimeDB, `quote`);
    const quoteSnapshot = await get(quoteRef);

    if (!quoteSnapshot.exists()) {
        throw new Error("Quote is empty. Cannot create an order.");
    }
}
