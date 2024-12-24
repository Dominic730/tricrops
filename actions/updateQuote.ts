"use server";

import { ref, get, update } from "firebase/database";
import { realtimeDB } from "@/lib/firebase/firebase";

export default async function updateQuote(quoteId: string, status: string): Promise<string> {
    const quoteRef = ref(realtimeDB, `quote/${quoteId}`);

    try {
        // Fetch the current quote data
        const snapshot = await get(quoteRef);
        if (!snapshot.exists()) {
            console.warn("Quote not found");
            return "Quote not found.";
        }

        // Update the status
        await update(quoteRef, { status });

        return "Quote updated successfully.";
    } catch (error: any) {
        console.error("Error updating quote:", error?.message || error);
        return "Failed to update quote.";
    }
}
