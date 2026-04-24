// Simple localStorage-based auth (frontend-only demo)
const KEY = "erp_auth_user";

export const authApi = {
  login: async (username: string, password: string): Promise<{ username: string }> => {
    // mock API delay
    await new Promise((r) => setTimeout(r, 400));
    if (!username || !password) throw new Error("Username and password required");
    if (password.length < 3) throw new Error("Invalid credentials");
    const user = { username };
    localStorage.setItem(KEY, JSON.stringify(user));
    return user;
  },
  logout: () => {
    localStorage.removeItem(KEY);
  },
  getUser: (): { username: string } | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  },
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(KEY);
  },
};
