"use server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";

interface AddToCartProps {
  productId: string;
  price: number;
  weight: number;
  userId?: string;
}

export default async function addToCart({
  productId,
  price,
  weight,
  userId,
}: AddToCartProps) {
  const productRef = doc(db, "products", productId);

  const totalPrice = price;

  // Reference to the user's cart subcollection
  if (userId) {
    const cartRef = doc(db, "users", userId, "cart", productId);
    await setDoc(cartRef, {
      productRef,
      weight,
      totalPrice,
    });
  }
  // Add cart item with a reference to the product
}
