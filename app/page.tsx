"use client";

import ProductCard from "@/components/productcard";
import { useEffect, useState, useCallback } from "react";
import fetchAllProducts from "@/actions/fetchAllProducts";
import { Loader } from "lucide-react";

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
        <Loader
          size={32}
          className="animate-spin"
        />
      </div>
    );
  return (
    <div className="container mx-auto px-4 pt-28 pb-5">
      <div className="flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <div key={product.id}>
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
