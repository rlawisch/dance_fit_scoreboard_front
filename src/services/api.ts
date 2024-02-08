import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_PROD,
});

export default api;
