/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    AccountTypeCreateResponse,
  AccountTypeFetchResponse,
  AccountTypeFormValues,

  
} from "../interface";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";

interface MutationOptions {
  onSuccess?: (data: AccountTypeCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// Create Department
const createAccountType = async (data: AccountTypeFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.accountTypes, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update AccountType
const updateAccountType = async ({
  id,
  data,
}: {
  id: string;
  data: AccountTypeFormValues;
}) => {
  const response = await apiClient.patch(
    `${API_RADDHA_URL.accountTypes}/${id}`,
    data
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete AccountType
const deleteAccountType = async (id: string) => {
  const response = await apiClient.delete(
    `${API_RADDHA_URL.accountTypes}/${id}`
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get AccountTypes List
const getAccountTypes = async (): Promise<AccountTypeFetchResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.accountTypes);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// ============= HOOKS =============

// Hook for all AccountType mutations
export const useAccountTypeMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    AccountTypeCreateResponse,
    errorResponse,
    AccountTypeFormValues
  >({
    mutationFn: createAccountType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["AccountType-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    AccountTypeCreateResponse,
    errorResponse,
    { id: string; data: AccountTypeFormValues }
  >({
    mutationFn: updateAccountType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["AccountType-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    AccountTypeCreateResponse,
    errorResponse,
    string
  >({
    mutationFn: deleteAccountType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["AccountType-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Error deleting AccountType");
      options?.onError?.(error);
    },
  });

  return {
    createAccountType: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateAccountType: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteAccountType: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

// Hook for getting accountTypes
export const useGetAccountTypes = () => {
  return useQuery<AccountTypeFetchResponse, errorResponse>({
    queryKey: ["AccountType-list"],
    queryFn: getAccountTypes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
