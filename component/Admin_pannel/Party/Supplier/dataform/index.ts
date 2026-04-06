/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldConfig, FieldType } from "@/common-component/duplicateCustomdialog";
import { Calendar, CheckCircle, Clock, Dessert, Hash, Mail, Phone, RollerCoaster, Space } from "lucide-react";
import * as Yup from "yup";
export interface PermssionForm extends FieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  Icon?: React.ComponentType<any>;
  validation?: any;
  defaultValue?: any;
}
export const Suplierfields: PermssionForm[] = [
  {
    name: "name",
    label: "Supplier Name",
    type: "text",
    placeholder: "Enter your  Supplier name",
    validation: Yup.string().required(" Supplier Name is required"),
    Icon: RollerCoaster,
  },
  {
    name: "phone_no",
    label: "Phone No",
    type: "number",
    placeholder: "Enter your Phone No",
    validation: Yup.string().required("Phone No is required"),
    Icon: Phone,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter your Email",
    validation: Yup.string().email().required("Email is required"),
    Icon: Mail,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { label: "Male", value: "M" },
      { label: "Female", value: "F" },
      { label: "Other", value: "other" },
    ],
    validation: Yup.string().required("Gender is required"),
  },
  {
     name: "nationality",
    label: "Nationality",
    type: "select",
    options: [
      { label: "Bhutanese", value: "Bhutanese" },
      { label: "Other", value: "other" },
    ],
    validation: Yup.string().required("Gender is required"),
  },
  {
    name: "cidNo",
    label: "CID No",
    type: "text",
    placeholder: "Enter CID Number",
    Icon: Hash,
    validation: Yup.string()
      .required("CID No is required")
      .matches(/^\d{11}$/, "CID must be 11 digits"),
  },

  /* =======================
     STATUS
  ======================= */
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select Status",
    Icon: CheckCircle,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Expired", value: "expired" },
    ],
    validation: Yup.string().required("Status is required"),
  },

  /* =======================
     PAYMENT TERMS
  ======================= */
  {
    name: "paymentTerms",
    label: "Payment Terms",
    type: "select",
    placeholder: "Select Payment Terms",
    Icon: Clock,
    options: [
      { label: "Daily", value: "daily" },
      { label: "Weekly", value: "weekly" },
      { label: "Monthly", value: "monthly" },
      { label: "Quaterly", value: "quarterly" },
      { label: "Halfly", value: "halfly" },
            { label: "Yearly", value: "yearly" },

    ],
    validation: Yup.string().required("Payment Terms is required"),
  },
  {
    name: "mouDate",
    label: "MOU Date",
    type: "date",
    Icon: Calendar,
    validation: Yup.date()
      .required("MOU Date is required")
      .typeError("Invalid date"),
  },

  /* =======================
     EXPIRED DATE
  ======================= */
  {
    name: "expireDate",
    label: "Expiry Date",
    type: "date",
    Icon: Calendar,
    validation: Yup.date()
      .required("Expiry Date is required")
      .min(
        Yup.ref("mouDate"),
        "Expiry Date must be after MOU Date"
      )
      .typeError("Invalid date"),
  },

  /* =======================
     MOU FILE
  ======================= */
  {
    name: "mouFile",
    label: "MOU Document",
    type: "file", // works for files too (PDF/Image)
    validation: Yup.mixed()
      .required("MOU file is required")
      
  },

  /* =======================
     MOU DATE
  ======================= */
  
];
