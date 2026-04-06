/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { CategoriesCreateResponse, CategoriesFetchResponse, CategoryFormValues } from "../interface";


interface MutationOptions {
  onSuccess?: (data: CategoriesCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// Create Category
const createCategory = async (data: CategoryFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.category, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update Category
const updateCategory = async ({
  id,
  data,
}: {
  id: number | string;
  data: CategoryFormValues;
}) => {
  const response = await apiClient.patch(
    `${API_RADDHA_URL.category}/${id}`,
    data
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Category
const deleteCategory = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.category}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get Categorys List
const getCategorys = async (): Promise<CategoriesFetchResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.category);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// ============= HOOKS =============

// Hook for all Category mutations
export const useCategoryMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    CategoriesCreateResponse,
    errorResponse,
    CategoryFormValues
  >({
    mutationFn: createCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Category-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    CategoriesCreateResponse,
    errorResponse,
    { id: number | string; data: CategoryFormValues }
  >({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Category-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    CategoriesCreateResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Category-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createCategory: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateCategory: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteCategory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

// Hook for getting Categorys
export const useGetCategorys = () => {
  return useQuery<CategoriesFetchResponse, errorResponse>({
    queryKey: ["Category-list"],
    queryFn: getCategorys,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
