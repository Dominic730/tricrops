"use client";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  productName: string;
  productPrice: number;
  productImage: string;
  id: string;
}

export default function ProductCard({
  productName,
  productPrice,
  productImage,
  id,
}: ProductCardProps) {
  const price = productPrice;

  return (
    <div className="w-full h-full border-2 border-gray-200 shadow-sm rounded-md">
      <Link href={`/product/${id}`} className="h-full">
        <div className="w-full flex justify-center">
          <Image
            src={productImage}
            alt={productName}
            width={1000}
            height={1000}
            className="w-[238px] aspect-square object-contain"
          />
        </div>
        <div className="flex flex-col pb-5 gap-2">
          <div className="text-center text-xl font-medium">{productName}</div>
          <div className="text-center text-lg">
            <p>&#8377;{price}/Kg</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
