"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserOrders } from "@/actions/fetchUserOrders"; // Import the function
import Image from "next/image";

interface OrderItem {
  orderId: string;
  orderItems: Record<string, { image: string; price: number; weight: number }>;
  createdAt: string;
  status: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersForUser = async (userId: string) => {
      try {
        const userOrders = await fetchUserOrders(userId); // Fetch orders for the user
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchOrdersForUser(user.uid); // Fetch orders when the user is authenticated
      } else {
        setOrders([]);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No orders found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-40">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Your Orders
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="border shadow-md rounded-lg p-6 bg-white hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              Order ID: {order.orderId}
            </h2>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span
                className={
                  order.status === 0 ? "text-yellow-500" : "text-green-500"
                }
              >
                {order.status === 0 ? "Pending" : "Completed"}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </p>

            <h3 className="mt-4 font-semibold text-gray-700">Items:</h3>
            <ul className="pl-5">
              {Object.keys(order.orderItems).map((key) => {
                const item = order.orderItems[key];
                return (
                  <li
                    key={key}
                    className="mb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image}
                        alt={key}
                        className="w-16 h-16 object-contain rounded"
                        width={500}
                        height={500}
                      />
                      <div>
                        <p className="font-medium text-gray-800">{key}</p>
                        <p className="text-sm text-gray-600">
                          Price: ₹{item.price * item.weight}, Weight:{" "}
                          {item.weight}kg
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
