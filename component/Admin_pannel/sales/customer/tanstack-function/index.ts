/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomerGetResponse, CustomerInputFormValues } from "../ínterface";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";

export interface MutationOptions<TData = unknown, TError = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}



// ============= API CALLS =============

// Create Customer
const createCustomer = async (data: CustomerInputFormValues) => {
    console.log(API_RADDHA_URL.customer)
  const response = await apiClient.post(API_RADDHA_URL.customer, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update Permission
const updateCustomer
  = async ({
  id,
  data,
}: {
  id: number | string;
  data: CustomerInputFormValues;
}) => {
  const response = await apiClient.patch(
    `${API_RADDHA_URL.customer}/${id}`,
    data
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Permission
const deleteCustomer = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.customer}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};


// Hook for all Customer mutations
export const useCustomerMutations = ( options?: MutationOptions<any, errorResponse>) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    any,
    errorResponse,
    CustomerInputFormValues
  >({
    mutationFn: createCustomer,
    onSuccess: (data) => {
        console.log("data",data)
      queryClient.invalidateQueries({ queryKey: ["Customer-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
        console.log("error",error)
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    any,
    errorResponse,
    { id: number | string; data: CustomerInputFormValues }
  >({
    mutationFn: updateCustomer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Customer-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    any,
    errorResponse,
    number | string
  >({
    mutationFn: deleteCustomer,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Customer-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createCustomer: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateCustomer: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteCustomer: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

//Getting Permission List

// API call
const getCustomerData = async (): Promise<CustomerGetResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.customer);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

export const useGetCustomer = () => {
  return useQuery<CustomerGetResponse, any>({
    queryKey: ["Customer-list"],  
    queryFn: getCustomerData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}