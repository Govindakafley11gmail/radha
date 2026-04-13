/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import type { errorResponse } from "@/component/Admin_pannel/permission/interface";
import {  useQueryClient, useMutation } from "@tanstack/react-query";
interface MutationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: errorResponse) => void;
}
const updateFixedAssetsApproval = async ({
  id,
}: {
  id: number | string;
}) => {
  const response = await apiClient.patch(
    `http://localhost:3000/api/v1/asset/approve/${id}`,
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Permission
// ============= HOOKS =============

// Hook for all Permission mutations
export const useFixedAssetsApprovalMutations = (
  options?: MutationOptions,
) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation<
    any,
    errorResponse,
    { id: number | string }
  >({
    mutationFn: updateFixedAssetsApproval,
    onSuccess: async (data: any) => {
      await queryClient.invalidateQueries({
        queryKey: ["purchase-invoice-approval"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["purchase-invoice-payment"], // ✅ THIS is what you're missing
      });

      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      options?.onError?.(error);
    },
  });

  return {
    updateFixedAssetsApproval: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    isLoading: updateMutation.isPending,
  };
};
