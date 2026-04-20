import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
import { Dessert, RollerCoaster } from "lucide-react";
import * as Yup from "yup";

export const FixedAssetsFields: PermssionForm[] = [
  {
    name: "assetName",
    label: "Asset Name",
    type: "text",
    placeholder: "Enter Asset Name",
    validation: Yup.string().required("Asset Name is required"),
    Icon: RollerCoaster,
  },
  {
    name: "assetCode",
    label: "Asset Code",
    type: "text",
    placeholder: "Enter Asset Code",
    validation: Yup.string().required("Asset Code is required"),
    Icon: RollerCoaster,
  },
  {
    name: "purchaseCost",
    label: "Purchase Cost",
    type: "number",
    placeholder: "Enter Purchase Cost",
    validation: Yup.number()
      .required("Purchase Cost is required")
      .positive("Purchase Cost must be a positive number"),
    Icon: Dessert,
  },
  {
    name: "purchaseDate",
    label: "Purchase Date",
    type: "date",
    placeholder: "Enter Purchase Date",
    validation: Yup.date().required("Purchase Date is required"),
    Icon: Dessert,
  },
 {
  name: "gst",
  label: "GST (5%)",
  type: "number",
  disabled: true,
  calculation: {
    dependsOn: "purchaseCost",
    formula: (val) => val * 0.05,
  },
}
];
