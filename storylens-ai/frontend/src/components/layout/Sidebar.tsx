/**
 * Premium responsive sidebar — collapsible desktop rail (icon-only when
 * collapsed) + mobile drawer, with grouped navigation and logout.
 */
"use client";

import {
  BarChart3,
  BrainCircuit,
  Clock,
  Database,
  Download,
  Files,
  GitBranch,
  GraduationCap,
  Layers,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Mic2,
  Network,
  Presentation,
  Search,
  Settings,
  Upload,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import { APP_NAME, NAV_SECTIONS, SETTINGS_NAV } from "@/utils/constants";
import { cn } from "@/utils/cn";

/** Map icon string → Lucide icon component. */
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Upload,
  MessageSquare,
  Clock,
  Network,
  GitBranch,
  Database,
  Search,
  BrainCircuit,
  Layers,
  Mic2,
  Presentation,
  GraduationCap,
  Files,
  Download,
  BarChart3,
  Settings,
  UserRound,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({
  isOpen,
  onClose,
  collapsed = false,
  onCollapsedChange,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Signed out. See you soon! 👋");
    router.push("/");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 288 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col overflow-hidden",
          "glass-strong lg:z-40",
          // Desktop: collapsed → 72px, expanded → 288px
          "lg:w-[288px]",
          collapsed && "lg:!w-[72px]"
        )}
        style={{ boxShadow: "0 0 40px rgba(99,102,241,0.08)" }}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5">
          <Link
            href="/dashboard"
            className={cn("flex items-center gap-2.5", collapsed && "lg:justify-center lg:px-0")}
            onClick={onClose}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-bg text-white shadow-lg shadow-accent-500/30">
              <Network className="h-5 w-5" />
            </div>
            {!collapsed && (
              <span className="hidden font-display text-lg font-bold gradient-text sm:block">
                {APP_NAME}
              </span>
            )}
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={() => onCollapsedChange?.(!collapsed)}
          className="mx-3 hidden items-center justify-center gap-2 rounded-xl border border-white/30 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary-400 hover:text-primary-600 lg:flex dark:border-white/10 dark:hover:text-primary-300"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <Settings className="h-3.5 w-3.5" />
          </motion.span>
          {!collapsed && <span>Collapse</span>}
        </button>

        {/* Navigation */}
        <nav className="flex-1 space-y-3 overflow-y-auto scrollbar-thin px-3 py-3">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <p className="px-3 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = iconMap[item.icon] ?? LayoutDashboard;
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link key={item.href} href={item.href} onClick={onClose}>
                      <span
                        className={cn(
                          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          !collapsed &&
                            "lg:justify-start",
                          collapsed && "lg:justify-center lg:px-0",
                          active
                            ? "text-white"
                            : "text-slate-600 hover:bg-primary-50 hover:text-primary-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        {active && (
                          <motion.span
                            layoutId={
                              section.title === "Overview" ? "sidebar-active" : `sidebar-${section.title}`
                            }
                            className="absolute inset-0 rounded-xl gradient-bg shadow-lg shadow-accent-500/25"
                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                          />
                        )}
                        <Icon
                          className={cn(
                            "relative z-10 h-4.5 w-4.5 shrink-0",
                            active
                              ? "text-white"
                              : "text-slate-400 group-hover:text-primary-500 dark:group-hover:text-white"
                          )}
                        />
                        {!collapsed && <span className="relative z-10">{item.label}</span>}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Account group */}
          <div>
            {!collapsed && (
              <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Account
              </p>
            )}
            <div className="space-y-0.5">
              {SETTINGS_NAV.map((item) => {
                const Icon = iconMap[item.icon] ?? UserRound;
                const active = pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href} onClick={onClose}>
                    <span
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        collapsed && "lg:justify-center lg:px-0",
                        active
                          ? "text-white"
                          : "text-slate-600 hover:bg-primary-50 hover:text-primary-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {active && (
                        <motion.span
                          layoutId="sidebar-account"
                          className="absolute inset-0 rounded-xl gradient-bg shadow-lg shadow-accent-500/25"
                          transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                      )}
                      <Icon
                        className={cn(
                          "relative z-10 h-4.5 w-4.5 shrink-0",
                          active ? "text-white" : "text-slate-400 group-hover:text-primary-500 dark:group-hover:text-white"
                        )}
                      />
                      {!collapsed && <span className="relative z-10">{item.label}</span>}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* User footer */}
        <div className="border-t border-white/30 p-4 dark:border-white/10">
          {collapsed ? (
            <div className="flex justify-center">
              <button
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full gradient-bg text-sm font-bold text-white">
                {(user?.full_name ?? "U").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{user?.full_name ?? "Guest"}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email ?? "Not signed in"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}

