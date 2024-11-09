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
    }, []);

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1>Cart</h1>
            <CartTable userID={userID} />
        </div>
    )
}