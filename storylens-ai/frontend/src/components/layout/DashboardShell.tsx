/**
 * Premium dashboard layout shell — sidebar + navbar + main content +
 * right activity panel (xl) + footer.
 */
"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import { ActivityPanel } from "@/components/dashboard/ActivityPanel";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { SearchCommand } from "@/components/dashboard/SearchCommand";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { cn } from "@/utils/cn";

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/upload": "Upload Documents",
  "/chat": "AI Chat",
  "/timeline": "Timeline",
  "/mindmap": "Mind Map",
  "/concept-graph": "Concept Graph",
  "/knowledge-graph": "Knowledge Graph",
  "/semantic-search": "Semantic Search",
  "/quiz": "Quiz",
  "/flashcards": "Flashcards",
  "/podcast": "Podcast",
  "/presentation": "Presentation",
  "/teacher-mode": "Teacher Mode",
  "/document-compare": "Document Compare",
  "/exports": "Exports",
  "/analytics": "Analytics",
  "/profile": "Profile",
  "/settings": "Settings",
};

export function DashboardShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Desktop sidebar collapse (icon-only rail)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const title = titleMap[pathname] ?? "StoryLens AI";

  // Hide activity panel on compact screens / non-dashboard pages
  const showActivity = pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-slate-950 dark:via-slate-900 dark:to-accent-950/30">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary-300/30 blur-3xl dark:bg-primary-700/20" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-accent-300/30 blur-3xl dark:bg-accent-700/20" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-700/10" />
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />

      <div className={cn("relative", sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-[288px]")}>
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onSearchClick={() => setSearchOpen(true)}
          title={title}
        />

        {/* Content grid: main + optional right activity panel */}
        <div className={cn(
          "mx-auto max-w-7xl px-4 py-6 lg:px-8",
          showActivity && "xl:grid xl:grid-cols-[1fr_280px] xl:items-start xl:gap-6"
        )}>
          <main className="min-w-0">{children}</main>
          {showActivity && (
            <aside className="hidden xl:sticky xl:top-20 xl:block xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto xl:scrollbar-thin">
              <ActivityPanel />
            </aside>
          )}
        </div>

        <DashboardFooter />
      </div>
    </div>
  );
}

