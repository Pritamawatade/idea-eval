"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Lightbulb, Send } from "lucide-react";
import type { EvaluationInput, EvaluationResult } from "@/types/evaluation";

interface EvaluationFormProps {
  onEvaluationComplete: (result: EvaluationResult) => void;
  onError: (error: string) => void;
}

export function EvaluationForm({
  onEvaluationComplete,
  onError,
}: EvaluationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EvaluationInput>({
    ideaName: "",
    description: "",
    targetMarket: "",
    industry: "",
    monetizationModel: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EvaluationInput, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EvaluationInput, string>> = {};

    if (!formData.ideaName.trim()) {
      newErrors.ideaName = "Idea name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Please provide a more detailed description (at least 20 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to evaluate idea");
      }

      onEvaluationComplete(data.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof EvaluationInput]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          Submit Your Startup Idea
        </CardTitle>
        <CardDescription>
          Fill in the details below to get a comprehensive evaluation of your
          startup idea. Our AI will analyze your concept and provide insights on
          market potential, risks, and next steps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Idea Name */}
          <div className="space-y-2">
            <Label htmlFor="ideaName">
              Startup Idea Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="ideaName"
              name="ideaName"
              placeholder="e.g., EcoDelivery, HealthTrack, FinanceBot"
              value={formData.ideaName}
              onChange={handleInputChange}
              disabled={isLoading}
              className={errors.ideaName ? "border-red-500" : ""}
            />
            {errors.ideaName && (
              <p className="text-sm text-red-500">{errors.ideaName}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Idea Description / Summary <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your startup idea in detail. What problem does it solve? Who are your target users? What makes it unique?"
              value={formData.description}
              onChange={handleInputChange}
              disabled={isLoading}
              rows={5}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {formData.description.length} characters
              {formData.description.length < 20 && " (minimum 20 required)"}
            </p>
          </div>

          {/* Target Market */}
          <div className="space-y-2">
            <Label htmlFor="targetMarket">
              Target Market{" "}
              <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Input
              id="targetMarket"
              name="targetMarket"
              placeholder="e.g., Small businesses, Young professionals, Healthcare providers"
              value={formData.targetMarket}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry">
              Industry{" "}
              <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Input
              id="industry"
              name="industry"
              placeholder="e.g., FinTech, HealthTech, E-commerce, SaaS, EdTech"
              value={formData.industry}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          {/* Monetization Model */}
          <div className="space-y-2">
            <Label htmlFor="monetizationModel">
              Monetization Model{" "}
              <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Input
              id="monetizationModel"
              name="monetizationModel"
              placeholder="e.g., Subscription, Freemium, Marketplace fees, B2B licensing"
              value={formData.monetizationModel}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Evaluating Your Idea...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Evaluate My Idea
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
