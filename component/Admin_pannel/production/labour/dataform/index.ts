import * as Yup from "yup";
import { RollerCoaster } from "lucide-react";
import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
const GenderOption = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
];
const TypeOption = [
  { label: "Direct", value: "DIRECT" },
  { label: "Indirect", value: "INDIRECT" },
  { label: "Other", value: "OTHER" },
];
export const LabourFields: PermssionForm[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your Name",
    validation: Yup.string().required("Name is required"),
  },
  {
    name: "identificationNo",
    label: "Identification No or CID",
    type: "text",
    placeholder: "Enter your Identification No",
    validation: Yup.string().required("Identification No is required"),
  },
  {
    name: "mobileNo",
    label: "Mobile No",
    type: "text",
    placeholder: "Enter your Mobile No",
    validation: Yup.string().required("Mobile No is required"),
  },

  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: GenderOption,
    validation: Yup.string().required("Dzongkhag is required"),
  },

  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter your Age",
    validation: Yup.number().required("Age is required"),
  },
  {
    name: "dzongkhag",
    label: "Dzongkhag",
    type: "text",
    placeholder: "Enter your Dzongkhag",
    validation: Yup.string().required("Dzongkhag is required"),
  },
  {
    name: "type",
    label: "People type",
    type: "select",
    options: TypeOption,
    validation: Yup.string().required("Dzongkhag is required"),
  },
  {
    name: "hourlyRate",
    label: "Hourly Rate",
    type: "number",
    placeholder: "Enter your Hourly Rate",
    validation: Yup.number().required("Hourly Rate is required"),
  },
];
