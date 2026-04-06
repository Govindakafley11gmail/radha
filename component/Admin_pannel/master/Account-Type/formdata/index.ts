import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
import { Dessert, RollerCoaster } from "lucide-react";
import * as Yup from "yup";

export const AccountTypeFields: PermssionForm[] = [
  {
    name: "name",
    label: "Account Type Name",
    type: "text",
    placeholder: "Enter your Department Name",
    validation: Yup.string().required("Department Name is required"),
    Icon: RollerCoaster,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter your Description Code",
    validation: Yup.string().required("Description Code is required"),
    Icon: Dessert,
  },
  {
      name: "code",
      label: "Account Type Code",
      type: "text",
      placeholder: "Enter your Account Type Code",
      validation: Yup.string().required("Account Type Code is required"),
      Icon: Dessert,
    },
  {
    name: "groupId",
    label: "Account Group",
    type: "select",
    placeholder: "Select Account Group",
    validation: Yup.string().required("Account Group is required"),
    Icon: Dessert,
    options: [], // will be injected
  },
];
