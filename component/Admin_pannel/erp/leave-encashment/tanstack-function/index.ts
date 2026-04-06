/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import {
  LeaveEncashmentCreateRespone,
  LeaveEncashmentGetRespone,
  LeaveEncashmentInputFormValues,
} from "../interface";

interface MutationOptions {
  onSuccess?: (data: LeaveEncashmentCreateRespone) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createLeaveEncashment = async (data: LeaveEncashmentInputFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.leaveEncashment, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};


// Delete LeaveEncashment
const deleteLeaveEncashment = async (id: number | string) => {
  const response = await apiClient.delete(
    `${API_RADDHA_URL.leaveEncashment}/${id}`,
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getLeaveEncashment = async (): Promise<LeaveEncashmentGetRespone> => {
  const response = await apiClient.get(API_RADDHA_URL.leaveEncashment);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useLeaveEncashmentMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    LeaveEncashmentCreateRespone,
    errorResponse,
    LeaveEncashmentInputFormValues
  >({
    mutationFn: createLeaveEncashment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["LeaveEncashment-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });


  const deleteMutation = useMutation<
    LeaveEncashmentCreateRespone,
    errorResponse,
    number | string
  >({
    mutationFn: deleteLeaveEncashment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["LeaveEncashment-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createLeaveEncashment: createMutation.mutate,
    isCreating: createMutation.isPending,

    deleteLeaveEncashment: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading: createMutation.isPending || deleteMutation.isPending,
  };
};

export const useGetLeaveEncashment = () => {
  return useQuery<LeaveEncashmentGetRespone, errorResponse>({
    queryKey: ["LeaveEncashment-list"],
    queryFn: getLeaveEncashment,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
