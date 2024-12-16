import { realtimeDB } from "@/lib/firebase/firebase";
import { ref, get } from "firebase/database";

interface Order {
  orderId: string;
  orderItems: Record<string, { image: string; price: number; weight: number }>;
  createdAt: string;
  status: number;
  userId: string;
}

/**
 * Fetches all orders from the "orders" collection in Firebase Realtime Database.
 * @returns {Promise<Order[]>} A promise that resolves to an array of orders.
 */
export async function fetchAllOrders(): Promise<Order[]> {
  try {
    const ordersRef = ref(realtimeDB, "orders");
    const snapshot = await get(ordersRef);

    if (!snapshot.exists()) {
      return []; // No orders found
    }

    const ordersData = snapshot.val();
    const ordersArray = Object.keys(ordersData).map((key) => ({
      orderId: key,
      ...ordersData[key],
    }));

    return ordersArray.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ); // Sort by createdAt (newest first)
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
