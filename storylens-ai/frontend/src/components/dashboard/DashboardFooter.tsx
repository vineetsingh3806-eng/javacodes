/**
 * DashboardFooter — glass footer with app info and quick links.
 */
import Link from "next/link";

import { APP_NAME } from "@/utils/constants";

export function DashboardFooter() {
  return (
    <footer className="border-t border-white/30 py-6 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-xs text-muted-foreground sm:flex-row sm:px-8 sm:text-left">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-foreground">{APP_NAME}</span> — Turn
          documents into interactive stories.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/settings" className="transition-colors hover:text-primary-500">
            Settings
          </Link>
          <Link href="/profile" className="transition-colors hover:text-primary-500">
            Profile
          </Link>
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary-500"
          >
            Powered by Gemini AI
          </a>
        </div>
      </div>
    </footer>
  );
}

