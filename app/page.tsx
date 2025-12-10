"use client";

import { useState } from "react";
import { EvaluationForm } from "@/components/evaluation-form";
import { EvaluationResult } from "@/components/evaluation-result";
import type { EvaluationResult as EvaluationResultType } from "@/types/evaluation";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [evaluationResult, setEvaluationResult] =
    useState<EvaluationResultType | null>(null);

  const handleEvaluationComplete = (result: EvaluationResultType) => {
    setEvaluationResult(result);
    // Scroll to top to show results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setEvaluationResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col items-center justify-center mb-12 text-center space-y-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Startup Idea Evaluator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Get instant, AI-powered feedback on your startup idea. Analyze market
            potential, SWOT, competitors, and more in seconds.
          </p>
        </div>

        <div className="transition-all duration-500 ease-in-out">
          {evaluationResult ? (
            <EvaluationResult
              result={evaluationResult}
              onReset={handleReset}
            />
          ) : (
            <EvaluationForm
              onEvaluationComplete={handleEvaluationComplete}
              onError={(error) => alert(error)} // Simple error handling for now
            />
          )}
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t mt-12">
        <p>
          &copy; {new Date().getFullYear()} Startup Idea Evaluator. Powered by Next.js & AI.
        </p>
      </footer>
    </div>
  );
}
