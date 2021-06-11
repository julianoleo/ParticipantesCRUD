import http from "../http-common";

export const getAll = () => {
  return http.get("/participante");
};

export const get = id => {
  return http.get(`/participante/${id}`);
};

export const create = data => {
  return http.put("/participante", data);
};

export const createHeroku = data => {
  return http.post("/participante", data);
};

export const update = (id, data) => {
  return http.post(`/participante/`, data);
};

export const remove = id => {
  return http.delete(`/participante/${id}`);
};