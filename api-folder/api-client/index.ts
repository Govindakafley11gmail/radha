import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_EndPoints,
  withCredentials: true,
  // Don't set Content-Type here; we'll handle it in the interceptor
});

// Request interceptor to handle JSON vs FormData
apiClient.interceptors.request.use(
  (config) => {
    // If sending FormData (file upload)
    if (config.data instanceof FormData) {
      // Let Axios set the correct Content-Type with boundary
      delete config.headers["Content-Type"];
    } else {
      // Default to JSON for other requests
      config.headers["Content-Type"] = "application/json";
    }

    // Optional: add Authorization token or other headers
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error", error);

    if (error.response?.status === 401) {
      console.log("🔒 Unauthorized - redirecting to login");
      // window.location.href = '/signin'; // Uncomment if needed
    }

    return Promise.reject(error);
  }
);

export default apiClient;
