"use server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface AddProductsProps {
  productname: string;
  productprice: number;
  productimage: string;
}

export default async function addProducts({
  productname,
  productprice,
  productimage,
}: AddProductsProps) {
  const docRef = doc(db, "products", productname.toLowerCase());
  await setDoc(
    docRef,
    {
      productname: productname.toLowerCase(),
      productprice: productprice,
      productimage: productimage,
    },
    { merge: true }
  );
}
