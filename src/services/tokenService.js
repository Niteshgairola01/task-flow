const KEYS = {
    ACCESS: "tf_access_token",
    REFRESH: "tf_refresh_token",
    USER: "tf_user"
}

export const tokenService = {
    getAccessToken: () => localStorage.getItem(KEYS.ACCESS),
    getRefreshToken: () => localStorage.getItem(KEYS.REFRESH),

    setToken: ({ access, refresh }) => {
        if (access) localStorage.setItem(KEYS.ACCESS, access);
        if (refresh) localStorage.setItem(KEYS.REFRESH, refresh);
    },

    clearTokens: () => {
        localStorage.clear(KEYS.ACCESS);
        localStorage.clear(KEYS.REFRESH);
        localStorage.clear(KEYS.USER);
    },

    getUser: () => {
        try {
            const raw = localStorage.getItem(KEYS.USER);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    setUser: (user) => {
        localStorage.setItem(KEYS.USER, JSON.stringify(user))
    },

    isTokenExpired: (token) => {
        if (!token) return true;

        try {
            // JWT decode
            const payload = JSON.parse(atob(token.split(".")[1]));
            return Date.now() >= payload.exp * 10000;
        } catch {
            // If token is not a valid JWT, treat as valid
            return false;
        }

    }
}