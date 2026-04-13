/* eslint-disable @typescript-eslint/no-explicit-any */

import ProductCard from "./product-card";

export default function ProductSection({
  category,
  items,
}: {
  category: string;
  items: any[];
}) {
  return (
    <section>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {category}
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">
            {items.length} product{items.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex-1 h-px bg-gray-200 mt-1" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}