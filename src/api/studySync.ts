import axios from "axios";

import { api } from "@/assets/data/api/endpoints";
import { getAuthToken, getRefreshToken, setTokens } from "@/utils/auth";

const studySync = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
  },
});

studySync.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

studySync.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        const { data } = await axios.post("/api/refresh-token", {
          token: refreshToken,
        });
        setTokens(data.authToken, data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.authToken}`;
        return studySync(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default studySync;
