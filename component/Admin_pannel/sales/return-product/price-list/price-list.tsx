/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { FileText, Package } from "lucide-react";
import PriceListTabsComponent from "./tabs/price-list-tabs";
import OtherComponentTab from "./tabs/other-component";
import OtherComponentTabs from "./tabs/other-component";

// Import your other component here
// import YourOtherComponent from "./YourOtherComponent";

// Separate component for Purchase Invoices Tab
export default function PriceListComponet() {
  return (
    <div className="min-h-screen w-full p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Price List Management
          </h1>
          <p className="text-gray-600 mt-1">Manage Price List</p>
        </div>

        {/* Tabs Container */}
        <Tabs defaultValue="invoices">
          <TabsList className="inline-flex bg-white border border-gray-200 p-1 rounded-lg shadow-sm h-auto">
            <TabsTrigger
              value="invoices"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white px-6 py-3 rounded-md transition-all flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Price List
            </TabsTrigger>

            <TabsTrigger
              value="other"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white px-6 py-3 rounded-md transition-all flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              Price List Edit And Update
            </TabsTrigger>
          </TabsList>

          {/* First Tab - Purchase Invoices */}
          <TabsContent value="invoices" className="space-y-4 mt-6">
            <PriceListTabsComponent />
          </TabsContent>

          {/* Second Tab - Other Component */}
          <TabsContent value="other" className="mt-6">
            <OtherComponentTabs />
            {/* Or directly import and use: <YourOtherComponent /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
