import type {
  FixedAssetFormAttributes,
  FixedAssetsDataAttributes,
} from "../interface";

// ✅ 🔥 Transform function (IMPORTANT FIX)
export const buildPayloadFixedAssets = (
  row: FixedAssetsDataAttributes,
): FixedAssetFormAttributes => {
  return {
    assetName: row?.assetName ?? "", // adjust based on API
    assetCode: row.assetCode,
    purchaseCost: Number(row.purchaseCost),
    purchaseDate: row.purchaseDate,
    gst: row.gst,
    // 👉 add other required fields if your API needs them
  };
};
