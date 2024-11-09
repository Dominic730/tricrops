"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Page() {
  const [userID, setUserID] = useState('');
  const navigator = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid)
      }
    });

    if (!userID) {
      setUserID('');
      navigator.push('/login');
    }
  }, [userID, navigator]);
  return (
    <div className='container mx-auto px-4 pt-28 pb-5'>Profile</div>
  )
}