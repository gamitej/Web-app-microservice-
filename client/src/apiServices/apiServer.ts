import axios from "axios";

export const apiGateWayUrl = "http://localhost:8000";
const API = axios.create({
  baseURL: apiGateWayUrl, // API gateway
  withCredentials: true,
});

export default API;
