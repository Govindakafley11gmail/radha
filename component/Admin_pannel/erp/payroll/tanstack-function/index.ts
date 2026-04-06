/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { PayrollCreateRespone, PayrollGetResponse, PayrollInputFormValues } from "../interface";

interface MutationOptions {
  onSuccess?: (data: PayrollCreateRespone) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createPayRoll = async (data: PayrollInputFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.PayRoll, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updatePayRoll = async ({
  id,
  data,
}: {
  id:  string;
  data: PayrollInputFormValues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.PayRoll}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete PayRoll
const deletePayRoll = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.PayRoll}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getPayRoll = async (): Promise<PayrollGetResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.PayRoll);
  console.log(response)
  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const usePayRollMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    PayrollCreateRespone,
    errorResponse,
    PayrollInputFormValues
  >({
    mutationFn: createPayRoll,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["PayRoll-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    PayrollCreateRespone,
    errorResponse,
    { id: string; data: PayrollInputFormValues }
  >({
    mutationFn: updatePayRoll,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["PayRoll-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    PayrollCreateRespone,
    errorResponse,
    number | string
  >({
    mutationFn: deletePayRoll,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["PayRoll-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createPayRoll: createMutation.mutate,
    isCreating: createMutation.isPending,
    updatePayRoll: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deletePayRoll: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetPayRoll = () => {
  return useQuery<PayrollGetResponse, errorResponse>({
    queryKey: ["PayRoll-list"],
    queryFn: getPayRoll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
