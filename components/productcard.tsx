"use client";
import Image from "next/image";

interface ProductCardProps {
  productName: string;
  productPrice: number;
}

export default function ProductCard({
  productName,
  productPrice,
}: ProductCardProps) {
  const price = productPrice;

  function capitalizeFirstLetter(name: string) {
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
  }

  return (
    <div className="w-fit border-2 border-gray-200 shadow-sm rounded-md">
      <div className="w-full flex justify-center">
        <Image
          src="/nutmeg.png"
          alt="banana"
          width={1000}
          height={1000}
          className="w-[238px] aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col pb-5 gap-2">
        <div className="text-center text-xl font-medium">
          {capitalizeFirstLetter(productName)}
        </div>
        <div className="text-center text-lg">
          <p>&#8377;{price}/Kg</p>
        </div>
      </div>
    </div>
  );
}
