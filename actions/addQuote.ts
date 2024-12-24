"use server";
import { realtimeDB } from "@/lib/firebase/firebase";
import { push, ref, set } from "firebase/database";

interface CreateOrderProps {
  productId: string;
  productName: string;
  productImage: string;
  name: string;
  email: string;
  message: string;
}

export default async function addQuote({
  productId,
  productName,
  productImage,
  name,
  email,
  message,
}: CreateOrderProps) {
  try {
    // Reference to the quote path in the Realtime Database
    const quoteRef = ref(realtimeDB, `quote`);
    
    // Push a new quote entry
    const newQuoteRef = push(quoteRef);
    
    // Set the data for the new quote
    await set(newQuoteRef, {
      productId,
      productName,
      productImage,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      status: "pending",
    });

    console.log("Quote added successfully:", newQuoteRef.key);
    return { success: true, quoteId: newQuoteRef.key };
  } catch (error) {
    console.error("Error adding quote:", error);
    throw new Error("Failed to add quote. Please try again later.");
  }
}
