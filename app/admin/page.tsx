"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import addProducts from "@/actions/addproducts";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card";

export default function Admin() {
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

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
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

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
                <Label htmlFor="product-name" className="block mb-2 text-md font-medium text-gray-700">
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
                <Label htmlFor="product-price" className="block mb-2 text-md font-medium text-gray-700">
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
                <Label htmlFor="product-image" className="block mb-2 text-md font-medium text-gray-700">
                  Product Image
                </Label>
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
              <Button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500">
                Upload Product
              </Button>
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
