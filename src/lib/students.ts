import { authApi } from "./auth";

export type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
  year?: number; // Backend might not have year, making it optional or defaults to 1
};

const getApiUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.VITE_API_URL || "http://backend:5001/api";
  }
  return import.meta.env.VITE_API_URL || "http://localhost:5001/api";
};
const API_URL = getApiUrl();


const getHeaders = () => {
  const token = authApi.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const studentsApi = {
  list: async (): Promise<Student[]> => {
    const res = await fetch(`${API_URL}/students`, { headers: getHeaders() });
    if (!res.ok) throw new Error("Failed to fetch students");
    const data = await res.json();
    return data.map((s: any) => ({ ...s, id: s.id.toString(), year: s.year || 1 }));
  },
  add: async (data: Omit<Student, "id">): Promise<Student> => {
    const res = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add student");
    const json = await res.json();
    const created = json.student;
    return { ...created, id: created.id.toString(), year: created.year || 1 };
  },
  remove: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/students/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete student");
  },
};
