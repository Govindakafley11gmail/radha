/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable, Column, ActionConfig } from "@/component/table";
import { Delete, Edit, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomDialog, FieldConfig } from "@/common-component/customDialogbox";

import { showToast } from "nextjs-toast-notify";

import { Customerfields, emptyCustomerDefaults } from "./dataform";
import { useCustomerMutations, useGetCustomer } from "./tanstack-function";
import { CustomerCreateResponse, CustomerInputFormValues } from "./ínterface";

export default function Customer() {
  const [selected, setSelected] = useState<CustomerCreateResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<CustomerCreateResponse | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CustomerCreateResponse | null>(
    null
  );
  const { createCustomer, updateCustomer, deleteCustomer } =
    useCustomerMutations({
      onSuccess: (data) => {
        showToast.success(data.message, {
          duration: 5000,
          position: "top-right",
          transition: "topBounce",
          icon: "",
          sound: true,
        });
        setIsDialogOpen(false);
        setEditingUser(null);
      },
      onError: (error) => {
        showToast.error(error?.data?.message || "Something went wrong", {
          duration: 5000,
          position: "top-right",
          transition: "topBounce",
          icon: "",
          sound: true,
        });
      },
    });
  const { data: GetCustomerData, isLoading: isGetCustomerLoading } =
    useGetCustomer();
  const CustomerGetData = GetCustomerData?.data || [];
  const filteredData: CustomerCreateResponse[] = useMemo(() => {
    if (!CustomerGetData) return [];
    if (!searchQuery.trim()) return CustomerGetData;

    const query = searchQuery.toLowerCase();
    return CustomerGetData.filter(
      (GetCustomerData: any) =>
        GetCustomerData.name.toLowerCase().includes(query) ||
        GetCustomerData.identification_no.toLowerCase().includes(query)
    );
  }, [CustomerGetData, searchQuery]);

  // Table columns
  const Columns: Column<CustomerCreateResponse>[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "CID No", accessor: "identification_no" },
    { header: "Address", accessor: "address" },
    { header: "Phone No", accessor: "phone_no" },
  ];

  // Edit user
  const handleEdit = (row: CustomerCreateResponse) => {
    setEditingUser(row);
    setIsDialogOpen(true);
  };
  // Delete user
  const handleDelete = (row: CustomerCreateResponse) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the user "${row.name}"? This action cannot be undone.`
    );
    if (!confirmed) return;
    deleteCustomer(row.customer_id);
  };
  // Table actions
  const actions: ActionConfig<CustomerCreateResponse>[] = [
    {
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: handleEdit,
    },
    {
      label: "Delete",
      icon: <Delete className="h-4 w-4" />,
      onClick: handleDelete,
    },
  ];

  // Handle form submit
  const handleSubmit = (values: Record<string, any>) => {
     const payload = {
    ...values,
    credit_limit: Number(values.credit_limit),
  };
    if (editingUser?.customer_id) {
      updateCustomer({
        id: editingUser.customer_id,
        data: payload as CustomerInputFormValues,
      });
    } else {
      createCustomer(payload as CustomerInputFormValues);
    }
  };
  return (
    <div className="min-h-screen w-full p-6">
      {/* Search & Create */}
      <div className="flex justify-between items-center gap-4 pb-3">
        <div className="relative w-1/3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </span>
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
          />
        </div>

        <Button
          onClick={() => {
            // setEditingUser(null);
            setIsDialogOpen(true);
          }}
          className="bg-orange-500 text-white hover:bg-orange-600 h-12 px-6 rounded-md shadow-md"
        >
          Create Customer
        </Button>
      </div>

      {/* Custom Dialog for Create/Edit */}
      <CustomDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingUser(null);
        }}
        title={editingUser ? "Edit Customer" : "Create Customer"}
        fields={Customerfields}
        defaultValues={editingUser ? editingUser : emptyCustomerDefaults}
        OnSubmitTitle={editingUser ? "Update Customer" : "Create Customer"}
        CustomDialogBoxStyle="px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-5 overflow-y-auto flex-1"
        onSubmit={handleSubmit}
      />

      {/* User Table */}
      <DataTable
        data={filteredData}
        columns={Columns}
        onRowClick={(row) => {
          setSelectedRow(row);
          setIsModalOpen(true);
        }}
        actions={actions}
        selectable
        onSelectionChange={setSelected}
        pageSize={10}
      />
    </div>
  );
}
