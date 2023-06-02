// const useConfig = useRuntimeConfig();

import { LocalEnum } from "~/enums";
import { useStorage } from "@vueuse/core";

const BASE_URL = "http://localhost:3000/api/v1";
// 请求方法封装
const fetch = $fetch.create({
  baseURL: BASE_URL,
  // 请求拦截
  onRequest({ request, options }) {
    // options.headers
    // 新增认证
    const token = useStorage(LocalEnum.TOKEN, null);
    // 'Bearer'
    const headers: Headers = new Headers(options.headers);
    headers.set("token", "66666");
  },
  // 响应拦截
  onResponse({ request, options, response }) {},
  onResponseError(error) {
    console.log(error);
  },
});

export const useHttp = () => {
  return {
    get: (url: string, params?: object) => {
      return fetch(url, {
        method: "GET",
        params,
      });
    },
    post: (url: string, body?: object) => {
      return fetch(url, {
        method: "POST",
        body,
      });
    },
  };
};
