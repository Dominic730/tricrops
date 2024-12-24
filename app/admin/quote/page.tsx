"use client";

import Image from "next/image";
import fetchQuote from "@/actions/fetchQuote";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import updateQuote from "@/actions/updateQuote";
import React, { useState, useEffect } from "react";
import { Loader, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface QuoteData {
    quoteId: string;
    productId: string;
    productName: string;
    productImage: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    status: string;
}

export default function AdminQuote() {
    const [loading, setLoading] = useState(false);
    const [quotes, setQuotes] = useState<QuoteData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [alerts, setAlerts] = useState<Record<string, { message: string; type: "success" | "error" } | null>>({});

    useEffect(() => {
        fetchData();
    }, []);

    const getStatusColor = (status: string) => {
        if (status.toLowerCase() === "done") {
            return "bg-green-500 px-3 py-2 text-white text-sm";
        } else if (status.toLowerCase() === "pending") {
            return "bg-red-500 px-3 py-2 text-white text-sm";
        } else {
            return "bg-gray-500 px-3 py-2 text-white text-sm";
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await fetchQuote();
            setQuotes(data);
            setAlerts(data.reduce((acc, quote) => ({ ...acc, [quote.quoteId]: null }), {}));
        } catch (error) {
            console.error("Error fetching quotes:", error);
            setError("Failed to fetch quotes.");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (quoteId: string, status: string) => {
        const response = await updateQuote(quoteId, status);

        setAlerts((prev) => ({
            ...prev,
            [quoteId]: {
                message: response,
                type: response === "Quote updated successfully." ? "success" : "error",
            },
        }));
        fetchData();
    };

    if (loading) {
        return (
            <div className="spinner flex justify-center items-center" style={{ height: "calc(100vh - 96px)" }}>
                <Loader size={32} className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-10" style={{ height: "calc(100vh - 96px)" }}>
            <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
                All Quotes
            </h1>
            {error && <Alert variant="destructive">{error}</Alert>}
            <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {quotes.map((quote) => (
                    <Card key={quote.quoteId}>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <div className="text-xl font-bold">
                                    {quote.productName}
                                </div>
                                <Badge variant="outline" className={getStatusColor(quote.status)}>
                                    {quote.status.toUpperCase()}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center items-center">
                                <Image src={quote.productImage} alt={quote.productName} className="w-[150px] h-[150px] object-cover rounded my-2" width={150} height={150} />
                            </div>
                            <dl className="grid grid-cols-2 gap-1 text-sm">
                                <dt className="font-semibold">Requested by:</dt>{" "}
                                <dd>{quote.name}</dd>
                                <dt className="font-semibold">Email:</dt> <dd>{quote.email}</dd>
                                <dt className="font-semibold">Message:</dt> <dd>{quote.message}</dd>
                                <dt className="font-semibold">Created At:</dt>{" "}
                                <dd>{new Date(quote.createdAt).toLocaleString()}</dd>
                            </dl>
                            {alerts[quote.quoteId] && (
                                <Alert variant={alerts[quote.quoteId]?.type === "success" ? "default" : alerts[quote.quoteId]?.type === "error" ? "destructive" : undefined} className="mt-2">
                                    {alerts[quote.quoteId]?.message}
                                </Alert>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => updateStatus(quote.quoteId, "done")}>
                                <CheckCircle /> Mark as Done
                            </Button>
                            {/* <Button variant="outline" onClick={() => updateStatus(quote.quoteId, "pending")}>
                                <RotateCw /> Mark as Pending
                            </Button> */}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
