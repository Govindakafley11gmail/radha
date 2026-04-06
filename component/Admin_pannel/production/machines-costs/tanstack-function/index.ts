/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { MachineCostCreateRespone, MachineCostGetRespone, MachineCostInputFormValues } from "../interface";

interface MutationOptions {
  onSuccess?: (data: MachineCostCreateRespone) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createMachineCost = async (data: MachineCostInputFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.machineCost, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updateMachineCost = async ({
  id,
  data,
}: {
  id:  string;
  data: MachineCostInputFormValues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.machineCost}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Machine
const deleteMachineCost = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.machineCost}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getMachineCost = async (): Promise<MachineCostGetRespone> => {
  const response = await apiClient.get(API_RADDHA_URL.machineCost);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useMachineCostMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    MachineCostCreateRespone,
    errorResponse,
    MachineCostInputFormValues
  >({
    mutationFn: createMachineCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["MachineCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    MachineCostCreateRespone,
    errorResponse,
    { id: string; data: MachineCostInputFormValues }
  >({
    mutationFn: updateMachineCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["MachineCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    MachineCostCreateRespone,
    errorResponse,
    number | string
  >({
    mutationFn: deleteMachineCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["MachineCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createMachineCost: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateMachineCost: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteMachineCost: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetMachineCost = () => {
  return useQuery<MachineCostGetRespone, errorResponse>({
    queryKey: ["MachineCost-list"],
    queryFn: getMachineCost,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
