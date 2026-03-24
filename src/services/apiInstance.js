import axios from "axios";
import { store } from "../app/store";

const apiInstance = axios.create({
    baseURL: "/api"
});

apiInstance.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
        config.headers.Authorization.accessToken = `Bearer ${token}`;
    }

    return token;
});

export default apiInstance;