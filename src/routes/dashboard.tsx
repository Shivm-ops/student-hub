import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { authApi } from "@/lib/auth";
import { studentsApi, type Student } from "@/lib/students";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    if (!authApi.isAuthenticated()) throw redirect({ to: "/login" });
  },
  head: () => ({
    meta: [
      { title: "Dashboard — ScholarERP" },
      { name: "description", content: "Overview of student data." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    studentsApi.list().then(setStudents);
  }, []);

  const totalCourses = new Set(students.map((s) => s.course)).size;
  const avgYear = students.length
    ? (students.reduce((a, s) => a + s.year, 0) / students.length).toFixed(1)
    : "—";

  const stats = [
    { label: "Total Students", value: students.length, icon: Users, accent: "var(--gradient-primary)" },
    { label: "Active Courses", value: totalCourses, icon: BookOpen, accent: "linear-gradient(135deg, oklch(0.65 0.18 200), oklch(0.7 0.15 180))" },
    { label: "Average Year", value: avgYear, icon: TrendingUp, accent: "linear-gradient(135deg, oklch(0.7 0.18 30), oklch(0.75 0.15 50))" },
    { label: "Graduates 2024", value: 12, icon: GraduationCap, accent: "linear-gradient(135deg, oklch(0.6 0.2 320), oklch(0.7 0.18 290))" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Quick overview of your institution.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-primary-foreground"
                  style={{ background: s.accent }}
                >
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 text-3xl font-bold tracking-tight">{s.value}</div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 rounded-xl border border-border bg-card p-6"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h2 className="mb-4 text-lg font-semibold">Recently Added</h2>
          <ul className="divide-y divide-border">
            {students.slice(0, 5).map((s) => (
              <li key={s.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm text-muted-foreground">{s.course}</div>
                </div>
                <span className="text-sm text-muted-foreground">Year {s.year}</span>
              </li>
            ))}
            {students.length === 0 && (
              <li className="py-6 text-center text-muted-foreground">No students yet.</li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
