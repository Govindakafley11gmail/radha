/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { ProductUnitCostCreateResponse, ProductUnitCostFormValues, ProductUnitCostGetResponse } from "../interface";

interface MutationOptions {
  onSuccess?: (data: ProductUnitCostCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createProductUnitCost = async (data: ProductUnitCostFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.ProductUnitCost, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updateProductUnitCost = async ({
  id,
  data,
}: {
  id:  string;
  data: ProductUnitCostFormValues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.ProductUnitCost}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Machine
const deleteProductUnitCost = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.ProductUnitCost}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getProductUnitCost = async (): Promise<ProductUnitCostGetResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.ProductUnitCost);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useProductUnitCostMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    ProductUnitCostCreateResponse,
    errorResponse,
    ProductUnitCostFormValues
  >({
    mutationFn: createProductUnitCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ProductUnitCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    ProductUnitCostCreateResponse,
    errorResponse,
    { id: string; data: ProductUnitCostFormValues }
  >({
    mutationFn: updateProductUnitCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ProductUnitCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    ProductUnitCostCreateResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deleteProductUnitCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ProductUnitCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createProductUnitCost: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateProductUnitCost: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteProductUnitCost: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetProductUnitCost = () => {
  return useQuery<ProductUnitCostGetResponse, errorResponse>({
    queryKey: ["ProductUnitCost-list"],
    queryFn: getProductUnitCost,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
