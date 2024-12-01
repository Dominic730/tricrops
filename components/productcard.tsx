"use client";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  productName: string;
  productPrice: number;
  productImage: string;
  id: string;
  link: string;
}

export default function ProductCard({
  productName,
  productPrice,
  productImage,
  id,
  link,
}: ProductCardProps) {
  const price = productPrice;

  return (
    <div className="w-full h-full border border-gray-200 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <Link
        href={`${link}${id}`}
        className="h-full flex flex-col"
      >
        <div className="w-full flex justify-center p-4">
          <Image
            src={productImage}
            alt={productName}
            width={1000}
            height={1000}
            className="w-[238px] aspect-square object-contain rounded-md"
          />
        </div>

        <div className="flex flex-col px-4 pb-5 gap-2">
          <div className="text-center text-xl font-semibold text-gray-800 truncate">
            {productName}
          </div>
          <div className="text-center text-lg font-medium text-gray-600">
            <p>&#8377;{price}/Kg</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
