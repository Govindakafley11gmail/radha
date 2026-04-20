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
    calc: { sum: ["usedQuantity"] },
  },
];
