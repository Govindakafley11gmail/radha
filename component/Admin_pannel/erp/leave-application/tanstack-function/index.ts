/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { LeaveApplicationCreateRespone, LeaveApplicationGetRespone, LeaveApplicationInputFormValues } from "../interface";

interface MutationOptions {
  onSuccess?: (data: LeaveApplicationCreateRespone) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createLeaveApplication = async (data: LeaveApplicationInputFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.leaveApplication, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updateLeaveApplication = async ({
  id,
  data,
}: {
  id:  string;
  data: LeaveApplicationInputFormValues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.leaveApplication}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete LeaveApplication
const deleteLeaveApplication = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.leaveApplication}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getLeaveApplication = async (): Promise<LeaveApplicationGetRespone> => {
  const response = await apiClient.get(API_RADDHA_URL.leaveApplication);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useLeaveApplicationMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    LeaveApplicationCreateRespone,
    errorResponse,
    LeaveApplicationInputFormValues
  >({
    mutationFn: createLeaveApplication,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["LeaveApplication-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    LeaveApplicationCreateRespone,
    errorResponse,
    { id: string; data: LeaveApplicationInputFormValues }
  >({
    mutationFn: updateLeaveApplication,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["LeaveApplication-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    LeaveApplicationCreateRespone,
    errorResponse,
    number | string
  >({
    mutationFn: deleteLeaveApplication,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["LeaveApplication-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createLeaveApplication: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateLeaveApplication: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteLeaveApplication: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetLeaveApplication = () => {
  return useQuery<LeaveApplicationGetRespone, errorResponse>({
    queryKey: ["LeaveApplication-list"],
    queryFn: getLeaveApplication,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
