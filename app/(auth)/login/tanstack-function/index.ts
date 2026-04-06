import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInAttributes, SignUpResponseAttributes } from "../../interface";

export interface MutationOptions<TData = unknown, TError = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

// API call
const loginUser = async (data: SignInAttributes): Promise<SignUpResponseAttributes> => {
    const response = await apiClient.post(API_RADDHA_URL.login, data); 
    
  if (response.data?.success === false) {
    throw response.data as errorResponse;
  }
  return response.data;
};

// Hook
export const useLoginMutation = (options?: MutationOptions<SignUpResponseAttributes, errorResponse>) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<SignUpResponseAttributes, errorResponse, SignInAttributes>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Login-User"] }); // if needed
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
