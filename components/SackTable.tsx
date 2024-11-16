"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import fetchSack from "@/actions/fetchSack";
import { useEffect, useState, useCallback } from "react";
import { realtimeDB } from "@/lib/firebase/firebase";
import { ref, update, remove } from "firebase/database";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SackItem {
    image: string;
    price: number;
    weight: number;
};

interface SackDataSub {
    [productId: string]: SackItem;
};

interface CartTableProps {
    userID: string;
}

const CartTable: React.FC<CartTableProps> = ({ userID }) => {
    const [sackData, setSackData] = useState<SackDataSub | null>(null);
    const [grandTotal, setGrandTotal] = useState<number>(0);

    const fetchData = useCallback(async () => {
        const data = await fetchSack(userID);
        setSackData(data);
    }, [userID]);

    useEffect(() => {   
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (sackData) {
            const total = Object.values(sackData).reduce((sum, item) => sum + item.price * item.weight, 0);
            setGrandTotal(total);
        }
    }, [sackData]);

    const updateWeight = async (productId: string, newWeight: number) => {
        if (newWeight < 0) return; // Prevent negative weight
        const productRef = ref(realtimeDB, `sack/${userID}/${productId}`);
        await update(productRef, { weight: newWeight });
        await fetchData();
    };

    const deleteProduct = async (productId: string) => {
        const productRef = ref(realtimeDB, `sack/${userID}/${productId}`);
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
            <Table className="sm:w-[90dvw] lg:w-[80dvw]  border border-gray-300 shadow-md rounded-lg">
                <TableHeader className="bg-gray-100 hidden md:table-header-group">
                    <TableRow>
                        <TableHead className="p-4 font-semibold text-xl text-gray-600 text-left">Product Details</TableHead>
                        <TableHead className="p-4 font-semibold text-xl text-gray-600 text-right">Price</TableHead>
                        <TableHead className="p-4 font-semibold text-xl text-gray-600 text-center">Quantity</TableHead>
                        <TableHead className="p-4 font-semibold text-xl text-gray-600 text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sackData && Object.keys(sackData).length > 0 ? (
                        Object.entries(sackData).map(([productId, product]) => (
                            <TableRow key={productId} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                                <TableCell className="py-4 pr-4">
                                    <div className="flex items-center space-x-4">
                                        <Image src={product.image} alt={productId} width={80} height={80} className="rounded-md" />
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{productId}</h3>
                                            <p className="text-sm text-gray-500">Product ID: {productId}</p>
                                            <button onClick={() => deleteProduct(productId)} className="text-sm text-blue-600 hover:text-blue-800 hover:underline mt-1">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <span className="text-lg font-medium">₹ {product.price.toFixed(2)}</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center">
                                        <button onClick={() => updateWeight(productId, product.weight - 1)} className="p-2">
                                            <Minus size={24} />
                                        </button>
                                        <span className="text-xl font-semibold">{product.weight}</span>
                                        <button onClick={() => updateWeight(productId, product.weight + 1)} className="p-2">
                                            <Plus size={24} />
                                        </button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <span className="text-lg font-medium">₹ {(product.price * product.weight).toFixed(2)}</span>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center p-4 text-gray-500">
                                No products in cart
                            </TableCell>
                        </TableRow>
                    )}
                    {grandTotal > 0 && (
                        <TableRow>
                            <TableCell colSpan={2} className="text-right p-4 font-semibold">Grand Total:</TableCell>
                            <TableCell className="text-center p-4 font-semibold">{grandTotal.toFixed(2)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CartTable;
