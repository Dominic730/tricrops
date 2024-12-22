'use client'

import Image from 'next/image';
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import fetchProduct from "@/actions/fetchProduct";
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Product {
  id: string;
  productname: string;
  productimage: string;
}

export default function Page() {
  const { productId } = useParams() as { productId: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
    setSuccess(true);
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId).then(setProduct).catch((err) => {
        console.error("Error fetching product:", err);
      });
    }
  }, [productId]);

  return (
    <div className="container mx-auto px-4 pt-28">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Request a Quote</h1>
        </CardHeader>
        <CardContent>
          {success && (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your quote request has been sent successfully.</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Form:</h2>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" placeholder="Enter Your Name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="Enter Your Email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Enter Your Message" value={formData.message} onChange={handleInputChange} />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>

            {/* Product Details Section */}
            {product && (
              <div className=''>
                <h2 className="text-xl font-bold mb-4">Product Details:</h2>
                <div className="flex flex-col items-center lg:justify-start lg:flex-row">
                  {product.productimage && (
                    <Image src={product.productimage} alt={product.productname} width={300} height={150} className="h-auto w-full max-w-md object-cover" priority />
                  )}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">{product.productname}</h3>
                    <p className="text-gray-500">Product ID: {product.id}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
