/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { MachineCreateRespone, MachineGetReponse, MachineInputFormValues } from "../interface";

interface MutationOptions {
  onSuccess?: (data: MachineCreateRespone) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createMachine = async (data: MachineInputFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.machine, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updateMachine = async ({
  id,
  data,
}: {
  id:  string;
  data: MachineInputFormValues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.machine}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete Machine
const deleteMachine = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.machine}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getMachine = async (): Promise<MachineGetReponse> => {
  const response = await apiClient.get(API_RADDHA_URL.machine);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useMachineMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    MachineCreateRespone,
    errorResponse,
    MachineInputFormValues
  >({
    mutationFn: createMachine,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Machine-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    MachineCreateRespone,
    errorResponse,
    { id: string; data: MachineInputFormValues }
  >({
    mutationFn: updateMachine,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Machine-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    MachineCreateRespone,
    errorResponse,
    number | string
  >({
    mutationFn: deleteMachine,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Machine-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createMachine: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateMachine: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteMachine: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetMachine = () => {
  return useQuery<MachineGetReponse, errorResponse>({
    queryKey: ["Machine-list"],
    queryFn: getMachine,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
