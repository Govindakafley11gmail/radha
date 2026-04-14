import { motion, type Variants, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/* ---------------- animations ---------------- */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

/* ---------------- data ---------------- */
const slides = [
  {
    id: 0,
    title: "Building Trust, Driving Growth",
    desc: "Present your business with confidence using a clean, flexible, and fully responsive template that helps you connect with clients and grow.",
  },
  {
    id: 1,
    title: "Empowering Digital Excellence",
    desc: "Create modern experiences with scalable architecture, smooth animations, and industry-grade UI patterns.",
  },
];

export default function HeroPage() {

  const [index, setIndex] = useState(0);
  const currentSlide = slides[index];
  const words = currentSlide.title.split(" ");

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev + slides.length - 1) % slides.length);
  };
  console.log("currentSlide", index);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          exit={{ scale: 1.1 }}
          transition={{ duration: 1.5, ease: EASE_OUT }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')",
          }}
        />
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Hero Content */}
      <motion.main
        key={`content-${currentSlide.id}`}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 text-center text-white"
      >
        {/* Word-by-word animated title */}
        <h1 className="max-w-4xl text-4xl md:text-6xl font-bold leading-tight flex flex-wrap justify-center gap-x-3">
          {words.map((w, i) => (
            <motion.span
              key={`${currentSlide.id}-${i}`} // Unique key per slide
              variants={word}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        {/* Animated underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.6 }}
          className="mt-4 h-1 bg-orange-500"
        />

        {/* Description */}
        <motion.p
          variants={item}
          className="mt-6 max-w-3xl text-lg md:text-xl text-gray-200"
        >
          {currentSlide.desc}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={item}>
          <Button className="mt-10 rounded-full bg-orange-500 px-10 py-6 text-lg font-medium hover:bg-orange-600 transition">
            Get Started
          </Button>
        </motion.div>
      </motion.main>

      {/* Slider Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-4 text-3xl text-white backdrop-blur-sm transition hover:bg-white/30"
        aria-label="Previous slide"
      >
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          ‹
        </motion.span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-4 text-3xl text-white backdrop-blur-sm transition hover:bg-white/30"
        aria-label="Next slide"
      >
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: 0.5,
            ease: "easeInOut",
          }}
        >
          ›
        </motion.span>
      </button>

      {/* Optional: Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full transition ${
              i === index ? "bg-orange-500" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
