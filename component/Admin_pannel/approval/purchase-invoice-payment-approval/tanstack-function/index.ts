/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { PurchaseInvoiceGetResponseAttributes } from "../interface";
interface MutationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: errorResponse) => void;
}
const getPurachaseInvoicePaymentApproval =
  async (): Promise<PurchaseInvoiceGetResponseAttributes> => {
    const response = await apiClient.get(
      API_RADDHA_URL.purachaseInovicePaymentApproval,
    );

    if (response.data?.success === false) {
      throw { data: response.data };
    }

    return response.data;
  };

export const useGetPurachaseInvoicePaymentApproval = () => {
  return useQuery<PurchaseInvoiceGetResponseAttributes, errorResponse>({
    queryKey: ["purchase-invoice-approval"], // ✅ change this

    queryFn: getPurachaseInvoicePaymentApproval,
    staleTime: 0,
    refetchOnMount: true, // ✅ refetch every time component mounts
    refetchOnWindowFocus: true, // ✅ refetch when tab regains focus
  });
};

// Update Permission
const updatePurchaseInvoicePaymentApproval = async ({
  id,
}: {
  id: number | string;
}) => {
  console.log(id);
  const response = await apiClient.patch(
    `${API_RADDHA_URL.rawMaterialReceipt}/${id}`,
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Permission
// ============= HOOKS =============

// Hook for all Permission mutations
export const usePurchaseInvoicePaymentApprovalMutations = (
  options?: MutationOptions,
) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation<
    any,
    errorResponse,
    { id: number | string }
  >({
    mutationFn: updatePurchaseInvoicePaymentApproval,
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
    updatePurchaseInvoicePaymentApproval: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    isLoading: updateMutation.isPending,
  };
};
