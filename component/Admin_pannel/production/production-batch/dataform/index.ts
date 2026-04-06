import { FieldConfig } from "@/common-component/Dynamic_Array_Form";

export const TopProductionBatchFieldsForms: FieldConfig[] = [
  {
    name: "productionDate",
    label: "Production Date",
    type: "date",
  },
 
  {
    name: "quantityProduced",
    label: "Quantity Produced",
    type: "number", // ← new field
   
  },
  {
    name: "productType",
    label: "Product Type",
    type: "select", // ← new field
   options:[
    {label:"Chocolate",value:"Chocolate"},
    {label:"other",value:"other"}
   ]
  },
];
