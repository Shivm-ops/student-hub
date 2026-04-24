export type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
  year: number;
};

const KEY = "erp_students";

const seed: Student[] = [
  { id: "1", name: "Aisha Khan", email: "aisha@example.com", course: "Computer Science", year: 2 },
  { id: "2", name: "Liam Chen", email: "liam@example.com", course: "Mechanical Engineering", year: 3 },
  { id: "3", name: "Sofia Garcia", email: "sofia@example.com", course: "Business Admin", year: 1 },
  { id: "4", name: "Noah Patel", email: "noah@example.com", course: "Data Science", year: 4 },
];

function read(): Student[] {
  if (typeof window === "undefined") return seed;
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}

function write(list: Student[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

// Mock API
export const studentsApi = {
  list: async (): Promise<Student[]> => {
    await new Promise((r) => setTimeout(r, 200));
    return read();
  },
  add: async (data: Omit<Student, "id">): Promise<Student> => {
    await new Promise((r) => setTimeout(r, 200));
    const list = read();
    const next: Student = { ...data, id: crypto.randomUUID() };
    write([next, ...list]);
    return next;
  },
  remove: async (id: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 150));
    write(read().filter((s) => s.id !== id));
  },
};
