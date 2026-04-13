/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FixedAssetFormAttributes, FixedAssetsCreateResponse, FixedAssetsGetresponse } from "../interface";
import type { errorResponse } from "@/component/Admin_pannel/permission/interface";

export interface MutationOptions<TData = unknown, TError = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}



// ============= API CALLS =============

// Create FixedAssets
const createFixedAssets = async (data: FixedAssetFormAttributes) => {
  const response = await apiClient.post(API_RADDHA_URL.FixedAssets, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update Permission
const updateFixedAssets
  = async ({
  id,
  data,
}: {
  id: number | string;
  data: FixedAssetFormAttributes;
}) => {
  const response = await apiClient.patch(
    `${API_RADDHA_URL.FixedAssets}/${id}`,
    data
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Permission
const deleteFixedAssets = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.FixedAssets}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};


// Hook for all FixedAssets mutations
export const useFixedAssetsMutations = ( options?: MutationOptions<FixedAssetsCreateResponse, errorResponse>) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    FixedAssetsCreateResponse,
    errorResponse,
    FixedAssetFormAttributes
  >({
    mutationFn: createFixedAssets,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["FixedAssets-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    FixedAssetsCreateResponse,
    errorResponse,
    { id: number | string; data: FixedAssetFormAttributes }
  >({
    mutationFn: updateFixedAssets,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["FixedAssets-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    FixedAssetsCreateResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deleteFixedAssets,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["FixedAssets-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createFixedAssets: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateFixedAssets: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteFixedAssets: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

//Getting Permission List

// API call
const getFixedAssetsData = async (): Promise<FixedAssetsGetresponse> => {
  const response = await apiClient.get(API_RADDHA_URL.FixedAssets);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

export const useFixedAssetsDataAttributes = () => {
  return useQuery<FixedAssetsGetresponse, any>({
    queryKey: ["FixedAssets-list"],  
    queryFn: getFixedAssetsData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}