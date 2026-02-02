import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Try to send cookies automatically
});

//  Add request interceptor to attach token from localStorage if cookies not used
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokenDApp"); // your JWT or session token
    if (token) {
      config.headers.Authorization = `Bearer ${token}` || " "; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);


