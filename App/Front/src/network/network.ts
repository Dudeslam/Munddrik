import axios from "axios";

axios.defaults.withCredentials = false;

export const instance = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENDPOINT,
})