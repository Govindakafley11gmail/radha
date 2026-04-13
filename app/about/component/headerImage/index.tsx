"use client";

import Image from "next/image";

export default function ImageComponent() {
  return (
    <div className="relative w-full h-[500px]  overflow-hidden">
      
      {/* Background Image */}
      <Image
        src="/Nail.jpg"
        alt="About"
        fill
        className="object-cover"
        priority
      />

      {/* Gray/Dark Overlay */}
      <div className="absolute inset-0 " />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold">
          About us
        </h1>
      </div>
    </div>
  );
}