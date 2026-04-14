import { FieldConfig } from "@/common-component/Dynamic_Array_Form";
import * as Yup from "yup";
export const getDynamicBottomInvoiceForm = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ProductTypeOptions: any[] = []
): FieldConfig[] => {
  return [
    {
      name: "productCode",
      label: "Product Code",
      type: "text",
      validation: Yup.string().required(),
    },
    {
      name: "productType",
      label: "Product Type",
      type: "select",
      storeLabel: false,
      options: ProductTypeOptions,
            validation: Yup.string().required(),

    },
    {
      name: "size",
      label: "Size",
      type: "text",
      validation: Yup.string().required(),
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      validation: Yup.number().min(0).required(),
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      validation: Yup.number().min(0).required(),
    },
    {
      name: "total",
      label: "Total",
      type: "number",
      calc: { multiply: ["price", "quantity"] },
      validation: Yup.number().min(0).required(),
    },
    {
      name: "taxAmount",
      label: "Tax Amount",
      type: "number",
      calc: { percentageOf: "total" },
      validation: Yup.number().min(0).required(),
    },
    {
      name: "freightCost",
      label: "Freight Cost",
      type: "number",
      validation: Yup.number().min(0).required(),
    },
  ];
};