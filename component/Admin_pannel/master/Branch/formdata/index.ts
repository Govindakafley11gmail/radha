import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
import { Dessert, RollerCoaster } from "lucide-react";
import * as Yup from "yup";

export const Branchfields: PermssionForm[] = [
  {
    name: "name",
    label: "Branch Name",
    type: "text",
    placeholder: "Enter your Branch Name",
    validation: Yup.string().required("Branch Name is required"),
    Icon: RollerCoaster,
  },
  {
    name: "code",
    label: "Branch Code",
    type: "text",
    placeholder: "Enter your Branch Code",
    validation: Yup.string().required("Branch Code is required"),
    Icon: Dessert,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter your Address",
    validation: Yup.string().required("Address is required"),
    Icon: Dessert,
  },
  {
    name: "isActive",
    label: "Active", // ✅ This will now display correctly
    type: "checkbox",
  },
];
