"use client";

import Image from "next/image";
import { Loader } from "lucide-react";
import { auth } from "@/lib/firebase/firebase";
import editProducts from "@/actions/editProducts";
import fetchProduct from "@/actions/fetchProduct";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter, useParams } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

interface Product {
  id: string;
  productname: string;
  productprice: number;
  productimage: string;
}

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [productPrice, setProductPrice] = useState("");
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProduct(productId as string); // Ensure productId is a string
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    const authenticatedEmails = [ "adithyakb93@gmail.com", "abrahul02@gmail.com" ];
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email && authenticatedEmails.includes(user.email)) {
        setUser(user);
      } else {
        router.push("/");
      }
    });

    fetchData();
    return () => unsubscribe();
  }, [fetchData, router]);

  if (!user) {
    return <div>Not Authenticated</div>;
  }

  if (loading) {
    return (
      <div className="spinner flex justify-center items-center" style={{ height: "calc(100vh - 96px)" }}>
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center" style={{ height: "calc(100vh - 96px)" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await editProducts({
                productname: productName || product.productname,
                productprice:
                  productPrice !== ""
                    ? Number(productPrice)
                    : product.productprice,
                productimage: imageUrl || product.productimage,
                id: productId as string, // Ensure productId is a string
              });
              alert("Product updated successfully!");
            } catch (error) {
              console.error("Failed to update product:", error);
              alert("Failed to update product.");
            }
          }}
        >
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2"> Product Name </label>
            <input type="text" id="productName" className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <p>Current Product name: {product.productname}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-2"> Product Image </label>
            <Image src={imageUrl || product.productimage} alt="Product Image" width={200} height={200} className="mx-auto" />
            <UploadButton endpoint="imageUploader" 
              onClientUploadComplete={(res) => {
                setImageUrl(`https://utfs.io/f/${res[0].key}`);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-2"> Product Price (₹) </label>
            <input type="number" id="productPrice" className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Enter product price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            <p>Current Price: {product.productprice}</p>
          </div>

          <div className="flex justify-between mt-6">
            <button type="button" className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400" onClick={() => router.back()}> Cancel </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"> Save Changes </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
