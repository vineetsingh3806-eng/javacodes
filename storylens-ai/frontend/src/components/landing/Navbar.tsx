/**
 * Landing page navbar.
 */
"use client";

import { Moon, Network, Sun } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { APP_NAME } from "@/utils/constants";

export function LandingNavbar() {
  const { isAuthenticated } = useAuth();
  const { resolvedTheme, toggleTheme } = useThemeContext();

  return (
    <nav className="glass-strong sticky top-4 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg text-white shadow-lg shadow-accent-500/30">
          <Network className="h-5 w-5" />
        </div>
        <span className="font-display text-lg font-bold gradient-text">
          {APP_NAME}
        </span>
      </Link>

      <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
        <a href="#features" className="transition-colors hover:text-primary-600">
          Features
        </a>
        <a href="#how" className="transition-colors hover:text-primary-600">
          How it works
        </a>
        <a href="#faq" className="transition-colors hover:text-primary-600">
          FAQ
        </a>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        {isAuthenticated ? (
          <Link href="/dashboard" className="btn-primary px-4 py-2">
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="btn-secondary px-4 py-2 text-sm"
            >
              Log in
            </Link>
            <Link href="/signup" className="btn-primary px-4 py-2 text-sm">
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

