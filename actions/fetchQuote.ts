"use server";

import { ref, onValue } from "firebase/database";
import { realtimeDB } from "@/lib/firebase/firebase";

interface Quote {
    productId: string;
    productName: string;
    productImage: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    status: string;
}

interface QuoteData {
    [quoteId: string]: Quote;
}

export default async function fetchQuote(): Promise<QuoteData> {
    const quoteRef = ref(realtimeDB, `quote`);
    return new Promise<QuoteData>((resolve, reject) => {
        onValue(quoteRef, (snapshot) => {
            const data = snapshot.val();
            const quoteData: QuoteData = {};
            if (data !== null) {
                for (const key in data) {
                    quoteData[key] = data[key];
                }
            }
            resolve(quoteData);
        }, (error) => {
            reject(error);
        });
    });
}