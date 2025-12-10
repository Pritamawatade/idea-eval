// Types for the Startup Idea Evaluation Platform

/**
 * Form input data from the user
 */
export interface EvaluationInput {
  ideaName: string;
  description: string;
  targetMarket?: string;
  industry?: string;
  monetizationModel?: string;
}

/**
 * SWOT Analysis structure
 */
export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

/**
 * Competitor information
 */
export interface Competitor {
  name: string;
  description: string;
  similarity: string; // e.g., "High", "Medium", "Low"
}

/**
 * Full evaluation result returned by the API
 */
export interface EvaluationResult {
  ideaSummary: string;
  swot: SWOTAnalysis;
  marketPotential: string;
  profitability: string;
  competitors: Competitor[];
  risks: string[];
  overallScore: number; // 0-100
  recommendation: string;
  nextSteps: string[];
}

/**
 * API response wrapper
 */
export interface EvaluationApiResponse {
  success: boolean;
  data?: EvaluationResult;
  error?: string;
}
