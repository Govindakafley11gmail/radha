import { use } from "react";

export const Raddha_Backend_API = process.env.NEXT_PUBLIC_API_EndPoints;

const API_RADDHA_URL = {
  //auth management
  login: `${Raddha_Backend_API}/user/login`,

  //user management
  permission: `${Raddha_Backend_API}/permission`,
  role: `${Raddha_Backend_API}/role`,
  user: `${Raddha_Backend_API}/user`,

  //Master
  branches: `${Raddha_Backend_API}/branches`,
  departments: `${Raddha_Backend_API}/departments`,
  accountGroups: `${Raddha_Backend_API}/account-groups`,
  accountTypes: `${Raddha_Backend_API}/account-types`,
  category: `${Raddha_Backend_API}/category`,
  rawMaterial: `${Raddha_Backend_API}/raw-material`,
  supplier: `${Raddha_Backend_API}/supplier`,
  purchaseInvoice: `${Raddha_Backend_API}/purchase-invoice`,
  rawMaterialReceipt: `${Raddha_Backend_API}/raw-material-receipt`,
  payment: `${Raddha_Backend_API}/payment`,
  paymentSettlement: `${Raddha_Backend_API}/payment/settled`,
  //Fixed Assets Payment
  fixedAssetsPayment: `${Raddha_Backend_API}/asset-payment`,

  //Approval
  purachaseInovicePaymentApproval: `${Raddha_Backend_API}/raw-material-receipt/approval`,

  // Sales
  receipt: `${Raddha_Backend_API}/receipt`,
  customer: `${Raddha_Backend_API}/customer`,
  salesInvoice: `${Raddha_Backend_API}/sales-invoice`,
  pricelist: `${Raddha_Backend_API}/pricelist`,

  discountScheme: `${Raddha_Backend_API}/discount-scheme`,
  productionBatch: `${Raddha_Backend_API}/production-batch`,
  machine: `${Raddha_Backend_API}/machine`,
  machineCost: `${Raddha_Backend_API}/machine-cost`,

  //labour
  Labour: `${Raddha_Backend_API}/labor`,
  LabourCost: `${Raddha_Backend_API}/labor-cost`,
  OtherProductionCost: `${Raddha_Backend_API}/other-production-cost`,
  ProductUnitCost: `${Raddha_Backend_API}/product-unit-cost`,

  //ERP
  leaveTypes: `${Raddha_Backend_API}/leave-types`,
  leaveApplication: `${Raddha_Backend_API}/leave-application`,
  leaveEncashment: `${Raddha_Backend_API}/leave-encashment`,
  PayRoll: `${Raddha_Backend_API}/payrolls`,

  // Inventory management
  rawMaterialInventory: `${Raddha_Backend_API}/raw-material-inventory`,
  wipInventory: `${Raddha_Backend_API}/wipinventory`,
  //SUPPLIER OPTIONS
  suppliersOptions: `${Raddha_Backend_API}/supplier/with-cid`,

  //Fixed Assets
  FixedAssets: `${Raddha_Backend_API}/asset`,
  fixedAssetsApproval: `${Raddha_Backend_API}/asset/approve`,
};

export default API_RADDHA_URL;
