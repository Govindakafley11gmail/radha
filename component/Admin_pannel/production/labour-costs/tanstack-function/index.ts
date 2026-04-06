/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { LabourCostCreateRespone, LabourCostGetRespone, LabourCostInputFormValues } from "../interface";

interface MutationOptions {
  onSuccess?: (data: LabourCostCreateRespone) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createLabourCost = async (data: LabourCostInputFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.LabourCost, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updateLabourCost = async ({
  id,
  data,
}: {
  id:  number;
  data: LabourCostInputFormValues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.LabourCost}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Machine
const deleteLabourCost = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.LabourCost}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getLabourCost = async (): Promise<LabourCostGetRespone> => {
  const response = await apiClient.get(API_RADDHA_URL.LabourCost);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useLabourCostMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    LabourCostCreateRespone,
    errorResponse,
    LabourCostInputFormValues
  >({
    mutationFn: createLabourCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["LabourCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    LabourCostCreateRespone,
    errorResponse,
    { id: number; data: LabourCostInputFormValues }
  >({
    mutationFn: updateLabourCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["LabourCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    LabourCostCreateRespone,
    errorResponse,
    number | string
  >({
    mutationFn: deleteLabourCost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["LabourCost-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createLabourCost: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateLabourCost: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteLabourCost: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetLabourCost = () => {
  return useQuery<LabourCostGetRespone, errorResponse>({
    queryKey: ["LabourCost-list"],
    queryFn: getLabourCost,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
