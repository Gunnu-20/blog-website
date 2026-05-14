import axios from "axios";

const API = axios.create({ baseURL: "https://blog-website-backend-g1it.onrender.com" });

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("blogUser"));
  if (user?.token) req.headers.Authorization = `Bearer ${user.token}`;
  return req;
});

export default API;