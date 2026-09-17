/**
 * Quiz artifact renderer — interactive quiz with scoring.
 */
"use client";

import { BrainCircuit, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import type { QuizData } from "@/types";

export function QuizView({ data }: { data: QuizData }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = data.questions[current];
  const total = data.questions.length;
  const isAnswered = selected !== null;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    if (idx === question.correct_index) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="mx-auto max-w-lg py-10 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-bg text-3xl font-bold text-white shadow-xl shadow-accent-500/25 mx-auto">
            {pct}%
          </div>
          <h2 className="font-display text-2xl font-bold">
            {pct >= 70 ? "Great job! 🎉" : pct >= 40 ? "Nice try! 💪" : "Keep practicing! 📚"}
          </h2>
          <p className="text-muted-foreground">
            You scored {score} out of {total} questions correctly.
          </p>
          <Button onClick={restart}>Retake quiz</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold gradient-text">
          {data.title}
        </h2>
        <Badge variant="info">
          {current + 1} / {total}
        </Badge>
      </div>

      <motion.div
        key={current}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold">
              {question.question}
            </h3>

            <div className="mt-5 space-y-3">
              {question.options.map((option, idx) => {
                const isCorrect = idx === question.correct_index;
                const isSelected = idx === selected;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all",
                      !isAnswered &&
                        "border-white/30 bg-white/50 hover:border-primary-400 hover:bg-primary-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                      isAnswered && isCorrect &&
                        "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
                      isAnswered && isSelected && !isCorrect &&
                        "border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
                      isAnswered && !isSelected && !isCorrect &&
                        "opacity-60"
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold dark:bg-white/10">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-rose-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && question.explanation && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 rounded-xl bg-primary-50 p-3 text-sm text-primary-800 dark:bg-primary-950/40 dark:text-primary-200"
              >
                💡 {question.explanation}
              </motion.p>
            )}

            {isAnswered && (
              <div className="mt-5 flex justify-end">
                <Button onClick={handleNext}>
                  {current + 1 >= total ? "See results" : "Next question"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export function QuizEmpty() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300">
        <BrainCircuit className="h-7 w-7" />
      </div>
      <p className="max-w-md text-sm text-muted-foreground">
        Select a ready document and click <strong>Generate</strong> to create
        an AI comprehension quiz with explanations.
      </p>
    </div>
  );
}

