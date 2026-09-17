/**
 * SearchCommand — global search over the user's documents and app pages.
 * Keyboard-friendly: ↑/↓ navigate, Enter opens, Esc closes.
 */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, FileText, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useDocuments } from "@/hooks/useDocuments";
import { NAV_SECTIONS } from "@/utils/constants";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const { data } = useDocuments();
  const docs = data?.items ?? [];
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  // Build flattened searchable results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const items: Array<{ label: string; href: string; type: "page" | "document" }> = [];
    // Pages
    NAV_SECTIONS.flatMap((section) => section.items).forEach((item) => {
      if (item.label.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q)) {
        items.push({ label: item.label, href: item.href, type: "page" });
      }
    });
    // Documents
    docs.forEach((doc) => {
      if (doc.title.toLowerCase().includes(q)) {
        items.push({ label: doc.title, href: "/upload", type: "document" });
      }
    });
    return items.slice(0, 8);
  }, [query, docs]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const result = results[activeIndex];
      if (result) {
        window.location.href = result.href;
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="glass-strong mx-auto mt-24 w-full max-w-lg overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-white/30 px-4 py-3.5 dark:border-white/10">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search documents and pages…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-white/10"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto p-2">
              {query.trim() === "" ? (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Start typing to search your workspace.
                  <span className="mt-1 block text-xs">
                    Tip: press <kbd className="rounded bg-white/10 px-1.5 py-0.5">⌘K</kbd> anywhere
                  </span>
                </p>
              ) : results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No results for “{query}”.
                </p>
              ) : (
                results.map((result, index) => (
                  <a
                    key={`${result.type}-${result.label}`}
                    href={result.href}
                    onClick={() => onOpenChange(false)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      index === activeIndex
                        ? "bg-gradient-to-r from-primary-600 to-accent-600 text-white"
                        : "text-slate-700 hover:bg-white/40 dark:text-slate-200 dark:hover:bg-white/5"
                    }`}
                  >
                    {result.type === "document" ? (
                      <FileText className="h-4 w-4 shrink-0 opacity-70" />
                    ) : (
                      <Search className="h-4 w-4 shrink-0 opacity-70" />
                    )}
                    <span className="truncate">{result.label}</span>
                    <span className="ml-auto flex items-center gap-1 text-[10px] uppercase tracking-wider opacity-60">
                      {result.type} <CornerDownLeft className="h-3 w-3" />
                    </span>
                  </a>
                ))
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center gap-4 border-t border-white/30 px-4 py-2 text-[11px] text-muted-foreground dark:border-white/10">
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-white/10 px-1.5 py-0.5">↑</kbd>
                <kbd className="rounded bg-white/10 px-1.5 py-0.5">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-white/10 px-1.5 py-0.5">↵</kbd>
                open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-white/10 px-1.5 py-0.5">esc</kbd>
                close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Convenience wrapper that renders a search trigger button. */
export function SearchTrigger({ onClick }: { onClick: () => void }) {
  const { data } = useDocuments();
  const docCount = data?.items.length ?? 0;
  return (
    <button
      onClick={onClick}
      className="hidden w-full max-w-xs items-center gap-2.5 rounded-xl border border-white/30 bg-white/40 px-3.5 py-2 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-primary-400 hover:bg-white/60 md:flex dark:border-white/10 dark:bg-white/5 dark:hover:border-primary-500"
    >
      <Search className="h-4 w-4" />
      <span className="truncate">
        {docCount > 0 ? `Search ${docCount} documents…` : "Search app…"}
      </span>
      <kbd className="ml-auto rounded-md bg-white/40 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground dark:bg-white/10">
        ⌘K
      </kbd>
    </button>
  );
}

