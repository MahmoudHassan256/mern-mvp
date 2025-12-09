import api from "./apiClient";

export const createItem = async (data) => {
  return await api.post("/items", data);
};

export const getAllItems = async () => {
  return await api.get("/items");
};

export const getItem = async (id) => {
  return await api.get(`/items/${id}`);
};

export const updateItem = async (id, data) => {
  return await api.put(`/items/${id}`, data);
};

export const deleteItem = async (id) => {
  return await api.delete(`/items/${id}`);
};
