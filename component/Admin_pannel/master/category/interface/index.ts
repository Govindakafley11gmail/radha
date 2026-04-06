export interface CategoryFormValues{
      name: string;
  description: string;

}
export interface CategoryData {
  id: string;
  name: string;
  description: string;
}
export interface CategoriesCreateResponse{
      success: boolean;
  message: string;
  data: CategoryData;
  statusCode: number;
}

export interface CategoriesFetchResponse {
  success: boolean;
  message: string;
  data: CategoryData[];
  statusCode: number;
}