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
    <div className="container mx-auto px-4 pt-28 pb-5">

      <div className="flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <div
          key={product.id}
          >
            <ProductCard
              id={product.id}
              productName={product.productname}
              productPrice={product.productprice}
              productImage={product.productimage}
              />
          </div>
        ))}
      </div>
    </div>
  );
}
