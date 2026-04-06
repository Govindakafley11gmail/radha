/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Department,
  DepartmentCreateResponse,
  DepartmentFormValues,
  DepartmentsFetchResponse,
  
} from "../interface";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";

interface MutationOptions {
  onSuccess?: (data: DepartmentCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// Create Department
const createDepartment = async (data: DepartmentFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.departments, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update Department
const updateDepartment = async ({
  id,
  data,
}: {
  id: string;
  data: DepartmentFormValues;
}) => {
  const response = await apiClient.patch(
    `${API_RADDHA_URL.departments}/${id}`,
    data
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Department
const deleteDepartment = async (id: string) => {
  const response = await apiClient.delete(
    `${API_RADDHA_URL.departments}/${id}`
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get Departments List
const getDepartments = async (): Promise<DepartmentsFetchResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.departments);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// ============= HOOKS =============

// Hook for all Department mutations
export const useDepartmentMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    DepartmentCreateResponse,
    errorResponse,
    DepartmentFormValues
  >({
    mutationFn: createDepartment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Department-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    DepartmentCreateResponse,
    errorResponse,
    { id: string; data: DepartmentFormValues }
  >({
    mutationFn: updateDepartment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Department-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    DepartmentCreateResponse,
    errorResponse,
    string
  >({
    mutationFn: deleteDepartment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Department-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Error deleting department");
      options?.onError?.(error);
    },
  });

  return {
    createDepartment: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateDepartment: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteDepartment: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

// Hook for getting Departments
export const useGetDepartments = () => {
  return useQuery<DepartmentsFetchResponse, errorResponse>({
    queryKey: ["Department-list"],
    queryFn: getDepartments,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
