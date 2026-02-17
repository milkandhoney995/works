import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

/**
 * カスタムaxiosベースクエリ for RTK Query
 * これは参考実装 - メインのAPIはfetchBaseQueryを使用
 *
 * todoApi.tsでメインのAPIはfetchBaseQueryを使用していますが、必要に応じてこのaxiosBaseQueryを使用することもできます。
 * 例えば、より高度なエラーハンドリングやリクエストのカスタマイズが必要な場合に便利です。
 * Replace:
 *   baseQuery: fetchBaseQuery({ baseUrl: "..." })
 * With:
 *   baseQuery: axiosBaseQuery
 */
const axiosBaseQuery: BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
  },
  unknown,
  AxiosError
> = async ({ url, method = "GET", data, params }) => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

    const result = await axios({
      url: `${API_URL}${url}`,
      method,
      data,
      params,
    });

    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: err,
    };
  }
};

export default axiosBaseQuery;

