"use client";

import { useEffect, useState } from "react";

export default function ProductSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[300px] sm:h-[420px] lg:h-[520px] overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-5xl font-bold text-white">
          Our <span className="text-orange-500">Products</span>
        </h1>
        <p className="text-gray-200 mt-2 text-sm sm:text-base max-w-xl">
          High quality industrial materials for construction & security
        </p>
      </div>
    </div>
  );
}