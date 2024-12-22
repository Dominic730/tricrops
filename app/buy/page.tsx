"use client";

import { Loader } from "lucide-react";
import ProductCard2 from "@/components/productcard2";
import { useEffect, useState, useCallback } from "react";
import fetchAllProducts from "@/actions/fetchAllProducts";

interface Product {
  id: string;
  productname: string;
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
  
  if (loading) {
    return (
      <div className="spinner flex justify-center items-center" style={{ height: "calc(100vh - 95px)" }}>
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }
    
  return (
    <div className="container mx-auto px-1 py-5">
      <h1 className="text-center p-2 text-xl font-bold">Buy</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard2 link="/buy/" id={product.id} productName={product.productname} productImage={product.productimage} />
          </div>
        ))}
      </div>
    </div>
  );
}
