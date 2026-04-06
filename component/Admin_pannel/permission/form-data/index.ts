import { Dessert, RollerCoaster } from "lucide-react";
import { PermssionForm } from "../interface";
import * as Yup from "yup";

export const fields: PermssionForm[] = [
    {
      name: "name",
      label: "Permission Name",
      type: "text",
      placeholder: "Enter your name",
      validation: Yup.string().required("Name is required"),
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
  
  ];


  