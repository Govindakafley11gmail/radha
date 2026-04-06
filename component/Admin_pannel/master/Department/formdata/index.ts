import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
import { Dessert, RollerCoaster } from "lucide-react";
import * as Yup from "yup";

export const Departmentfields: PermssionForm[] = [
  {
    name: "name",
    label: "Department Name",
    type: "text",
    placeholder: "Enter your Department Name",
    validation: Yup.string().required("Department Name is required"),
    Icon: RollerCoaster,
  },
  {
    name: "code",
    label: "Department Code",
    type: "text",
    placeholder: "Enter your Department Code",
    validation: Yup.string().required("Department Code is required"),
    Icon: Dessert,
  },
   {
      name: "branchId",
      label: "Branch Group",
      type: "select",
      placeholder: "Select Branch Group",
      validation: Yup.string().required("Branch Group is required"),
      Icon: Dessert,
      options: [], // will be injected
    },

];
