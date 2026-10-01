import { SERVER_URI } from "@/constants/env";
import axios from "axios";

const api = axios.create({
    baseURL: SERVER_URI,
    withCredentials: true,
});

// attach interceptor to api, not axios
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log("Attaching token to request:", token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
