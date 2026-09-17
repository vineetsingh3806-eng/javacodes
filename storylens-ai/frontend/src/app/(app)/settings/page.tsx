/**
 * Settings page — theme preference, account info, API status.
 */
"use client";

import { motion } from "framer-motion";
import { Moon, Palette, Server, Sun } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { API_BASE_URL } from "@/utils/constants";
import { formatDate } from "@/utils/format";

export default function SettingsPage() {
  const { user } = useAuth();
  const { resolvedTheme, setTheme } = useThemeContext();
  const [apiStatus, setApiStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");

  const checkApi = async () => {
    setApiStatus("checking");
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (res.ok) setApiStatus("online");
      else setApiStatus("offline");
    } catch {
      setApiStatus("offline");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-2xl font-bold">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your preferences and check service status.
        </p>
      </motion.div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-accent-500" /> Appearance
          </CardTitle>
          <CardDescription>Choose how StoryLens AI looks for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
                resolvedTheme === "light"
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-950/40"
                  : "border-white/20 hover:border-primary-300"
              }`}
            >
              <Sun className="h-6 w-6 text-amber-500" />
              <span className="text-sm font-medium">Light</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
                resolvedTheme === "dark"
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-950/40"
                  : "border-white/20 hover:border-primary-300"
              }`}
            >
              <Moon className="h-6 w-6 text-indigo-500" />
              <span className="text-sm font-medium">Dark</span>
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
                resolvedTheme === "system"
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-950/40"
                  : "border-white/20 hover:border-primary-300"
              }`}
            >
              <Server className="h-6 w-6 text-slate-500" />
              <span className="text-sm font-medium">System</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Full name
              </label>
              <input className="input-field" defaultValue={user?.full_name} readOnly />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Email
              </label>
              <input className="input-field" defaultValue={user?.email} readOnly />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1 text-sm text-muted-foreground">
            Member since:
            <Badge variant="neutral">{formatDate(user?.created_at)}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* API status */}
      <Card>
        <CardHeader>
          <CardTitle>API status</CardTitle>
          <CardDescription>
            Backend endpoint: <code className="text-xs">{API_BASE_URL}</code>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Badge
            variant={
              apiStatus === "online"
                ? "success"
                : apiStatus === "offline"
                  ? "danger"
                  : "warning"
            }
          >
            {apiStatus === "checking"
              ? "Checking…"
              : apiStatus === "online"
                ? "Online"
                : "Offline"}
          </Badge>
          <Button variant="secondary" size="sm" onClick={checkApi}>
            Check now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

