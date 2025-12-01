"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavContent() {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/hero-bg.jpg"
        alt="Background"
        fill
        className="object-cover scale-105"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center max-w-4xl px-6"
      >
        <p className="text-orange-400 tracking-widest font-medium text-sm mb-4">
          DESIGN THAT DELIVERS
        </p>

        <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Creative Solutions for <br /> Digital Success
        </h1>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl">
            Request Quote
          </Button>

          <Button
            variant="outline"
            className="border-white text-white px-8 py-6 text-lg rounded-xl hover:bg-white/10"
          >
            Meet the Team
          </Button>
        </div>
      </motion.div>

      {/* Left Arrow */}
      <button className="absolute left-6 top-1/2 -translate-y-1/2 z-30 text-white bg-white/20 hover:bg-white/30 p-3 rounded-full transition">
        <ChevronLeft size={32} />
      </button>

      {/* Right Arrow */}
      <button className="absolute right-6 top-1/2 -translate-y-1/2 z-30 text-white bg-white/20 hover:bg-white/30 p-3 rounded-full transition">
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
