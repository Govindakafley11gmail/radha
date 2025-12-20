// AboutSection.tsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, Variants } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

interface Badge {
  value: string | number;
  label: string;
  position: 'top-right' | 'bottom-left';
  bgColor?: string;
  textColor?: string;
}

interface FeatureCard {
  icon: string;
  title: string;
  desc: string;
}

interface AboutSectionProps {
  imageSrc: string | StaticImageData;
  badges: Badge[];
  heading: string;
  subHeading: string;
  description: string;
  features: FeatureCard[];
  checklist: string[];
  buttonText: string;
}

const badgeVariant: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } as const },
};

const AboutSection: React.FC<AboutSectionProps> = ({
  imageSrc,
  badges,
  heading,
  subHeading,
  description,
  features,
  checklist,
  buttonText,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gradientX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const gradientY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  return (
    <section
      className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Image Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative w-full md:w-1/2 h-96 md:h-[400px] rounded-xl overflow-hidden"
      >
        <motion.div
          style={{ background: `radial-gradient(circle at ${gradientX} ${gradientY}, #ff9900, #ff6600)` }}
          className="absolute inset-0 z-0 transition-all duration-300"
        />
        <Image src={imageSrc} alt="About Image" className="rounded-xl shadow-lg object-cover relative z-10" fill />

        {/* Dynamic badges */}
        {badges.map((badge, idx) => {
          const positionClass =
            badge.position === 'top-right'
              ? 'top-4 right-4'
              : badge.position === 'bottom-left'
              ? 'bottom-4 left-4'
              : '';
          return (
            <motion.div
              key={idx}
              variants={badgeVariant}
              className={`absolute ${positionClass} ${badge.bgColor || 'bg-white'} ${
                badge.textColor || 'text-orange-500'
              } font-bold px-4 py-2 rounded-lg shadow-lg text-center cursor-pointer z-20 overflow-hidden relative`}
              whileHover={{ scale: 1.1 }}
            >
              {badge.value} <span className="text-xs block">{badge.label}</span>
              <motion.div
                style={{
                  background: `radial-gradient(circle at ${gradientX} ${gradientY}, rgba(255,255,255,0.3), transparent)`,
                }}
                className="absolute inset-0 pointer-events-none rounded-lg"
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex-1"
      >
        <p className="text-orange-500 font-semibold mb-2">{subHeading}</p>
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p className="text-gray-600 mb-6">{description}</p>

        {/* Features */}
        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          {features.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              className="flex items-start gap-3 bg-orange-50 p-4 rounded-lg shadow hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-orange-500 text-2xl">{card.icon}</div>
              <div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Checklist */}
        <ul className="text-gray-600 space-y-2 mb-6">
          {checklist.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-orange-500">✔</span> {item}
            </li>
          ))}
        </ul>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          {buttonText}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default AboutSection;
