"use client";

import { useEffect, useState } from "react";
import fetchCart from "@/actions/fetchCart";
import { auth } from "@/lib/firebase/firebase";
import MultiTable from "@/components/MultiTable";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import addOrder from "@/actions/addOrder";

export default function Page() {
  const [userID, setUserID] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      }
    });
  }, [userID]);

  return (
    <div className="px-4 pt-28 pb-5">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold underline mb-6">Cart</h1>
        {userID ? (
          <MultiTable
            userID={userID}
            type="cart"
            fetchFunction={fetchCart}
          />
        ) : (
          <p className="text-center text-gray-500">
            Please log in to view your cart.
          </p>
        )}
        <Button
          className="self-end mx-36"
          onClick={async () => await addOrder({ userId: userID })}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
