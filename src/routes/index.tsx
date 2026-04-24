import { createFileRoute, redirect } from "@tanstack/react-router";
import { authApi } from "@/lib/auth";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (authApi.isAuthenticated()) {
      throw redirect({ to: "/dashboard" });
    }
    throw redirect({ to: "/login" });
  },
});
