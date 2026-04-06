/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import {
  SupplierFormValues,
  SupplierCreateResponse,
  SupplierFetchResponse,
} from "../interface";
import { showToast } from "nextjs-toast-notify";

interface MutationOptions {
  onSuccess?: (data: SupplierCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// Create RawMaterials
const createSuppliers = async (data: FormData) => {
  const response = await apiClient.post(API_RADDHA_URL.supplier, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Update suppliers
const updateSuppliers = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  try {
    const response = await apiClient.patch(
      `${API_RADDHA_URL.supplier}/${id}`,
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

// Delete suppliers
const deleteSuppliers = async (id: string) => {
  const response = await apiClient.delete(
    `${API_RADDHA_URL.supplier}/${id}`
  );

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get supplierss List
const getSuppliers = async (): Promise<SupplierFetchResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.supplier);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// ============= HOOKS =============

// Hook for all suppliers mutations
export const useSuppliersMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    SupplierCreateResponse,
    errorResponse,
    FormData
  >({
    mutationFn: createSuppliers,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateMutation = useMutation<
    SupplierCreateResponse,
    errorResponse,
    { id: string; data: FormData }
  >({
    mutationFn: updateSuppliers,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
        console.log("Error",error)
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    SupplierCreateResponse,
    errorResponse,
    string
  >({
    mutationFn: deleteSuppliers,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    createSuppliers: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateSuppliers: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteSuppliers: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

// Hook for getting supplierss
export const useGetsuppliers = () => {
  return useQuery<SupplierFetchResponse, errorResponse>({
    queryKey: ["suppliers-list"],
    queryFn: getSuppliers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const downloadMouFile = async (supplierId: string) => {
  const response = await apiClient.get(
    `${API_RADDHA_URL.supplier}/download-mou/${supplierId}`,
    {
      responseType: "blob", // ✅ important for binary files
      withCredentials: true, // if your backend uses cookies/session
    }
  );

  // Extract filename from headers
  const contentDisposition = response.headers["content-disposition"];
  let filename = "mou-document";

  if (contentDisposition) {
    const match = contentDisposition.match(/filename="?([^"]+)"?/);
    if (match?.[1]) {
      filename = match[1];
    }
  }

  return { blob: response.data, filename };
};

export const useDownloadMou = () => {
  return useMutation({
    mutationFn: downloadMouFile,
    onSuccess: ({ blob, filename }) => {
      // Trigger browser download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      showToast.success("File downloaded successfully");
    },
    onError: (error: any) => {
      console.error("Download failed", error);
      showToast.error("Failed to download file");
    },
  });
};