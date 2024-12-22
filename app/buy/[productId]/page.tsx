'use client'

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import fetchProduct from "@/actions/fetchProduct";
import { AlertCircle, Loader } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Product {
  id: string
  productname: string
  productprice: number
  productimage: string
}

export default function Product() {
  const [product, setProduct] = useState<Product | null>(null)
  const { productId } = useParams<{ productId: string }>()

  useEffect(() => {
    fetchProduct(productId).then(setProduct)
  }, [productId])

  if (!product) {
    return (
      <div className="spinner flex justify-center items-center" style={{ height: "calc(100vh - 95px)" }}>
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-28">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image src={product.productimage} alt={product.productname} width={1000} height={1000} className="h-full w-full object-cover md:w-96" priority />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Product Details</div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product.productname}</h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">
              The price displayed for this product is an estimate and may vary. The final amount will be confirmed at the time of collection. Payment will be done upon collection of the product. Thank you for your understanding.
            </p>
            <div className="mt-8">
              <Button size="default" asChild>
                <Link href={`/quote/${productId}`} className="text-indigo-600 hover:text-indigo-900">
                  Get Quote
                </Link>
              </Button>
            </div>            
            <div className="mt-8">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Alert</AlertTitle>
                <AlertDescription>
                  All spices undergo quality and quantity checks upon arrival. Standard pricing applies to top-quality spices, while adjusted rates are offered for lower-grade ones. This ensures our commitment to excellence.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}