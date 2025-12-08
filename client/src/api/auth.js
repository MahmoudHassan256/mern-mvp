import api from "./apiClient";

export const register = async (data) => {
  return await api.post("/auth/register", data);
};
export const login = async (data) => {
  return await api.post("/auth/login", data);
};
export const me = async () => {
  return await api.get("/auth/me");
};
