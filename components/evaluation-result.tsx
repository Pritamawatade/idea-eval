"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Target,
  TrendingUp,
  AlertTriangle,
  Users,
  DollarSign,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Shield,
  Rocket,
} from "lucide-react";
import type { EvaluationResult as EvaluationResultType } from "@/types/evaluation";

interface EvaluationResultProps {
  result: EvaluationResultType;
  onReset: () => void;
}

export function EvaluationResult({ result, onReset }: EvaluationResultProps) {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 65) return "text-yellow-600";
    if (score >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (
    score: number
  ): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return "default";
    if (score >= 65) return "secondary";
    if (score >= 50) return "outline";
    return "destructive";
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return "Excellent";
    if (score >= 65) return "Good";
    if (score >= 50) return "Fair";
    return "Needs Work";
  };

  const getSimilarityColor = (similarity: string): string => {
    switch (similarity.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header with Score */}
      <Card className="border-2">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            Evaluation Results
          </CardTitle>
          <CardDescription>
            Here&apos;s a comprehensive analysis of your startup idea
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div
                className={`text-6xl font-bold ${getScoreColor(result.overallScore)}`}
              >
                {result.overallScore}
              </div>
              <div className="text-sm text-muted-foreground">out of 100</div>
            </div>
            <Badge
              variant={getScoreBadgeVariant(result.overallScore)}
              className="text-sm px-4 py-1"
            >
              {getScoreLabel(result.overallScore)}
            </Badge>
            <Progress value={result.overallScore} className="w-full max-w-md h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Idea Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Idea Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {result.ideaSummary}
          </p>
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium leading-relaxed">{result.recommendation}</p>
        </CardContent>
      </Card>

      {/* SWOT Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-blue-500" />
            SWOT Analysis
          </CardTitle>
          <CardDescription>
            Strengths, Weaknesses, Opportunities, and Threats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
              <h4 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4" />
                Strengths
              </h4>
              <ul className="space-y-2">
                {result.swot.strengths.map((strength, index) => (
                  <li
                    key={index}
                    className="text-sm text-green-800 dark:text-green-300 flex items-start gap-2"
                  >
                    <span className="text-green-500 mt-1">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
              <h4 className="font-semibold text-red-700 dark:text-red-400 flex items-center gap-2 mb-3">
                <XCircle className="h-4 w-4" />
                Weaknesses
              </h4>
              <ul className="space-y-2">
                {result.swot.weaknesses.map((weakness, index) => (
                  <li
                    key={index}
                    className="text-sm text-red-800 dark:text-red-300 flex items-start gap-2"
                  >
                    <span className="text-red-500 mt-1">•</span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
              <h4 className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4" />
                Opportunities
              </h4>
              <ul className="space-y-2">
                {result.swot.opportunities.map((opportunity, index) => (
                  <li
                    key={index}
                    className="text-sm text-blue-800 dark:text-blue-300 flex items-start gap-2"
                  >
                    <span className="text-blue-500 mt-1">•</span>
                    {opportunity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900">
              <h4 className="font-semibold text-orange-700 dark:text-orange-400 flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4" />
                Threats
              </h4>
              <ul className="space-y-2">
                {result.swot.threats.map((threat, index) => (
                  <li
                    key={index}
                    className="text-sm text-orange-800 dark:text-orange-300 flex items-start gap-2"
                  >
                    <span className="text-orange-500 mt-1">•</span>
                    {threat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Potential & Profitability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Market Potential
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {result.marketPotential}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-emerald-500" />
              Profitability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {result.profitability}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Competitors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-purple-500" />
            Competitor Analysis
          </CardTitle>
          <CardDescription>
            Key competitors and their similarity to your idea
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.competitors.map((competitor, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 rounded-lg bg-muted/50 border"
              >
                <div className="space-y-1">
                  <h4 className="font-semibold">{competitor.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {competitor.description}
                  </p>
                </div>
                <Badge
                  className={`${getSimilarityColor(competitor.similarity)} border-0`}
                >
                  {competitor.similarity} Similarity
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Key Risks
          </CardTitle>
          <CardDescription>
            Important risks to consider and mitigate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.risks.map((risk, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900"
              >
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-amber-800 dark:text-amber-300">
                  {risk}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Rocket className="h-5 w-5 text-indigo-500" />
            Recommended Next Steps
          </CardTitle>
          <CardDescription>
            Action items to move your idea forward
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.nextSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button onClick={onReset} variant="outline" size="lg" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Evaluate Another Idea
        </Button>
      </div>
    </div>
  );
}
