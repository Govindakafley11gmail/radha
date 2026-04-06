import { PermssionForm } from "../interface";
import * as Yup from "yup";
import { CheckSquare, Dessert, RollerCoaster } from "lucide-react";
//form Data
export const PermissionFields: PermssionForm[] = [
  {
    name: "name",
    label: "Role Name",
    type: "text",
    placeholder: "Enter your Role Name",
    validation: Yup.string().required("Role is required"),
    Icon: RollerCoaster,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter your Description",
    validation: Yup.string().required("Name is required"),
    Icon: Dessert,
  },
  {
    name: "permissionIds",
    label: "Permissions",
    type: "checkbox-group",
    optionGroups: [],
  },
];
