"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { realtimeDB } from "@/lib/firebase/firebase";
import { ref, get } from "firebase/database";
import Image from "next/image";

interface OrderItem {
  orderId: string;
  orderItems: Record<string, { image: string; price: number; weight: number }>;
  createdAt: string;
  status: number;
}

export default function OrderDetails() {
  const [order, setOrder] = useState<OrderItem | null>(null);
  const { orderId } = useParams<{ orderId: string }>();

  // UseEffect to ensure router query is accessed only on the client side
  useEffect(() => {
    if (orderId) {
      const orderRef = ref(realtimeDB, `orders/${orderId}`);
      get(orderRef).then((snapshot) => {
        const orderData = snapshot.val();
        if (orderData) {
          setOrder({
            orderId: snapshot.key!,
            ...orderData,
          });
        }
      });
    }
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Order Details
      </h1>
      <div className="border p-6 rounded-lg shadow-md bg-white">
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
                      Price: ₹{item.price * item.weight}, Weight: {item.weight}
                      kg
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
