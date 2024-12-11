import axios from "axios";

//todo: update baseurl so that it works in deployement.
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
