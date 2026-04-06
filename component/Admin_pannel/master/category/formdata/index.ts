import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
import { Dessert, RollerCoaster } from "lucide-react";
import * as Yup from "yup";

export const Categoryfields: PermssionForm[] = [
  {
    name: "name",
    label: "Category Name",
    type: "text",
    placeholder: "Enter your Category Name",
    validation: Yup.string().required("Category Name is required"),
    Icon: RollerCoaster,
  },
  {
    name: "description",
    label: "Category Description",
    type: "text",
    placeholder: "Enter your Category Description",
    validation: Yup.string().required("Category Description is required"),
    Icon: Dessert,
  },
 
];
