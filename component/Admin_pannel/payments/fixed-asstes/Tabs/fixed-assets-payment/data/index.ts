import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
import { Dessert, RollerCoaster } from "lucide-react";
import * as Yup from "yup";

export const FixedAssetsPaymentFields: PermssionForm[] = [

  {
    name: "amount",
    label: "Amount",
    type: "number",
    placeholder: "Enter Amount",
    validation: Yup.number()
      .required("Amount is required")
      .positive("Amount must be a positive number"),
    Icon: Dessert,
  },
  {
    name: "paymentDate",
    label: "Payment Date",
    type: "date",
    placeholder: "Enter Payment Date",
    validation: Yup.date().required("Payment Date is required"),
    Icon: Dessert,
  },
  {
    name: "paymentMode",
    label: "Payment Mode",
    type: "select",
    placeholder: "Enter Payment Mode",
    validation: Yup.string().required("Payment Mode is required"),
    options: [
      { label: "Cash", value: "CASH" },
      { label: "Bank", value: "BANK" },
    ],
  },
    {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter Description",
    validation: Yup.string().required("Description is required"),
    Icon: RollerCoaster,
  },
];
