/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Package } from "lucide-react";

import SalesInvoicesTab from "./tabs/sales-invoice-tabs";
import OtherComponentTab from "./tabs/othertabs";



export default function SalesReceiptComponent() {
  
  return (
    <div className="min-h-screen w-full p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Sales Receipt Management</h1>
          <p className="text-gray-600 mt-1">Manage sales receipt</p>
        </div>

        {/* Tabs Container */}
        <Tabs defaultValue="invoices" className="w-full">
          <TabsList className="bg-white border border-gray-200 p-1 rounded-lg shadow-sm h-auto">
            <TabsTrigger
              value="invoices"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md px-6 py-3 rounded-md transition-all duration-200 font-medium flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Sales Invoices
            </TabsTrigger>
            <TabsTrigger
              value="other"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md px-6 py-3 rounded-md transition-all duration-200 font-medium flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              Sales Settle
            </TabsTrigger>
          </TabsList>

          {/* First Tab - Purchase Invoices */}
          <TabsContent value="invoices" className="space-y-4 mt-6">
            <SalesInvoicesTab />
          </TabsContent>

          {/* Second Tab - Other Component */}
          <TabsContent value="other" className="mt-6">
            <OtherComponentTab />
            {/* Or directly import and use: <YourOtherComponent /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

}
