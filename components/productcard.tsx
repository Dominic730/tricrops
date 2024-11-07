"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface ProductCardProps {
  productName: string;
  productPrice: number;
}

export default function ProductCard({
  productName,
  productPrice,
}: ProductCardProps) {
  const [weight, setWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const price = productPrice;

  const handleDecrease = () => {
    setWeight((prevWeight) => {
      const newWeight = prevWeight > 0 ? prevWeight - 1 : 0;
      setTotalCost(newWeight * price);
      return newWeight;
    });
  };

  const handleIncrease = () => {
    setWeight((prevWeight) => {
      const newWeight = prevWeight + 1;
      setTotalCost(newWeight * price);
      return newWeight;
    });
  };

  function capitalizeFirstLetter(name: string) {
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
  }

  return (
    <div className="w-fit border-2 border-gray-200 px-3 rounded-md shadow-lg">
      <div className="w-full">
        <Image
          src="/banana.png"
          alt="banana"
          width={1000}
          height={1000}
          className="w-full"
        />
      </div>
      <div className="text-center text-xl font-medium pb-1">
        {capitalizeFirstLetter(productName)}
      </div>
      <div className="text-center text-lg">
        <p>&#8377;{price}/Kg</p>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col py-5 gap-2">
          <div className="flex flex-col gap-2 text-center">
            <p>Quantity(in Kgs)</p>
            <div className="flex gap-2 text-center justify-center">
              <Minus
                size={24}
                onClick={handleDecrease}
              />
              <p>{weight} Kg</p>
              <Plus
                onClick={handleIncrease}
                size={24}
              />
            </div>
          </div>
          <Button className="bg-green-500 hover:bg-green-400">Sell</Button>
        </div>
        <div className="py-5 flex flex-col gap-2">
          <div className="flex flex-col gap-2 text-center">
            <p>Estimated Price</p>
            <p>&#8377;{totalCost}</p>
          </div>
          <Button className="bg-green-500 hover:bg-green-400">
            Add to Sack
          </Button>
        </div>
      </div>
    </div>
  );
}
