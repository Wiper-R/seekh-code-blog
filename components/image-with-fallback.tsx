"use client";
import { ComponentProps, useState } from "react";

type ImageWithFallbackProps = Omit<ComponentProps<"img">, "onError"> & {
  fallbackSrc?: string;
};

export function ImageWithFallback({
  src,
  fallbackSrc,
  ...props
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  return (
    <img
      {...props}
      src={imageSrc || fallbackSrc}
      onError={() => {
        console.log("On error fired");
        fallbackSrc && setImageSrc(fallbackSrc);
      }}
    />
  );
}
