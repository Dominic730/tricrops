"use server";
import { addDoc, collection, doc } from "firebase/firestore";
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
    const cartRef = collection(db, "users", userId, "cart");
    await addDoc(cartRef, {
      productRef,
      weight,
      totalPrice,
    });
  }
  // Add cart item with a reference to the product
}
