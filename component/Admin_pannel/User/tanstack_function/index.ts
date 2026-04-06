/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse,  } from "../../permission/interface";
import { GetUserDataResponse, UserCreateDataResponse, UserFormData } from "../interface";

export interface MutationOptions<TData = unknown, TError = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}



// ============= API CALLS =============

// Create User
const createUser = async (data: UserFormData) => {
  const response = await apiClient.post(API_RADDHA_URL.user, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update Permission
const updateUser
  = async ({
  id,
  data,
}: {
  id: number | string;
  data: UserFormData;
}) => {
  const response = await apiClient.patch(
    `${API_RADDHA_URL.user}/${id}`,
    data
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Permission
const deleteUser = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.user}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};


// Hook for all User mutations
export const useUserMutations = ( options?: MutationOptions<UserCreateDataResponse, errorResponse>) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    UserCreateDataResponse,
    errorResponse,
    UserFormData
  >({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["User-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    UserCreateDataResponse,
    errorResponse,
    { id: number | string; data: UserFormData }
  >({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["User-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    UserCreateDataResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["User-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createUser: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateUser: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteUser: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

//Getting Permission List

// API call
const getUserData = async (): Promise<GetUserDataResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.user);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

export const useGetUser = () => {
  return useQuery<GetUserDataResponse, any>({
    queryKey: ["User-list"],  
    queryFn: getUserData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}