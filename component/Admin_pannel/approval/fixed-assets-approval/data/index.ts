import type { FieldConfig } from "@/common-component/DisplayFormForm";

export const FixedAssetsApprovalItemData: FieldConfig[] = [
  {
    name: "assetName",
    label: "Asset Name",
    type: "text",
    
  },
  {
    name: "assetCode",
    label: "Asset Code",
    type: "text",
  },
  { name: "purchaseCost", label: "Purchase Cost", type: "text" },
  { name: "purchaseDate", label: "Purchase Date", type: "text" },
  { name: "gst", label: "GST", type: "text" },

];