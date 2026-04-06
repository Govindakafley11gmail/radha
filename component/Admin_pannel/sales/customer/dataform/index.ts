import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
import {
  CarTaxiFront,
  IndentDecrease,
  Locate,
  Mail,
  Phone,
  RollerCoaster,
} from "lucide-react";
import * as Yup from "yup";
import { CustomerInputFormValues } from "../ínterface";

export const Customerfields: PermssionForm[] = [
  {
    name: "name",
    label: "Customer  Name",
    type: "text",
    placeholder: "Enter your Customer name",
    validation: Yup.string().required("Customer Name is required"),
    Icon: RollerCoaster,
  },
  {
    name: "identification_no",
    label: "CID No",
    type: "text",
    placeholder: "Enter your CID No",
    validation: Yup.string().required("CID No is required"),
    Icon: IndentDecrease,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter your Address",
    validation: Yup.string().required("Address is required"),
    Icon: Locate,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter your Email",
    validation: Yup.string().required("Email is required"),
    Icon: Mail,
  },
  {
    name: "phone_no",
    label: "Phone No",
    type: "text",
    placeholder: "Enter your Phone No",
    validation: Yup.string().required("Phone No is required"),
    Icon: Phone,
  },
  {
    name: "tax_id",
    label: "Tax Id",
    type: "text",
    placeholder: "Enter your Tax Id",
    validation: Yup.string().required("Tax Id is required"),
    Icon: CarTaxiFront,
  },
  {
    name: "credit_limit",
    label: "Credit Limit",
    type: "number",
    placeholder: "Enter your Credit Limit",
    validation: Yup.number().required("Credit Limit is required"),
    Icon: CarTaxiFront,
  },
  {
    name: "credit_terms",
    label: "Credit Terms",
    type: "select",
    options: [
      { value: "30 days", label: "30 days" },
      { value: "OTHERS", label: "OTHERS" },
    ],
  },
];
export const emptyCustomerDefaults: CustomerInputFormValues = {
  name: "",
  identification_no: "",
  address: "",
  email: "",
  phone_no: "",
  tax_id: "",
  credit_limit: 0,
  credit_terms: "",
};