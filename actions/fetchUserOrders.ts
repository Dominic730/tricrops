"use server";

import { ref, get } from "firebase/database";
import { realtimeDB } from "@/lib/firebase/firebase";

interface OrderItem {
  orderId: string;
  userId: string;
  orderItems: Record<string, { image: string; price: number; weight: number }>;
  createdAt: string;
  status: number;
}

/**
 * Fetch orders of a specific user by userId.
 * @param userId - The ID of the user whose orders to fetch.
 * @returns A promise that resolves to an array of orders.
 */
export async function fetchUserOrders(userId: string): Promise<OrderItem[]> {
  if (!userId) {
    throw new Error("User ID is required to fetch orders.");
  }

  const userOrdersRef = ref(realtimeDB, `orders`);
  const snapshot = await get(userOrdersRef);

  if (!snapshot.exists()) {
    return []; // No orders found for any user
  }

  const ordersData = snapshot.val();
  const userOrders = Object.keys(ordersData)
    .filter((key) => ordersData[key].userId === userId) // Filter by userId
    .map((key) => ({
      orderId: key,
      ...ordersData[key],
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ); // Sort by timestamp

  return userOrders;
}
