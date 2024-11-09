"use client";

import fetchCart from "@/actions/fetchCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { realtimeDB } from "@/lib/firebase/firebase";
import { ref, update, remove } from "firebase/database";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CartItem {
    price: number;
    weight: number;
}

interface CartDataSub {
    [productId: string]: CartItem;
}

interface CartTableProps {
    userID: string;
}

const CartTable: React.FC<CartTableProps> = ({ userID }) => {
    const [cartData, setCartData] = useState<CartDataSub | null>(null);
    const [grandTotal, setGrandTotal] = useState<number>(0);

    const fetchData = React.useCallback(async () => {
        const data = await fetchCart(userID);
        setCartData(data);
    }, [userID]);

    useEffect(() => {   
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (cartData) {
            const total = Object.values(cartData).reduce((sum, item) => sum + item.price * item.weight, 0);
            setGrandTotal(total);
        }
    }, [cartData]);

    const updateWeight = async (productId: string, newWeight: number) => {
        if (newWeight < 0) return; // Prevent negative weight
        const productRef = ref(realtimeDB, `cart/${userID}/${productId}`);
        await update(productRef, { weight: newWeight });
        await fetchData();
    };

    const deleteProduct = async (productId: string) => {
        const productRef = ref(realtimeDB, `cart/${userID}/${productId}`);
        try {
            await remove(productRef);
            console.log(`${productId} removed from cart`);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
        await fetchData();
    };

    return (
        <div className="p-4 text-lg">
            <Table className="min-w-full border border-gray-300 shadow-md rounded-lg">
                <TableHeader className="bg-gray-200">
                    <TableRow>
                        <TableHead className="p-2 text-center w-[100px] font-semibold text-xl">Actions</TableHead>
                        <TableHead className="p-2 text-center w-[200px] font-semibold text-xl">Product Name</TableHead>
                        <TableHead className="p-2 text-center w-[100px] font-semibold text-xl">Price</TableHead>
                        <TableHead className="p-2 text-center w-[200px] font-semibold text-xl">Weight</TableHead>
                        <TableHead className="p-2 text-center w-[150px] font-semibold text-xl">Total Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cartData ? (
                        Object.entries(cartData).map(([productId, product]) => (
                            <TableRow key={productId} className="hover:bg-gray-100 transition duration-150 text-lg">
                                <TableCell className="p-2 text-center">
                                    <button onClick={() => deleteProduct(productId)} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                        <Trash2 size={16} />
                                    </button>
                                </TableCell>
                                <TableCell className="p-2 text-center">{productId}</TableCell>
                                <TableCell className="p-2 text-center">₹ {product.price}</TableCell>
                                <TableCell className="p-2 flex justify-center items-center gap-2">
                                    <button onClick={() => updateWeight(productId, product.weight - 1)} className="p-2 text-lg bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-2">{product.weight}</span>
                                    <button onClick={() => updateWeight(productId, product.weight + 1)} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                                        <Plus size={16} />
                                    </button>
                                </TableCell>
                                <TableCell className="p-2 text-center font-semibold">{product.price * product.weight}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center p-4 text-gray-500">
                                No products in cart
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell colSpan={4} className="text-right text-xl p-4 font-semibold">Grand Total:</TableCell>
                        <TableCell className="p-4 text-center text-2xl font-semibold">₹ {grandTotal}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default CartTable;
