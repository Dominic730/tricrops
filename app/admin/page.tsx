"use client";

import { Loader } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase/firebase";
import { Button } from "@/components/ui/button";
import addProducts from "@/actions/addproducts";
import { UploadButton } from "@/utils/uploadthing";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import fetchAllProducts from "@/actions/fetchAllProducts";
import AdminSidebar from "@/components/adminsidebar";

interface Product {
  id: string;
  productname: string;
  productprice: number;
  productimage: string;
}

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const FetchData = useCallback(async () => {
    setLoading(true);
    const data = await fetchAllProducts();
    setProducts(data ?? []);
  }, []);

  useEffect(() => {
    const authenticatedEmails = [
      "adithyakb93@gmail.com",
      "abrahul02@gmail.com",
    ];
    FetchData();
    onAuthStateChanged(auth, (user: null | User) => {
      if (user && user.email && authenticatedEmails.includes(user?.email)) {
        setUser(user);
      } else {
        router.push("/");
      }
      setLoading(false);
    });
  }, [router]);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-16 w-16 text-green-500" />{" "}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        Not Authenticated
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-20 px-10 md:px-0 flex-1">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-xl font-bold text-center bg-gray-800 text-white p-4">
            Upload Product
          </CardHeader>
          <CardContent>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await addProducts({
                  productname: productName,
                  productprice: Number(productPrice),
                  productimage: imageUrl,
                });
              }}
              className="space-y-6 py-5"
            >
              <div>
                <Label
                  htmlFor="product-name"
                  className="block mb-2 text-md font-medium text-gray-700"
                >
                  Product Name
                </Label>
                <Input
                  id="product-name"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="product-price"
                  className="block mb-2 text-md font-medium text-gray-700"
                >
                  Product Price
                </Label>
                <Input
                  id="product-price"
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter product price"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="product-price"
                  className="block mb-2 text-md font-medium text-gray-700"
                >
                  Product Image
                </Label>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    setImageUrl(`https://utfs.io/f/${res[0].key}`);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
              >
                Upload Product
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center p-4 bg-gray-50">
            <p className="text-sm text-gray-500">
              Ensure the details are correct before submitting.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
