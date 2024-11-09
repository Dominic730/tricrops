"use client";

import ProductCard from "@/components/productcard";
import { useEffect, useState, useCallback } from "react";
import fetchAllProducts from "@/actions/fetchAllProducts"

interface Product {
  id: string;
  productname: string;
  productprice: number;
  productimage: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const FetchData = useCallback(async () => {
    const data = await fetchAllProducts();
    setProducts(data ?? []);
  }, []);

  useEffect(() => {
    FetchData();
  }, [FetchData]);
  return (
    <div className="container mx-auto px-4 pt-28 pb-5">
      <div className="flex flex-wrap justify-center gap-5">
        {products.map((product) => ( 
          <div key={product.id}>
            <ProductCard id={product.id} productName={product.productname} productPrice={product.productprice} productImage={product.productimage} />
          </div>
        ))}
      </div>
    </div>
  );
}
