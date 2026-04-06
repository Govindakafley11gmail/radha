/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { AccountGroupCreateResponse, AccountGroupFetchResponse, AccountGroupFormValues } from "../interface";


interface MutationOptions {
  onSuccess?: (data: AccountGroupCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// Create Branch
const createAccountGroup = async (data: AccountGroupFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.accountGroups, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update Branch
const updateAccountGroup= async ({
  id,
  data,
}: {
  id: number | string;
  data: AccountGroupFormValues;
}) => {
  const response = await apiClient.patch(
    `${API_RADDHA_URL.accountGroups}/${id}`,
    data
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Branch
const deleteAccountGroup= async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.accountGroups}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get Branchs List
const getAccountGroup = async (): Promise<AccountGroupFetchResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.accountGroups);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// ============= HOOKS =============

// Hook for all Branch mutations
export const useAccountGroupMutation = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    AccountGroupCreateResponse,
    errorResponse,
    AccountGroupFormValues
  >({
    mutationFn: createAccountGroup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["AccountGroup-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    AccountGroupCreateResponse,
    errorResponse,
    { id: number | string; data: AccountGroupFormValues }
  >({
    mutationFn: updateAccountGroup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["AccountGroup-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    AccountGroupCreateResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deleteAccountGroup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["AccountGroup-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createAccountGroup: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateAccountGroup: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteAccountGroup: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

// Hook for getting AccountGroups
export const useGetAccountGroup= () => {
  return useQuery<AccountGroupFetchResponse, errorResponse>({
    queryKey: ["AccountGroup-list"],
    queryFn: getAccountGroup,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
