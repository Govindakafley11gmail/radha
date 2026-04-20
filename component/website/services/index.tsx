// ServicesSection.tsx
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import ServicesCarousel from "./servicescarasol";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const ServicesSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Floating Circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-orange-50 rounded-full opacity-60 animate-pulse-slow -z-10"></div>
      <div className="absolute bottom-0 right-10 w-32 h-32 bg-orange-100 rounded-full opacity-50 animate-pulse-slow -z-10"></div>

      <div className="container mx-auto px-4 flex flex-col justify-center items-center lg:flex-row items-center gap-12">
        {/* Text Content */}
        <motion.div
          className="flex flex-1 flex-col justify-around items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.span
            className="text-orange-500 self-start md:ml-26 font-semibold text-sm uppercase px-4 py-1 bg-orange-100 rounded"
            variants={fadeUp}
          >
            Professional Services
          </motion.span>

          <motion.h2
            className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 leading-snug"
            variants={fadeUp}
          >
            Elevating Business Performance <br /> Through Strategic Solutions
          </motion.h2>

          <motion.p
            className="mt-4 text-gray-600 max-w-lg w-full"
            variants={fadeUp}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            varius risus sed pellentesque auctor. Phasellus gravida magna at
            tortor cursus, sit amet suscipit tortor malesuada.
          </motion.p>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="flex-1 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ delay: 0.3 }}
        >
          {/* Decorative Circles Around Image */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 rounded-full -z-10 animate-pulse-slow"></div>
          <div className="absolute bottom-5 left-5 w-20 h-20 bg-orange-100 rounded-full -z-10 animate-pulse-slow"></div>

          <Image
            src="/Beautiful Dzong.jpg"
            alt="Professional Service"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-1h-auto"
            priority
          />
        </motion.div>
      </div>
      <ServicesCarousel />
    </section>
  );
};

export default ServicesSection;