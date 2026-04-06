import * as Yup from "yup";
import { RollerCoaster } from "lucide-react";
import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
const DepreciationMethodOption = [
  { label: "Straight line", value: "STRAIGHT_LINE" },
  { label: "Declining balance", value: "DECLINING_BALANCE" },
  { label: "Units of production", value: "UNITS_OF_PRODUCTION" },
];
export const MachineFields: PermssionForm[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your Name",
    validation: Yup.string().required("Name is required"),
  },
  {
    name: "purchaseCost",
    label: "purchase Cost",
    type: "number",
    placeholder: "Enter your purchase Cost",
    validation: Yup.number().required("purchase Cost is required"),
    Icon: RollerCoaster,
  },
  {
    name: "depreciationMethod",
    label: "Depreciation Method",
    type: "select",
    options: DepreciationMethodOption,
  },

  {
    name: "usefulLife",
    label: "useful Life",
    type: "number",
    placeholder: "Enter your useful Life",
    validation: Yup.number().required("useful Life is required"),
    Icon: RollerCoaster,
  },
];
