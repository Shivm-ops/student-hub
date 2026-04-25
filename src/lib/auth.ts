const KEY = "erp_auth_token";
const getApiUrl = () => {
  if (typeof window === "undefined") {
    return process.env.VITE_API_URL || "http://backend:5001/api";
  }
  return import.meta.env.VITE_API_URL || "http://localhost:5001/api";
};
const API_URL = getApiUrl();

export const authApi = {
  login: async (
    username: string,
    password: string,
  ): Promise<{ username: string; token: string }> => {
    if (!username || !password) throw new Error("Username and password required");

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    const user = { username, token: data.token };
    localStorage.setItem(KEY, data.token);
    localStorage.setItem("erp_auth_user", JSON.stringify(user));
    return user;
  },
  logout: () => {
    localStorage.removeItem(KEY);
    localStorage.removeItem("erp_auth_user");
  },
  getUser: (): { username: string; token?: string } | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("erp_auth_user");
    return raw ? JSON.parse(raw) : null;
  },
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(KEY);
  },
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(KEY);
  },
};
