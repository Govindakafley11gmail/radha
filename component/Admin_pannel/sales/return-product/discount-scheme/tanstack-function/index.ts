/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { DiscountSchemeCreateResponse, DiscountSchemeGetResponse, DiscountSchemeInputValues } from "../interface";

interface MutationOptions {
  onSuccess?: (data: DiscountSchemeCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createDiscountScheme = async (data: DiscountSchemeInputValues) => {
  const response = await apiClient.post(API_RADDHA_URL.discountScheme, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updateDiscountScheme = async ({
  id,
  data,
}: {
  id:  string;
  data: DiscountSchemeInputValues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.discountScheme}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete DiscountScheme
const deleteDiscountScheme = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.discountScheme}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getDiscountScheme = async (): Promise<DiscountSchemeGetResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.discountScheme);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useDiscountSchemeMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    DiscountSchemeCreateResponse,
    errorResponse,
    DiscountSchemeInputValues
  >({
    mutationFn: createDiscountScheme,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["DiscountScheme-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    DiscountSchemeCreateResponse,
    errorResponse,
    { id: string; data: DiscountSchemeInputValues }
  >({
    mutationFn: updateDiscountScheme,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["DiscountScheme-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    DiscountSchemeCreateResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deleteDiscountScheme,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["DiscountScheme-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createDiscountScheme: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateDiscountScheme: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteDiscountScheme: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetDiscountScheme = () => {
  return useQuery<DiscountSchemeGetResponse, errorResponse>({
    queryKey: ["DiscountScheme-list"],
    queryFn: getDiscountScheme,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
