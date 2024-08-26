import axios from "axios";

import { dbEndpoints as studySync } from "@/assets/data/api";
import {
  getAuthToken,
  getRefreshToken,
  removeTokens,
  setTokens,
} from "@/utils/auth";

const studySyncDB = axios.create({
  baseURL: studySync.api,
  headers: {
    "Content-Type": "application/json",
  },
});

studySyncDB.interceptors.request.use(
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

studySyncDB.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        const { data } = await studySyncDB.post(studySync.refresh, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        setTokens(data.authToken, data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.authToken}`;
        return studySyncDB(originalRequest);
      }
    }

    removeTokens();
    window.location.replace("/");
    return Promise.reject(error);
  }
);

export default studySyncDB;
