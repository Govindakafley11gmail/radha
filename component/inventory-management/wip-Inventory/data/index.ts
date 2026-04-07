import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
import { Dessert, RollerCoaster } from "lucide-react";
import * as Yup from "yup";

export const WIPInventoryFields: PermssionForm[] = [
      {
    name: "batchId",
    label: "Batch Group",
    type: "select",
    placeholder: "Select Batch Group",
    validation: Yup.string().required("Batch Group is required"),
    Icon: Dessert,
    options: [], // will be injected
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
    placeholder: "Enter quantity",
    validation: Yup.number().required("Quantity is required").positive("Quantity must be a positive number"),
    Icon: RollerCoaster,
  },
  {
    name: "cost",
    label: "Cost",
    type: "number",
    placeholder: "Enter Cost",
    validation: Yup.number().required("Cost is required").positive("Cost must be a positive number"),
    Icon: Dessert,
  },

];
