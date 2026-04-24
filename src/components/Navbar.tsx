import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, LayoutDashboard, Users, LogOut, Menu, X } from "lucide-react";
import { authApi } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const navigate = useNavigate();
  const user = authApi.getUser();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    authApi.logout();
    setOpen(false);
    navigate({ to: "/login" });
  };

  const navLinkClass =
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";
  const activeProps = { className: "bg-secondary text-foreground" };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-4">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 min-w-0">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="truncate text-lg font-bold tracking-tight">ScholarERP</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link to="/dashboard" className={navLinkClass} activeProps={activeProps}>
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link to="/students" className={navLinkClass} activeProps={activeProps}>
            <Users className="h-4 w-4" /> Students
          </Link>
        </nav>

        {/* Desktop right side */}
        <div className="hidden items-center gap-3 md:flex">
          {user && (
            <span className="text-sm text-muted-foreground">
              Hi, <span className="font-medium text-foreground">{user.username}</span>
            </span>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {user && (
              <div className="px-3 pb-2 text-sm text-muted-foreground">
                Signed in as <span className="font-medium text-foreground">{user.username}</span>
              </div>
            )}
            <Link
              to="/dashboard"
              className={navLinkClass}
              activeProps={activeProps}
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            <Link
              to="/students"
              className={navLinkClass}
              activeProps={activeProps}
              onClick={() => setOpen(false)}
            >
              <Users className="h-4 w-4" /> Students
            </Link>
            <Button variant="outline" size="sm" className="mt-2 justify-start" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
