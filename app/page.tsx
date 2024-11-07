"use client";
import ProductCard from "@/components/productcard";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  productname: string;
  productprice: number;
  productimage: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));
      setProducts(productsArray);
    };

    fetchProducts();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 p-20 border border-yellow-300">
      {products.map((product) => (
        <div
          key={product.id}
          className="py-5"
        >
          <ProductCard
            productName={product.productname}
            productPrice={product.productprice}
          />
        </div>
      ))}
    </div>
  );
}
