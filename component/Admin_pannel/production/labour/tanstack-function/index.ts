/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { LaborInputFormValues, LabourCreateRespone, LabourGetRespone } from "../interface";

interface MutationOptions {
  onSuccess?: (data: LabourCreateRespone) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createLabour = async (data: LaborInputFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.Labour, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updateLabour = async ({
  id,
  data,
}: {
  id:  string;
  data: LaborInputFormValues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.Labour}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Labour
const deleteLabour = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.Labour}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getLabour = async (): Promise<LabourGetRespone> => {
  const response = await apiClient.get(API_RADDHA_URL.Labour);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useLabourMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    LabourCreateRespone,
    errorResponse,
    LaborInputFormValues
  >({
    mutationFn: createLabour,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Labour-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    LabourCreateRespone,
    errorResponse,
    { id: string; data: LaborInputFormValues }
  >({
    mutationFn: updateLabour,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Labour-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    LabourCreateRespone,
    errorResponse,
    number | string
  >({
    mutationFn: deleteLabour,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Labour-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createLabour: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateLabour: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteLabour: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetLabour = () => {
  return useQuery<LabourGetRespone, errorResponse>({
    queryKey: ["Labour-list"],
    queryFn: getLabour,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
