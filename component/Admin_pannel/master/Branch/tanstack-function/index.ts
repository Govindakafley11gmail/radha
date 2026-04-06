/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BranchCreateResponse, BranchesFetchResponse, BranchesFormValues,  } from "../interface";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";


interface MutationOptions {
  onSuccess?: (data: BranchCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// Create Branch
const createBranch = async (data: BranchesFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.branches, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update Branch
const updateBranch = async ({
  id,
  data,
}: {
  id: number | string;
  data: BranchesFormValues;
}) => {
  const response = await apiClient.patch(
    `${API_RADDHA_URL.branches}/${id}`,
    data
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Branch
const deleteBranch = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.branches}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get Branchs List
const getBranchs = async (): Promise<BranchesFetchResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.branches);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// ============= HOOKS =============

// Hook for all Branch mutations
export const useBranchMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    BranchCreateResponse,
    errorResponse,
    BranchesFormValues
  >({
    mutationFn: createBranch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Branch-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    BranchCreateResponse,
    errorResponse,
    { id: number | string; data: BranchesFormValues }
  >({
    mutationFn: updateBranch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Branch-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    BranchCreateResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deleteBranch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Branch-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createBranch: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateBranch: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteBranch: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

// Hook for getting Branchs
export const useGetBranchs = () => {
  return useQuery<BranchesFetchResponse, errorResponse>({
    queryKey: ["Branch-list"],
    queryFn: getBranchs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
