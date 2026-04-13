/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FixedAssetFormAttributes {
  assetName: string;
  assetCode: string;
  purchaseDate: string;
  purchaseCost: number;
  gst: number;
}
export interface FixedAssetsCreateResponse {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface FixedAssetsDataAttributes {
  id: string;
  assetName: string;
  assetCode: string;
  purchaseCost: string; // coming as "200000.00" (string from backend)
  gst: number;
  purchaseDate: string; // ISO date string (e.g. "2026-01-28")
  status: string;
  
}

export interface FixedAssetsGetresponse {
  success: boolean;
  message: string;
  data: FixedAssetsDataAttributes[];
  statusCode: number;
}
