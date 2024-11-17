"use client";

import { useEffect, useState } from 'react';
import fetchSack from '@/actions/fetchSack';
import { auth } from '@/lib/firebase/firebase';
import MultiTable from '@/components/MultiTable';
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
        <div className="px-4 pt-28 pb-5">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold underline mb-6">Sack</h1>
                {userID ? (
                    <MultiTable userID={userID} type='sack' fetchFunction={fetchSack} />
                ) : (
                    <p className="text-center text-gray-500">Please log in to view your cart.</p>
                )}
            </div>
      </div>
    )
}