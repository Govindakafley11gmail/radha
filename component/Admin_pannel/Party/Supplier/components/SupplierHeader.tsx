import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type Props = {
  buttonTitle?:string;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onCreate?: () => void;
};

export default function SupplierHeader({
  searchQuery,
  setSearchQuery,
  onCreate,
  buttonTitle
}: Props) {
  return (
    <div className="flex justify-between items-center gap-4 pb-3">
        <div className="relative w-1/3">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="h-5 w-5" />
        </span>
        <Input
          type="text"
          placeholder="Search by Invoice No or CID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
        />
      </div>

    { buttonTitle && <Button onClick={onCreate} className="bg-orange-500 text-white hover:bg-orange-600 h-12 px-6 rounded-md shadow-md">
        {buttonTitle}
      </Button>}
    </div>
  );
}