"use client";

import { Loader } from "lucide-react";
import ProductCard from "@/components/productcard";
import { useEffect, useState, useCallback } from "react";
import fetchAllProducts from "@/actions/fetchAllProducts";

interface Product {
  id: string;
  productname: string;
  productprice: number;
  productimage: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const FetchData = useCallback(async () => {
    setLoading(true);
    const data = await fetchAllProducts();
    setProducts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    FetchData();
  }, [FetchData]);
  
  if (loading)
    return (
      <div className="spinner h-screen flex justify-center items-center">
        <Loader size={32} className="animate-spin" />
      </div>
    );

  return (
    <div className="container mx-auto px-1 py-5">
      <div className="flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard link="/product/" id={product.id} productName={product.productname} productPrice={product.productprice} productImage={product.productimage} />
          </div>
        ))}
      </div>
    </div>
  );
}
