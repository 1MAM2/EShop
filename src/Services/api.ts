import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let isRefreshing = false;
let refreshQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  refreshQueue.forEach((p) => {
    if (error) p.reject(error);
    else if (token) p.resolve(token);
  });
  refreshQueue = [];
};

// Request Interceptor  Token ekleme
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor  401 olduğunda refresh deneme
api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError) => {
    const originalReq = err.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (err.response?.status === 401 && !originalReq._retry) {
     

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalReq.headers) {
            originalReq.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalReq);
        });
      }

      originalReq._retry = true;
      isRefreshing = true;
      

      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        const resp = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`,
          {
            refreshToken,
          }
        );

        const { accessToken, refreshToken: newRefresh } = resp.data;
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, newRefresh);
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        

        processQueue(null, accessToken);

        if (originalReq.headers) {
          originalReq.headers.Authorization = `Bearer ${accessToken}`;
        }
        return api(originalReq);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        window.location.href = "/account";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    

    return Promise.reject(err);
  }
);

export default api;
