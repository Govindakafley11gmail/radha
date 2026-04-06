import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
import { Dessert, RollerCoaster } from "lucide-react";
import * as Yup from "yup";

export const RawMaterialsfields: PermssionForm[] = [
  {
    name: "name",
    label: "Material Name",
    type: "text",
    placeholder: "Enter your Material Name",
    validation: Yup.string().required("Material Name is required"),
    Icon: RollerCoaster,
  },
  {
    name: "unit",
    label: "Unit(KG)",
    type: "text",
    placeholder: "Enter your Unit",
    validation: Yup.string().required("Unit is required"),
    Icon: Dessert,
  },
   {
    name: "standard_cost",
    label: "Standard Cost",
    type: "number",
    placeholder: "Enter your Standard Cost",
    validation: Yup.number().required("Standard Cost is required"),
    Icon: Dessert,
  },
//    {
//       name: "categoryId",
//       label: "Category",
//       type: "select",
//       placeholder: "Select Category ",
//       validation: Yup.string().required("Category  is required"),
//       Icon: Dessert,
//       options: [], // will be injected
//     },

];
