"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { realtimeDB } from "@/lib/firebase/firebase";
import { ref, update, remove } from "firebase/database";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableItem {
    image: string;
    price: number;
    weight: number;
};

interface TableDataSub {
    [productId: string]: TableItem;
};

interface TableProps {
    userID: string;
    type: "sack" | "cart";
    fetchFunction: (userID: string) => Promise<TableDataSub>;
}

const MultiTable: React.FC<TableProps> = ({ userID, type, fetchFunction }) => {
    const [data, setData] = useState<TableDataSub | null>(null);
    const [grandTotal, setGrandTotal] = useState<number>(0);

    const fetchData = useCallback(async () => {
        const fetchedData = await fetchFunction(userID);
        setData(fetchedData);
    }, [userID,fetchFunction]);

    useEffect(() => {   
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (data) {
            const total = Object.values(data).reduce((sum, item) => sum + item.price * item.weight, 0);
            setGrandTotal(total);
        }
    }, [data]);

    const updateWeight = async (productId: string, newWeight: number) => {
        if (newWeight < 0) return; // Prevent negative weight
        const productRef = ref(realtimeDB, `${type}/${userID}/${productId}`);
        await update(productRef, { weight: newWeight });
        await fetchData();
    };

    const deleteProduct = async (productId: string) => {
        const productRef = ref(realtimeDB, `${type}/${userID}/${productId}`);
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
            <Table className="w-[80dvw] border border-gray-300 shadow-md rounded-lg">
                <TableHeader className="bg-gray-100 hidden md:table-header-group">
                    <TableRow>
                        <TableHead className="p-4 font-semibold text-xl text-gray-600 text-left"> Product Details </TableHead>
                        <TableHead className="p-4 font-semibold text-xl text-gray-600 text-right"> Price </TableHead>
                        <TableHead className="p-4 font-semibold text-xl text-gray-600 text-center"> Quantity </TableHead>
                        <TableHead className="p-4 font-semibold text-xl text-gray-600 text-right"> Total </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && Object.keys(data).length > 0 ? (
                        <>
                            {Object.entries(data).map(([productId, product]) => (
                                <TableRow key={productId} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150 md:table-row flex flex-col items-start md:items-center">
                                    {/* Product Details */}
                                    <TableCell className="p-4 md:table-cell w-full">
                                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                                            <Image src={product.image} alt={productId} width={80} height={80} className="rounded-md" loading="lazy"/>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">{productId}</h3>
                                                <p className="text-sm text-gray-500">Product ID: {productId}</p>
                                                <button onClick={() => deleteProduct(productId)} className="text-sm text-blue-600 hover:text-blue-800 hover:underline mt-1">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Price */}
                                    <TableCell className="py-2 px-4 text-right w-full md:table-cell">
                                        <span className="block md:hidden font-semibold">Price:</span>
                                        ₹{product.price.toFixed(2)}
                                    </TableCell>

                                    {/* Quantity */}
                                    <TableCell className="py-2 px-4 text-center w-full md:table-cell">
                                        <div className="flex items-center justify-start md:justify-center">
                                            <button onClick={() => updateWeight(productId, product.weight - 1)} className="p-2">
                                                <Minus className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                                            </button>
                                            <span className="text-lg font-semibold mx-2">{product.weight}{" "}Kg</span>
                                            <button onClick={() => updateWeight(productId, product.weight + 1)} className="p-2">
                                                <Plus className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                                            </button>
                                        </div>
                                    </TableCell>

                                    {/* Total Price */}
                                    <TableCell className="py-2 px-4 text-right w-full md:table-cell">
                                        <span className="block md:hidden font-semibold">Total:</span>
                                        ₹{(product.price * product.weight).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {/* Grand Total */}
                            <TableRow className="flex flex-col md:table-row">
                                <TableCell colSpan={3} className="p-4 text-right text-xl font-semibold md:table-cell">
                                    Grand Total:
                                </TableCell>
                                <TableCell className="p-4 text-right text-2xl font-semibold">
                                    ₹{grandTotal.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </>
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center p-4 text-gray-500">
                                No products in cart
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default MultiTable;
