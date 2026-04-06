export interface RawMaterialsFormValues {
  name: string;
  unit: string;
  standard_cost: number | undefined;
  category_name?: string;
}

export interface RawMaterialsData {
  id: string;
  name: string;
  unit: string;
  standard_cost: number | undefined;
  description: string | null;
  is_active: boolean;
  is_deleted: boolean;
}

export interface RawMaterialsCreateResponse {
  success: boolean;
  message: string;
  data: RawMaterialsData;
  statusCode: number;
}

export interface RawMaterialsFectchResponse {
  success: boolean;
  message: string;
  data: RawMaterialsData[];
  statusCode: number;
}


//Supplier Options Interfac
interface SupplierData{
  supplier_id: string;
  name: string;
}
export interface UserDetailsFectchResponse {
  success: boolean;
  message: string;
  data: SupplierData[];
  statusCode: number;
}
