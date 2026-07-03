"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

export default function ClickableScreenshot({
  src,
  title,
  body,
  sizes,
  className,
}: {
  src: string;
  title: string;
  body?: string;
  sizes: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger screenshot: ${title}`}
        className={`group relative block aspect-3104/2024 w-full cursor-zoom-in ${className ?? ""}`}
      >
        <Image
          src={src}
          alt={`${title} in Digital Lab`}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </button>
      {open && (
        <Lightbox
          item={{ title, body, image: src }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
