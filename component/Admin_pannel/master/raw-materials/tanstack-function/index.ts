/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import {
  RawMaterialsFormValues,
  RawMaterialsFectchResponse,
  RawMaterialsCreateResponse,
  type UserDetailsFectchResponse,
} from "../interface";

interface MutationOptions {
  onSuccess?: (data: RawMaterialsCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// Create RawMaterials
const createRawMaterial = async (data: RawMaterialsFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.rawMaterial, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update RawMaterials
const updateRawMaterial = async ({
  id,
  data,
}: {
  id: string;
  data: RawMaterialsFormValues;
}) => {
  try {
    const response = await apiClient.patch(
      `${API_RADDHA_URL.rawMaterial}/${id}`,
      data
    );
    return response.data;
  } catch (err: any) {
    console.log("Axios caught error:", err);

    // Normalize to your error shape
    throw {
      data: err.response?.data || { message: err.message || "Unknown error" },
    };
  }
};

// Delete RawMaterials
const deleteRawMaterial = async (id: string) => {
  const response = await apiClient.delete(
    `${API_RADDHA_URL.rawMaterial}/${id}`
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialss List
const getRawMaterials = async (): Promise<RawMaterialsFectchResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.rawMaterial);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// ============= HOOKS =============

// Hook for all RawMaterials mutations
export const useRawMaterialsMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    RawMaterialsCreateResponse,
    errorResponse,
    RawMaterialsFormValues
  >({
    mutationFn: createRawMaterial,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["RawMaterials-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    RawMaterialsCreateResponse,
    errorResponse,
    { id: string; data: RawMaterialsFormValues }
  >({
    mutationFn: updateRawMaterial,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["RawMaterials-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    RawMaterialsCreateResponse,
    errorResponse,
    string
  >({
    mutationFn: deleteRawMaterial,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["RawMaterials-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    createRawMaterials: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateRawMaterials: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteRawMaterials: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

// Hook for getting RawMaterialss
export const useGetRawMaterialss = () => {
  return useQuery<RawMaterialsFectchResponse, errorResponse>({
    queryKey: ["RawMaterials-list"],
    queryFn: getRawMaterials,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


const getUserDetails = async (cid:string): Promise<UserDetailsFectchResponse> => {
  const response = await apiClient.get(`${API_RADDHA_URL.suppliersOptions}/${cid}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

export const useGetUserDetailss = (cid: string) => {
  return useQuery<UserDetailsFectchResponse, errorResponse>({
    queryKey: ["UserDetails-list"],
    queryFn: () => getUserDetails(cid),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};