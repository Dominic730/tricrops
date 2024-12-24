"use client";

import Link from "next/link";
import Image from "next/image";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchAllOrders } from "@/actions/fetchAllOrders"; // Ensure this path is correct

interface OrderItem {
  orderId: string;
  userId: string;
  orderItems: Record<string, { image: string; price: number; weight: number }>;
  createdAt: string;
  status: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const fetchedOrders = await fetchAllOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="spinner flex justify-center items-center gap-5" style={{ height: "calc(100vh - 96px)" }}>
        <Loader size={32} className="animate-spin" /> Loading...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height: "calc(100vh - 96px)" }}>
        No orders found.
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        All Orders
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {orders.map((order) => (
          <div key={order.orderId} className="border shadow-md rounded-lg p-6 bg-white hover:shadow-lg transition-shadow">
            <Link href={`/admin/orders/${order.orderId}`}>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Order ID: {order.orderId}
                </h2>
                <p className="text-sm text-gray-600">
                  User ID: <span className="text-blue-500">{order.userId}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span className={ order.status === 0 ? "text-yellow-500" : "text-green-500"}>
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
                      <li key={key} className="mb-4">
                        <div className="flex items-center space-x-4">
                          <Image src={item.image} alt={key} className="w-16 h-16 object-contain rounded" width={500} height={500} />
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
