/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { RawMaterialInventoryCreateResponse, RawMaterialInventoryInputFormValues, RawMaterialInventoryGetResponse } from "../interface";

interface MutationOptions {
  onSuccess?: (data: RawMaterialInventoryCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createRawMaterialInventory = async (data: RawMaterialInventoryInputFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.rawMaterialInventory, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updateRawMaterialInventory = async ({
  id,
  data,
}: {
  id:  string;
  data: RawMaterialInventoryInputFormValues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.rawMaterialInventory}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete RawMaterialInventory
const deleteRawMaterialInventory = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.rawMaterialInventory}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getRawMaterialInventory = async (): Promise<RawMaterialInventoryGetResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.rawMaterialInventory);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useRawMaterialInventoryMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    RawMaterialInventoryCreateResponse,
    errorResponse,
    RawMaterialInventoryInputFormValues
  >({
    mutationFn: createRawMaterialInventory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["RawMaterialInventory-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    RawMaterialInventoryCreateResponse,
    errorResponse,
    { id: string; data: RawMaterialInventoryInputFormValues }
  >({
    mutationFn: updateRawMaterialInventory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["RawMaterialInventory-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    RawMaterialInventoryCreateResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deleteRawMaterialInventory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["RawMaterialInventory-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createRawMaterialInventory: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateRawMaterialInventory: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteRawMaterialInventory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetRawMaterialInventory = () => {
  return useQuery<RawMaterialInventoryGetResponse, errorResponse>({
    queryKey: ["RawMaterialInventory-list"],
    queryFn: getRawMaterialInventory,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
