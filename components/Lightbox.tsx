"use client";

import { useEffect } from "react";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";

export type LightboxItem = {
  title: string;
  body?: string;
  image: string;
};

export default function Lightbox({
  item,
  onClose,
}: {
  item: LightboxItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-surface-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          <FaXmark size={14} />
        </button>
        <div className="relative aspect-3104/2024 w-full bg-surface-950">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-contain"
          />
        </div>
        <div className="p-5">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {item.title}
          </h3>
          {item.body && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {item.body}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
