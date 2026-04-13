import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductCard({ product }: any) {
  return (
    <Card
      className="group p-0 gap-0 border-0 rounded-xl overflow-hidden shadow-sm
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform
                     duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3">
          <Badge className="bg-orange-400 text-gray-700 text-xs shadow-sm">
            {product.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="px-4 pt-4 pb-5">
        <h3 className="font-semibold text-gray-900 text-base">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.desc}
        </p>
      </CardContent>
    </Card>
  );
}