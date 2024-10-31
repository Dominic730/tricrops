"use server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface AddProductsProps {
  productname: string;
  productprice: number;
}

export default async function addProducts({
  productname,
  productprice,
}: AddProductsProps) {
  const docRef = doc(db, "products", productname.toLowerCase());
  await setDoc(
    docRef,
    {
      productname: productname.toLowerCase(),
      productprice: productprice,
    },
    { merge: true }
  );
}
