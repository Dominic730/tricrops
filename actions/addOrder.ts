"use server";

import { realtimeDB } from "@/lib/firebase/firebase";
import { ref, get, set, push } from "firebase/database";

interface CreateOrderProps {
  userId: string;
}

export default async function addOrder({ userId }: CreateOrderProps) {
  // Reference to the user's cart
  const cartRef = ref(realtimeDB, `cart/${userId}`);
  const cartSnapshot = await get(cartRef);

  if (!cartSnapshot.exists()) {
    throw new Error("Cart is empty. Cannot create an order.");
  }

  // Get the cart items
  const cartItems = cartSnapshot.val();

  // Reference to the top-level orders collection
  const ordersRef = ref(realtimeDB, `orders`);

  // Create a new order
  const newOrderRef = push(ordersRef); // Generate a unique ID for the order

  await set(newOrderRef, {
    orderId: newOrderRef.key, // Unique order ID
    userId, // Associate the order with the user
    orderItems: cartItems, // Attach all cart items to the order
    createdAt: new Date().toISOString(), // Add timestamp
    status: 0, // Initial status (e.g., 0 for pending, 1 for completed)
  });

  // Clear the cart after moving the items to an order
  await set(cartRef, null);
}
