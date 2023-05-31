import { useHttp } from "./../../composables/useHttp";
const http = useHttp();
// 注册
export const register = (data: {}) => {
  return http.post("/user/register", data);
};
// 登陆
export const login = (data: {}) => {
  return http.post("/user/login", data);
};
export const userList = (data: {}) => {
  return http.post("/user/list", data);
};
export const getUserInfo = (id: string) => {
  return http.get("/user/getUserInfo?id=" + id);
};
