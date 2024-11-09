"use server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";

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
  function formatString(str: string) {
    const words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }

  function removeSpacesAndLowercase(str: string) {
    return str.replace(/\s+/g, "").toLowerCase();
  }

  const docRef = doc(db, "products", removeSpacesAndLowercase(productname));
  await setDoc(
    docRef,
    {
      productname: formatString(productname),
      productprice: productprice,
      productimage: productimage,
    },
    { merge: true }
  );
}
