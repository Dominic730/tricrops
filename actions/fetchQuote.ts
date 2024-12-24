"use server";

import { ref, get } from "firebase/database";
import { realtimeDB } from "@/lib/firebase/firebase";

interface QuoteData {
    quoteId: string;
    productId: string;
    productName: string;
    productImage: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    status: string;
}

export default async function fetchQuote(): Promise<QuoteData[]> {
    const quoteRef = ref(realtimeDB, "quote");

    try {
        const snapshot = await get(quoteRef);

        if (!snapshot.exists()) {
            console.warn("No quotes found");
            return []; // Return an empty array if no quotes are found
        }

        const quoteData = snapshot.val();

        // Ensure the data is an object before mapping
        if (typeof quoteData !== "object" || quoteData === null) {
            console.error("Unexpected data structure:", quoteData);
            return []; // Return an empty array for unexpected data structure
        }

        // Convert the object into an array with sorted quotes
        const quoteArray: QuoteData[] = Object.keys(quoteData).map((key) => ({
            quoteId: key,
            ...quoteData[key],
        }));

        return quoteArray.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    } catch (error: any) {
        console.error("Error fetching quotes:", error?.message || error);
        return []; // Return an empty array on error
    }
}
