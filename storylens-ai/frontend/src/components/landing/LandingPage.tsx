/**
 * Marketing landing page — hero, features, how-it-works, FAQ.
 */
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Clock,
  FileText,
  MessageSquare,
  Mic2,
  Network,
  Presentation,
  Sparkles,
  Upload,
} from "lucide-react";
import Link from "next/link";

import { LandingNavbar } from "./Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const features = [
  {
    icon: Clock,
    title: "AI Timelines",
    desc: "Automatically extract chronological events from any document into a beautiful, interactive timeline.",
  },
  {
    icon: Network,
    title: "Mind Maps",
    desc: "Turn dense content into structured, hierarchical mind maps that make relationships crystal clear.",
  },
  {
    icon: BrainCircuit,
    title: "Smart Quizzes",
    desc: "Generate comprehension quizzes with explanations to test and reinforce understanding.",
  },
  {
    icon: Presentation,
    title: "Presentations",
    desc: "Get a ready-to-deliver slide deck with speaker notes generated from your document.",
  },
  {
    icon: Mic2,
    title: "Podcast Scripts",
    desc: "Convert documents into engaging host-and-guest podcast scripts you can record instantly.",
  },
  {
    icon: MessageSquare,
    title: "Document Chat",
    desc: "Ask natural-language questions and get answers grounded in your document's content.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "1 · Upload",
    desc: "Drop a PDF, DOCX, PPTX, image, or text file. We support OCR for scanned documents.",
  },
  {
    icon: Sparkles,
    title: "2 · Generate",
    desc: "Pick an artifact — timeline, mind map, quiz, presentation, or podcast — and let Gemini work.",
  },
  {
    icon: BookOpen,
    title: "3 · Learn & Share",
    desc: "Explore, study, export, and share your AI-generated learning artifacts.",
  },
];

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-100/60 dark:from-slate-950 dark:via-slate-900 dark:to-accent-950/40">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary-300/25 blur-3xl dark:bg-primary-700/20" />
        <div className="absolute top-40 -right-32 h-[26rem] w-[26rem] rounded-full bg-accent-300/25 blur-3xl dark:bg-accent-700/20" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-700/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-20">
        <LandingNavbar />

        {/* Hero */}
        <section className="pt-20 pb-16 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-primary-600 dark:text-primary-300">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by Google Gemini
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl"
          >
            Turn any document into{" "}
            <span className="gradient-text">interactive stories</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            StoryLens AI reads your PDFs, slides, and notes — then generates
            timelines, mind maps, quizzes, presentations, and podcast scripts
            in seconds.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/signup" className="btn-primary px-7 py-3.5 text-base">
              Start for free <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#features" className="btn-secondary px-7 py-3.5 text-base">
              Explore features
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mx-auto mt-16 max-w-3xl"
          >
            <div className="glass-strong rounded-3xl p-2">
              <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 p-6 dark:from-slate-900 dark:to-slate-950">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <FileText className="h-4 w-4" /> Example document → Artifact
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {["Timeline", "Mind Map", "Quiz", "Slides", "Podcast"].map(
                    (label) => (
                      <div
                        key={label}
                        className="glass flex flex-col items-center gap-2 rounded-2xl px-3 py-5"
                      >
                        <Sparkles className="h-5 w-5 text-accent-500" />
                        <span className="text-xs font-semibold">{label}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section id="features" className="pt-16">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Everything your document needs
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              One upload. Five powerful ways to learn, present, and remember.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                className="card-surface group p-6 transition-all hover:-translate-y-1 hover:shadow-glass-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-bg text-white shadow-lg shadow-accent-500/25 transition-transform group-hover:scale-110">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="pt-20">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              From raw file to rich artifact in three simple steps.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                className="glass rounded-3xl p-7 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg text-white shadow-lg shadow-accent-500/25">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="pt-20">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-2xl space-y-3">
            {[
              {
                q: "What file types are supported?",
                a: "PDF, DOCX, PPTX, TXT/Markdown, and images (PNG, JPG, JPEG, WEBP, TIFF, BMP) with OCR text extraction.",
              },
              {
                q: "Is my data secure?",
                a: "Yes. Every document is scoped to your account, stored in PostgreSQL, and never shared between users.",
              },
              {
                q: "Do I need an API key?",
                a: "To use AI generation features you need a free Google Gemini API key from Google AI Studio, added to your .env file.",
              },
              {
                q: "Can I run this locally?",
                a: "Absolutely — just run docker-compose up. PostgreSQL and Qdrant are provisioned automatically.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="card-surface group p-5 open:shadow-glass-lg"
              >
                <summary className="cursor-pointer list-none font-medium">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pt-20">
          <div className="glass-strong rounded-3xl bg-gradient-to-br from-primary-600 via-accent-500 to-blue-600 p-10 text-center text-white sm:p-14">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Ready to tell your story?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Join StoryLens AI and transform how you read, learn, and share.
            </p>
            <Link
              href="/signup"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-primary-700 shadow-xl transition hover:bg-primary-50"
            >
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <footer className="mt-16 border-t border-white/30 pt-8 text-center text-sm text-muted-foreground dark:border-white/10">
          © {new Date().getFullYear()} StoryLens AI. Built with Next.js,
          FastAPI, PostgreSQL, Qdrant & Gemini.
        </footer>
      </div>
    </div>
  );
}

