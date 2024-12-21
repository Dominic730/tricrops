"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase/firebase";
import { Button } from "@/components/ui/button";
import addProducts from "@/actions/addproducts";
import { UploadButton } from "@/utils/uploadthing";
import AdminSidebar from "@/components/adminsidebar";
import { onAuthStateChanged, User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import fetchAllProducts from "@/actions/fetchAllProducts";
import { Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card";

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
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const FetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllProducts();
      setProducts(data ?? []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const authenticatedEmails = ["adithyakb93@gmail.com", "abrahul02@gmail.com"];
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email && authenticatedEmails.includes(currentUser.email)) {
        setUser(currentUser);
        FetchData();
      } else {
        router.push("/");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router, FetchData]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productPrice || !imageUrl) {
      alert("All fields are required.");
      return;
    }
    if (Number(productPrice) <= 0) {
      alert("Price must be greater than 0.");
      return;
    }
    try {
      await addProducts({
        productname: productName,
        productprice: Number(productPrice),
        productimage: imageUrl,
      });
      alert("Product added successfully!");
      setProductName("");
      setProductPrice("");
      setImageUrl("");
      FetchData();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height: "calc(100vh - 96px)" }}>
        <Loader className="animate-spin h-16 w-16 text-green-500" />
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
    <div className="flex" style={{ height: "calc(100vh - 96px)" }}>
      <div className="bg-gray-100 flex items-center justify-center w-full">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-xl font-bold text-center bg-gray-800 text-white p-4">
            Upload Product
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-6 py-5">
              <div>
                <Label htmlFor="product-name" className="block mb-2 text-md font-medium text-gray-700"> Product Name </Label>
                <Input id="product-name" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter product name" required />
              </div>
              <div>
                <Label htmlFor="product-price" className="block mb-2 text-md font-medium text-gray-700"> Product Price </Label>
                <Input id="product-price" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter product price" required />
              </div>
              <div>
                <Label htmlFor="product-image" className="block mb-2 text-md font-medium text-gray-700"> Product Image </Label>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageUrl(`https://utfs.io/f/${res[0].key}`);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"> Upload Product </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center p-4 bg-gray-50">
            <p className="text-sm text-gray-500">Ensure the details are correct before submitting.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
