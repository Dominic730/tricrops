"use client";
import Image from "next/image";
import addCart from "@/actions/addCart";
import { Minus, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import { Button } from "@/components/ui/button";
import fetchProduct from "@/actions/fetchProduct";
import { onAuthStateChanged, User } from "firebase/auth";

interface Product {
  id: string;
  productname: string;
  productprice: number;
  productimage: string;
}

export default function Product() {
  const [weight, setWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [product, setProduct] = useState<Product>();

  const productid = useParams<{ productId: string }>();

  useEffect(() => {
    onAuthStateChanged(auth, (user: null | User) => {
      if (user && user.email) {
        setUser(user);
      }
    });
    const getProduct = async () => {
      const item = await fetchProduct(productid.productId);
      if (item) {
        setProduct(item);
      }
    };
    getProduct();
  }, [productid]);

  if (!product) {
    return null;
  }

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

  const price = product.productprice;

  async function submitData(product: Product) {
    if (productid) {
      const productName = product.productname;
      const price = product.productprice;
      const userId = user?.uid;
      console.log(userId);

      try {
        if (userId !== null) {
          addCart({ productName, price, weight, userId });
        }
        alert("Product added to cart");
      } catch (e) {
        console.log(e);
        alert("Failed to add product to cart");
      }
      setWeight(0);
      setTotalCost(0);
    }
  }
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-center items-center">
          <div className="w-[300px] aspect-square flex items-center">
            <Image
              src={product.productimage}
              alt="nutmeg"
              width={1000}
              height={1000}
              className="w-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-lg font-medium">TripCrops</p>
          <p className="text-3xl md:text-5xl font-[600]">
            {product.productname}
          </p>
          <p className="text-gray-500">
            The price displayed for this product is an estimate and may vary.{" "}
            <br />
            The final amount will be confirmed at the time of collection. <br />
            Payment will be done upon collection of the product. Thank <br />
            you for your understanding.
          </p>
          <div className="flex">
            <div className="flex">
              <p className="text-xl md:text-3xl font-medium">
                &#8377;{price}/Kg
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between md:justify-normal gap-5 md:gap-40 h-fit">
            <div className="flex flex-col gap-5 md:gap-8 h-full justify-between">
              <div className="flex flex-col gap-2 text-xl md:text-3xl">
                <p className="font-medium">Estimated Price</p>
                <p>&#8377;{totalCost}</p>
              </div>
              <div className="">
                <Button
                  className="bg-green-500 hover:bg-green-400"
                  disabled={weight === 0}
                  onClick={() => {
                    submitData(product);
                  }}
                >
                  Add to Sack
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-5 md:gap-3">
              <div className="flex">
                <div className="flex flex-col gap-3">
                  <p className="text-xl md:text-3xl font-medium">Weight</p>
                  <div className="flex gap-2 text-center justify-center p-2 rounded-md text-lg bg-[#f7f8fd]">
                    <Minus
                      size={24}
                      onClick={handleDecrease}
                    />
                    <div className="pr-5">
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => {
                          const newWeight = Number(
                            e.target.value.replace(/^0+/, "")
                          );
                          e.target.value = String(newWeight);
                          setWeight(newWeight);
                          setTotalCost(newWeight * price);
                        }}
                        className="text-center w-16 bg-transparent outline-none"
                      />
                      <span>Kg</span>
                    </div>
                    <Plus
                      onClick={handleIncrease}
                      size={24}
                    />
                  </div>
                </div>
              </div>
              <Button className="bg-green-500 hover:bg-green-400 w-28">
                Buy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
