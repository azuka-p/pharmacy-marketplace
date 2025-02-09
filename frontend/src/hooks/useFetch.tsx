import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { config } from "@/config/config";
import { BaseResponse } from "@/models/jsonResponse";
import { ErrorResponse } from "@/models/jsonResponse";

export default function useFetch<TData, TBody = unknown>(
  path: string,
  options?: RequestInit,
) {
  const method = options?.method || "GET";
  const immediate = method === "GET";
  const cookies = new Cookies(null, { path: "/" });
  const ACCESS_TOKEN = cookies.get("access_token");

  const first = path.substring(0, 4)
  if (first === "/") {
    path = path.substring(4)
  }

  const [data, setData] = useState<BaseResponse<TData>>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse>();
  const fetchData = useCallback(
    async (body?: TBody) => {
      setIsLoading(true);
      setError(undefined);

      try {
        // Axios configuration
        const axiosConfig = {
          method,
          url: `${config.API_BASE_URL}${path}`,
          headers: {
            Authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : "",
          },
          data: body,
        };

        const response = await axios(axiosConfig);
        setData(response.data);

        return response;
      } catch (err) {
        if (err instanceof axios.AxiosError) {
          setError(err.response?.data as ErrorResponse);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [method, ACCESS_TOKEN, path],
  );

  useEffect(() => {
    if (immediate) fetchData(); // Automatically fetch data for "GET" method
  }, [fetchData, immediate]);

  return { data, isLoading, error, fetchData };
}
