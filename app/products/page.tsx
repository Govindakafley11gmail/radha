"use client";

import Footer from "@/component/footer/footer";

import ProductSection from "./components/product-category";
import ProductSlider from "./components/product-slider";
import { products, sliderImages } from "./data";

// Group products by category
const grouped = products.reduce<Record<string, typeof products>>(
  (acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  },
  {},
);

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductSlider images={sliderImages} />

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-14">
        {Object.entries(grouped).map(([category, items]) => (
          <ProductSection key={category} category={category} items={items} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
