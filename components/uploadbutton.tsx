"use client";

import { UploadButton } from "@/utils/uploadthing";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function UploadBtn() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col gap-5 justify-center">
      {imageUrl && (
        <div className="flex flex-col items-center justify-center p-5">
          {loading && <Loader className="animate-spin absolute" />}
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={400}
            height={400}
            className=" w-[300px] border border-green-400 rounded-md object-cover"
            onLoad={() => setLoading(false)}
          />
        </div>
      )}
      <div>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res[0].key);
            setImageUrl(`https://utfs.io/f/${res[0].key}`);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
}
