import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
import { Dessert, RollerCoaster } from "lucide-react";
import * as Yup from "yup";

export const AccountGroupfields: PermssionForm[] = [
  {
    name: "name",
    label: "Account Group Name",
    type: "text",
    placeholder: "Enter your Account Group Name",
    validation: Yup.string().required("Account Group Name is required"),
    Icon: RollerCoaster,
  },
  {
    name: "description",
    label: "Description Code",
    type: "text",
    placeholder: "Enter your Description Code",
    validation: Yup.string().required("Description Code is required"),
    Icon: Dessert,
  },
 
];
