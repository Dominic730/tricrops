"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

export default function ProductCard() {
  const [weight, setWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const price = 100;

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

  return (
    <div className="w-fit border-2 border-green-500 px-3 rounded-md shadow-lg">
      <div className="w-full">
        <Image
          src="/banana.png"
          alt="banana"
          width={1000}
          height={1000}
          className="w-full"
        />
      </div>
      <div className="text-center text-lg pb-5">
        <p>Price: &#8377;{price}(per KG)</p>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 text-center">
          <p>Quantity(in Kgs)</p>
          <div className="flex gap-2 text-center">
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
        <div className="flex flex-col gap-2 text-center">
          <p>Estimated Price</p>
          <p>&#8377;{totalCost}</p>
        </div>
      </div>
      <div className="py-10 flex justify-between gap-16">
        <Button className="bg-green-500 hover:bg-green-400 flex-1">Sell</Button>
        <Button className="bg-green-500 hover:bg-green-400 flex-1">
          Add to Sack
        </Button>
      </div>
    </div>
  );
}
