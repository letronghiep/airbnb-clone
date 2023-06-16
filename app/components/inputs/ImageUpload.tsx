"use client";
import React, { useCallback } from "react";

import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

declare global {
  var cloudinary: any;
}

type ImageUploadProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="afto5ahy"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                p-20
                flex
                flex-col
                justify-center
                items-center
                gap-4
                border-dashed
                border-2
                border-neutral-300
                text-neutral-600
                "
          >
            <TbPhotoPlus size={50} />
            <h3 className="font-semibold text-lg">Click to upload</h3>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  style={{ objectFit: "cover" }}
                  fill
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
