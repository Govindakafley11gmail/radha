/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { OtherProductionCostCreateRespone, OtherProductionCostGetRespone, OtherProductionCostInputFormValues } from "../interface";

interface MutationOptions {
  onSuccess?: (data: OtherProductionCostCreateRespone) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createOtherProductionCost = async (data: OtherProductionCostInputFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.OtherProductionCost, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updateOtherProductionCost = async ({
  id,
  data,
}: {
  id:  string;
  data: OtherProductionCostInputFormValues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.OtherProductionCost}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Machine
const deleteOtherProductionCost = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.OtherProductionCost}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getOtherProductionCost = async (): Promise<OtherProductionCostGetRespone> => {
  const response = await apiClient.get(API_RADDHA_URL.OtherProductionCost);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useOtherProductionCostMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    OtherProductionCostCreateRespone,
    errorResponse,
    OtherProductionCostInputFormValues
  >({
    mutationFn: createOtherProductionCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["OtherProductionCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    OtherProductionCostCreateRespone,
    errorResponse,
    { id: string; data: OtherProductionCostInputFormValues }
  >({
    mutationFn: updateOtherProductionCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["OtherProductionCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    OtherProductionCostCreateRespone,
    errorResponse,
    number | string
  >({
    mutationFn: deleteOtherProductionCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["OtherProductionCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createOtherProductionCost: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateOtherProductionCost: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteOtherProductionCost: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetOtherProductionCost = () => {
  return useQuery<OtherProductionCostGetRespone, errorResponse>({
    queryKey: ["OtherProductionCost-list"],
    queryFn: getOtherProductionCost,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
