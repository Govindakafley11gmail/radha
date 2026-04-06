/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { LeaveTypesCreateRespone, LeaveTypesGetRespone, LeaveTypesInputFormValues } from "../interface";

interface MutationOptions {
  onSuccess?: (data: LeaveTypesCreateRespone) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createLeaveTypes = async (data: LeaveTypesInputFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.leaveTypes, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updateLeaveTypes = async ({
  id,
  data,
}: {
  id:  string;
  data: LeaveTypesInputFormValues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.leaveTypes}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete LeaveTypes
const deleteLeaveTypes = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.leaveTypes}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getLeaveTypes = async (): Promise<LeaveTypesGetRespone> => {
  const response = await apiClient.get(API_RADDHA_URL.leaveTypes);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useLeaveTypesMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    LeaveTypesCreateRespone,
    errorResponse,
    LeaveTypesInputFormValues
  >({
    mutationFn: createLeaveTypes,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["LeaveTypes-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    LeaveTypesCreateRespone,
    errorResponse,
    { id: string; data: LeaveTypesInputFormValues }
  >({
    mutationFn: updateLeaveTypes,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["LeaveTypes-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    LeaveTypesCreateRespone,
    errorResponse,
    number | string
  >({
    mutationFn: deleteLeaveTypes,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["LeaveTypes-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createLeaveTypes: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateLeaveTypes: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteLeaveTypes: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetLeaveTypes = () => {
  return useQuery<LeaveTypesGetRespone, errorResponse>({
    queryKey: ["LeaveTypes-list"],
    queryFn: getLeaveTypes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
