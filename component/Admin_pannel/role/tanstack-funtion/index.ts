/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse,  } from "../../permission/interface";
import { CreateRoleResponse, GetRolesResponse, RoleFormValues } from "../interface";

export interface MutationOptions<TData = unknown, TError = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}



// ============= API CALLS =============

// Create Role
const createRole = async (data: RoleFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.role, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update Permission
const updateRole
  = async ({
  id,
  data,
}: {
  id: number | string;
  data: RoleFormValues;
}) => {
  const response = await apiClient.patch(
    `${API_RADDHA_URL.role}/${id}`,
    data
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Permission
const deleteRole = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.role}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};


// Hook for all Role mutations
export const useRoleMutations = ( options?: MutationOptions<CreateRoleResponse, errorResponse>) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    CreateRoleResponse,
    errorResponse,
    RoleFormValues
  >({
    mutationFn: createRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Role-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    CreateRoleResponse,
    errorResponse,
    { id: number | string; data: RoleFormValues }
  >({
    mutationFn: updateRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Role-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    CreateRoleResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deleteRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Role-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createRole: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateRole: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteRole: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

//Getting Permission List

// API call
const getRoleData = async (): Promise<GetRolesResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.role);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

export const useGetRole = () => {
  return useQuery<GetRolesResponse, any>({
    queryKey: ["Role-list"],  
    queryFn: getRoleData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}