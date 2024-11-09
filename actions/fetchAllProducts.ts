"use server";

import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Product {
  id: string;
  productname: string;
  productprice: number;
  productimage: string;
}

export default async function fetchAllProducts(): Promise<Product[] | null> {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products: Product[] = [];
    if (querySnapshot.empty) {
      console.error("No products found");
      return null;
    } else {
        querySnapshot.forEach((doc) => {
            products.push({
            id: doc.id,
            productname: doc.data().productname,
            productprice: doc.data().productprice,
            productimage: doc.data().productimage,
            });
        });
        return products;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
