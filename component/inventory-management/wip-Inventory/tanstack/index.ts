/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { WIPInventoryCreateResponse, WIPInventoryGetResponse, WIPInventoryPostDataAttributes } from "../interface";
import type { errorResponse } from "@/component/Admin_pannel/permission/interface";


export interface MutationOptions<TData = unknown, TError = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}



// ============= API CALLS =============

// Create WIPInventory
const createWIPInventory = async (data: WIPInventoryPostDataAttributes) => {
  const response = await apiClient.post(API_RADDHA_URL.wipInventory, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update Permission
const updateWIPInventory
  = async ({
  id,
  data,
}: {
  id: number | string;
  data: WIPInventoryPostDataAttributes;
}) => {
  const response = await apiClient.patch(
    `${API_RADDHA_URL.wipInventory}/${id}`,
    data
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Permission
const deleteWIPInventory = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.wipInventory}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};


// Hook for all WIPInventory mutations
export const useWIPInventoryMutations = ( options?: MutationOptions<WIPInventoryCreateResponse, errorResponse>) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    WIPInventoryCreateResponse,
    errorResponse,
    WIPInventoryPostDataAttributes
  >({
    mutationFn: createWIPInventory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["WIPInventory-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    WIPInventoryCreateResponse,
    errorResponse,
    { id: number | string; data: WIPInventoryPostDataAttributes }
  >({
    mutationFn: updateWIPInventory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["WIPInventory-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    WIPInventoryCreateResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deleteWIPInventory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["WIPInventory-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createWIPInventory: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateWIPInventory: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteWIPInventory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};



// API call
const getWIPInventoryData = async (): Promise<WIPInventoryGetResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.wipInventory);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

export const useGetWIPInventory = () => {
  return useQuery<WIPInventoryGetResponse, any>({
    queryKey: ["WIPInventory-list"],  
    queryFn: getWIPInventoryData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}