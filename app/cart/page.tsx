"use client";

import { useEffect, useState } from 'react';
import CartTable from '@/components/CartTable';
import { auth } from '@/lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';


export default function Page() {
    const [userID, setUserID] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid)
            }
        });
    }, [userID]);

    return (
        <div className="container mx-auto px-4 pt-28 pb-5">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold underline">Cart</h1>
                <CartTable userID={userID} />
            </div>
        </div>
    )
}