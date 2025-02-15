import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // API gateway
  withCredentials: true,
});

export default API;
