/**
 * Premium top navbar — search trigger, notifications, theme toggle,
 * user avatar menu.
 */
"use client";

import {
  Bell,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  UserRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { SearchTrigger } from "@/components/dashboard/SearchCommand";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { SAMPLE_NOTIFICATIONS } from "@/utils/constants";
import { cn } from "@/utils/cn";

interface NavbarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  title?: string;
}

export function Navbar({ onMenuClick, onSearchClick, title }: NavbarProps) {
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useThemeContext();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = SAMPLE_NOTIFICATIONS.filter((n) => n.unread).length;

  const handleLogout = () => {
    logout();
    toast.success("Signed out. See you soon! 👋");
    router.push("/");
  };

  const handleNavigate = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-white/30 bg-white/50 px-4 backdrop-blur-xl lg:px-8 dark:border-white/10 dark:bg-slate-950/40">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-white/10"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="truncate font-display text-lg font-semibold capitalize">
          {title ?? "Dashboard"}
        </h1>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
        {/* Global search trigger (desktop) */}
        <div className="hidden md:block">
          <SearchTrigger onClick={onSearchClick} />
        </div>

        {/* Mobile search icon */}
        <button
          onClick={onSearchClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-white/10"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setMenuOpen(false);
            }}
            className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setNotifOpen(false)}
              />
              <div className="glass-strong absolute right-0 z-20 mt-2 w-72 overflow-hidden rounded-2xl p-1.5">
                <div className="flex items-center justify-between px-3 py-2">
                  <p className="text-sm font-semibold">Notifications</p>
                  <span className="text-xs text-muted-foreground">
                    {unreadCount} new
                  </span>
                </div>
                <div className="max-h-80 space-y-1 overflow-y-auto">
                  {SAMPLE_NOTIFICATIONS.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/40 dark:hover:bg-white/5",
                        notif.unread && "bg-primary-50 dark:bg-primary-950/30"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-1 h-2 w-2 shrink-0 rounded-full",
                          notif.unread ? "bg-accent-500" : "bg-slate-300"
                        )}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{notif.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {notif.message}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground/70">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => {
              setMenuOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full gradient-bg text-sm font-bold text-white shadow-lg shadow-accent-500/25 transition hover:brightness-110"
            aria-label="User menu"
          >
            {(user?.full_name ?? "U").charAt(0).toUpperCase()}
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="glass-strong absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-2xl p-1.5">
                <div className="border-b border-white/30 px-3 py-2.5 dark:border-white/10">
                  <p className="truncate text-sm font-semibold">
                    {user?.full_name ?? "Guest"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user?.email ?? "Not signed in"}
                  </p>
                </div>
                <div className="mt-1 space-y-0.5">
                  <button
                    onClick={() => handleNavigate("/profile")}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                  >
                    <UserRound className="h-4 w-4" /> Profile
                  </button>
                  <button
                    onClick={() => handleNavigate("/settings")}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                      pathname === "/login" || pathname === "/signup"
                        ? "text-slate-400"
                        : "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                    )}
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

