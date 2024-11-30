"use server";

import { db } from "@/lib/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface editProductsProps {
  productname: string;
  productprice: number;
  productimage: string;
  id: string;
}

export default async function editProducts({
  productimage,
  productname,
  productprice,
  id,
}: editProductsProps) {
  const docRef = doc(db, "products", id);

  await updateDoc(docRef, {
    productname: productname,
    productimage: productimage,
    productprice: productprice,
  });
}
