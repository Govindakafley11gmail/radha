/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import {
  PriceListCreateResponse,
  PricelistGetResponse,
  PriceListInputFormvalues,
} from "../interface";

interface MutationOptions {
  onSuccess?: (data: PriceListCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createPriceList = async (data: PriceListInputFormvalues) => {
  const response = await apiClient.post(API_RADDHA_URL.pricelist, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updatePriceList = async ({
  id,
  data,
}: {
  id:  string;
  data: PriceListInputFormvalues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.pricelist}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete PriceList
const deletePriceList = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.pricelist}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getPriceList = async (): Promise<PricelistGetResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.pricelist);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const usePriceListMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    PriceListCreateResponse,
    errorResponse,
    PriceListInputFormvalues
  >({
    mutationFn: createPriceList,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["PriceList-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    PriceListCreateResponse,
    errorResponse,
    { id: string; data: PriceListInputFormvalues }
  >({
    mutationFn: updatePriceList,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["PriceList-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    PriceListCreateResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deletePriceList,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["PriceList-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createPriceList: createMutation.mutate,
    isCreating: createMutation.isPending,
    updatePriceList: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deletePriceList: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetPriceList = () => {
  return useQuery<PricelistGetResponse, errorResponse>({
    queryKey: ["PriceList-list"],
    queryFn: getPriceList,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
