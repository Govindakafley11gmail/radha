"use client";

import { DataTable, Column, ActionConfig } from "@/component/table";
import { Edit, Search } from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "./statusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Order = {
  id: string;
  shopify: string;
  date: string;
  status: string;
  customer: string;
  email: string;
  source: string;
};

export default function OrdersPage() {
  const [selected, setSelected] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const data: Order[] = [
    {
      id: "XX-6674",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Refunded",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6675",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Pending",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6676",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Completed",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6676",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Completed",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6676",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Completed",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6676",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Completed",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6676",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Completed",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6676",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Completed",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6676",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Completed",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6676",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Completed",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6676",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Completed",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6676",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Completed",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
    {
      id: "XX-6676",
      shopify: "17713",
      date: "Dec 28, 2023",
      status: "Completed",
      customer: "Ahmed",
      email: "test@test.com",
      source: "Shopify",
    },
  ];

  const columns: Column<Order>[] = [
    { header: "Order ID", accessor: "id" },
    { header: "Shopify #", accessor: "shopify" },
    { header: "Date", accessor: "date" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => <StatusBadge status={value as string} />,
    },
    { header: "Customer", accessor: "customer" },
    { header: "Email", accessor: "email" },
    { header: "Source", accessor: "source" },
  ];

  const actions: ActionConfig<Order>[] = [
    {
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => alert(`Edit ${row.id}`),
    },
    {
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => alert(`Edit ${row.id}`),
    },
    {
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => alert(`Edit ${row.id}`),
    },
    {
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => alert(`Edit ${row.id}`),
    },
  ];

  return (
    <div className="min-h-screen w-full p-6">
     <div className="flex justify-end">
       <div className="flex items-center gap-2 w-full pb-3">
        {/* Search input wrapper */}
        <div className="relative w-1/3">
          {/* Search icon */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </span>

          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset to first page on search
            }}
            className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
          />
        </div>

        {/* Create button */}
        <Button className="bg-orange-500 text-white hover:bg-orange-600 h-12 px-6 rounded-md shadow-md">
          Search
        </Button>
        </div>

        <Button className="bg-orange-500 text-white hover:bg-orange-600 h-12 px-6 rounded-md shadow-md">
          Create
        </Button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        actions={actions}
        selectable
        onSelectionChange={setSelected}
      />
    </div>
  );
}
