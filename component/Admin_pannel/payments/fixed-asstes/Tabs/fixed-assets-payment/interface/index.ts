
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FixedAssetsPaymentFormValues {
  paymentId: string;
  assertId: string;
  amount: number;
  paymentDate: string; // ISO date string (YYYY-MM-DD)
  paymentMode: string;
  description: string;
}
export interface FixedAssetPaymentCreateResponse {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

interface AssetAttributes {
  id: string;
  assetName: string;
  assetCode: string;
  purchaseCost: string; // comes as "200000.00"
  gst: number;
  purchaseDate: string; // YYYY-MM-DD
  status: string;
  isDeleted: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface FixedAssetsPaymentDataAttributes {
  id: string;
  asset: AssetAttributes;
  amount: string; // "200000.00"
  paymentMode: string | null; // can be null
  description: string;
  status: string;
  paymentDate: string; // YYYY-MM-DD
  isDeleted: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string;
}

export interface FixedAssetsPaymentGetResponse {
  success: boolean;
  message: string;
  data: FixedAssetsPaymentDataAttributes[];
  statusCode: number;
}
