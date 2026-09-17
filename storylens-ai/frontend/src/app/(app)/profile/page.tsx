/**
 * Profile page — view profile, documents & generations summary.
 */
"use client";

import { motion } from "framer-motion";
import { FileText, Mail, Sparkles, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useAuth } from "@/contexts/AuthContext";
import { useDocuments } from "@/hooks/useDocuments";
import { useGenerations } from "@/hooks/useGenerations";
import { formatDate } from "@/utils/format";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { data: docsData } = useDocuments();
  const { data: genData } = useGenerations();

  const docs = docsData?.items ?? [];
  const gens = genData ?? [];
  const readyCount = docs.filter((d) => d.status === "ready").length;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface overflow-hidden"
      >
        <div className="gradient-bg h-24" />
        <CardContent className="relative -mt-12 p-6">
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-primary-500 to-accent-500 text-3xl font-bold text-white shadow-xl dark:border-slate-900">
                {(user?.full_name ?? "U").charAt(0).toUpperCase()}
              </div>
              <div className="pb-1">
                <h2 className="font-display text-xl font-bold">
                  {user?.full_name}
                </h2>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" /> {user?.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 pb-1">
              <Badge variant={user?.is_verified ? "success" : "warning"}>
                {user?.is_verified ? "Verified" : "Unverified"}
              </Badge>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Sign out
              </Button>
            </div>
          </div>
        </CardContent>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <UserRound className="h-4 w-4 text-primary-500" /> Member since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold">{formatDate(user?.created_at)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-primary-500" /> Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">{docs.length}</p>
            <p className="text-xs text-muted-foreground">
              {readyCount} ready to use
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-accent-500" /> Artifacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">{gens.length}</p>
            <p className="text-xs text-muted-foreground">
              AI generations created
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

