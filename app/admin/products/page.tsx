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

export default function AdminProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

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
      <div className="spinner flex justify-center items-center" style={{ height: "calc(100vh - 96px)" }}>
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }
    
  return (
    <div className="container mx-auto px-1 py-5" style={{ height: "calc(100vh - 96px)" }}>
      <div className="flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard link="/admin/products/" id={product.id} productName={product.productname} productPrice={product.productprice} productImage={product.productimage} />
          </div>
        ))}
      </div>
    </div>
  );
}
