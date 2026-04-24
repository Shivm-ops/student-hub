import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StudentForm } from "@/components/StudentForm";
import { StudentTable } from "@/components/StudentTable";
import { authApi } from "@/lib/auth";
import { studentsApi, type Student } from "@/lib/students";
import { toast } from "sonner";

export const Route = createFileRoute("/students")({
  beforeLoad: () => {
    if (!authApi.isAuthenticated()) throw redirect({ to: "/login" });
  },
  head: () => ({
    meta: [
      { title: "Students — ScholarERP" },
      { name: "description", content: "Manage student records." },
    ],
  }),
  component: StudentsPage,
});

function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    studentsApi.list().then(setStudents);
  }, []);

  const handleAdd = async (data: Omit<Student, "id">) => {
    const created = await studentsApi.add(data);
    setStudents((prev) => [created, ...prev]);
    toast.success(`${created.name} added`);
  };

  const handleDelete = async (id: string) => {
    await studentsApi.remove(id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    toast.success("Student deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="mt-1 text-muted-foreground">
            {students.length} {students.length === 1 ? "student" : "students"} on record.
          </p>
        </div>

        <div className="space-y-6">
          <StudentForm onAdd={handleAdd} />
          <StudentTable students={students} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  );
}
