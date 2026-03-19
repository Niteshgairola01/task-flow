import axios from "axios";
import { tokenService } from "./tokenService";

// Axios Instances

// Reqres.in - for auth (login/register with real tokens)
const authClient = axios.create({
    baseURL: "https://reqres.in/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres_0162c2e6357a4829bda6a5b656581cc9"
    }
});


// JSONPlaceholder - for CRUD (posts = token, users, albums = projects, todo = subtasks)
const apiClient = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});


// Request interceptor - inject token
apiClient.interceptors.request.use(
    (config) => {
        const token = tokenService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor — handle 401 / token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config
        if (error.response?.status === 401 && !original._retry) {
            original._retry = true
            try {
                // In production: call refresh endpoint here
                // const { data } = await authClient.post('/token/refresh', { refresh: tokenService.getRefreshToken() })
                // tokenService.setTokens({ access: data.access })
                // original.headers.Authorization = `Bearer ${data.access}`
                // return apiClient(original)
                tokenService.clearTokens()
                window.location.href = '/login'
            } catch {
                tokenService.clearTokens()
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
);

// Auth API
export const autApi = {
    login: async (credentials) => {
        const { data } = await authClient.post("/login", {
            email: credentials?.email,
            password: credentials?.password
        });

        return data;
    },

    register: async (payload) => {
        const { data } = await authClient.post("/register", {
            email: credentials?.email,
            password: payload?.password
        });

        return data;
    }
};

