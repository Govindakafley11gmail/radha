/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/api-folder/api-client";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "nextjs-toast-notify";

export const downloadFile = async (endpoint: string) => {
  const response = await apiClient.get(endpoint, {
    responseType: "blob", // ✅ important for binary files
    withCredentials: true, // if your backend uses cookies/session
  });
  
  // Extract filename from headers
  const contentDisposition = response.headers["content-disposition"];
  let filename = "downloaded-file";
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="?([^"]+)"?/);
    if (match?.[1]) {
      filename = match[1];
    }
  }
  
  return { blob: response.data, filename };
};

// Universal download hook
export const useDownloadFile = () => {
  return useMutation({
    mutationFn: downloadFile,
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
