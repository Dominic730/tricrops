import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Product {
  id: string;
  productname: string;
  productprice: number;
  productimage: string;
}

export default async function fetchProduct(productId: string): Promise<Product | null> {
  try {
    const productRef = doc(db, "products", productId); // Assuming "products" is your collection name
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      const productData = productSnapshot.data();
      return {
        id: productSnapshot.id,
        ...(productData as Omit<Product, "id">),
      } as Product;
    } else {
      console.log("No such product found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
