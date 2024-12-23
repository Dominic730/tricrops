"use client";

import { useState, useEffect } from 'react';
import fetchQuote from '@/actions/fetchQuote';
import Image from 'next/image';

interface Quote {
    productId: string;
    productName: string;
    productImage: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    status: string;
}

interface QuoteData {
    [quoteId: string]: Quote;
}

export default function AdminQuote() {
    const [loading, setLoading] = useState(false);
    const [quotes, setQuotes] = useState<QuoteData>({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchQuote();
                setQuotes(data);
            } catch (error) {
                console.error("Error fetching quotes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const updateStatus = async (quoteId: string, newStatus: string) => {
        try {
            // Placeholder for backend update logic
            // e.g., await updateQuoteStatus(quoteId, newStatus);
            setQuotes(prev => ({
                ...prev,
                [quoteId]: {
                    ...prev[quoteId],
                    status: newStatus,
                },
            }));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'done':
                return 'bg-green-500';
            case 'pending':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(quotes).map(([quoteId, quote]) => (
                <div
                    key={quoteId}
                    className={`p-4 rounded shadow ${getStatusColor(quote.status)}`}
                >
                    <div className="text-white">
                        <h3 className="text-lg font-bold">{quote.productName}</h3>
                        <Image src={quote.productImage} alt={quote.productName} className="w-full h-32 object-cover rounded my-2" />
                        <p><strong>Requested by:</strong> {quote.name}</p>
                        <p><strong>Email:</strong> {quote.email}</p>
                        <p><strong>Message:</strong> {quote.message}</p>
                        <p><strong>Created At:</strong> {new Date(quote.createdAt).toLocaleString()}</p>
                        <p><strong>Status:</strong> {quote.status}</p>
                    </div>
                    <div className="mt-2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() => updateStatus(quoteId, 'done')}
                        >
                            Mark as Done
                        </button>
                        <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                            onClick={() => updateStatus(quoteId, 'pending')}
                        >
                            Mark as Pending
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
