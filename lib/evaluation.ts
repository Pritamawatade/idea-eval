import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import type {
  EvaluationInput,
  EvaluationResult,
} from "@/types/evaluation";

// Initialize OpenAI client
// Note: This requires OPENAI_API_KEY to be set in environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the schema for the evaluation result using Zod
const EvaluationSchema = z.object({
  ideaSummary: z.string().describe("A concise summary of the startup idea"),
  swot: z.object({
    strengths: z.array(z.string()).describe("List of strengths"),
    weaknesses: z.array(z.string()).describe("List of weaknesses"),
    opportunities: z.array(z.string()).describe("List of opportunities"),
    threats: z.array(z.string()).describe("List of threats"),
  }),
  marketPotential: z
    .string()
    .describe("Assessment of market potential (High/Medium/Low) with reasoning"),
  profitability: z
    .string()
    .describe("Assessment of profitability potential with reasoning"),
  competitors: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      similarity: z.enum(["High", "Medium", "Low"]),
    })
  ).describe("List of potential competitors"),
  risks: z.array(z.string()).describe("List of major risks"),
  overallScore: z.number().min(0).max(100).describe("Overall score from 0 to 100"),
  recommendation: z
    .string()
    .describe("Final recommendation (e.g., Proceed, Pivot, etc.) with justification"),
  nextSteps: z.array(z.string()).describe("List of actionable next steps"),
});

/**
 * Evaluates a startup idea using OpenAI's LLM.
 *
 * @param input - The startup idea input from the user
 * @returns A promise that resolves to the evaluation result
 */
export async function evaluateStartupIdea(
  input: EvaluationInput
): Promise<EvaluationResult> {
  try {
    const prompt = `
      Evaluate the following startup idea:
      
      **Name:** ${input.ideaName}
      **Description:** ${input.description}
      **Target Market:** ${input.targetMarket || "Not specified"}
      **Industry:** ${input.industry || "Not specified"}
      **Monetization Model:** ${input.monetizationModel || "Not specified"}
      
      Provide a comprehensive analysis including SWOT, market potential, profitability, competitors, risks, an overall score (0-100), a recommendation, and actionable next steps.
      Be critical but constructive.
    `;

    const completion = await openai.chat.completions.parse({
      model: "gpt-4o-2024-08-06", // Using a model that supports structured outputs
      messages: [
        {
          role: "system",
          content:
            "You are an expert startup consultant and venture capitalist. Your goal is to evaluate startup ideas critically and provide actionable feedback.",
        },
        { role: "user", content: prompt },
      ],
      response_format: zodResponseFormat(EvaluationSchema, "evaluation_result"),
    });


    const result = completion.choices[0].message.parsed;


    if (!result) {
      throw new Error("Failed to parse evaluation result from LLM");
    }

    return result;
  } catch (error) {
    console.error("Error evaluating idea with LLM:", error);

    // Fallback to mock data if API fails (for development/demo robustness)
    // In production, you might want to throw the error to the user
    console.warn("Falling back to mock evaluation due to error.");
    return generateMockEvaluation(input);
  }
}

/**
 * Fallback mock evaluation function (kept for robustness)
 */
function generateMockEvaluation(input: EvaluationInput): EvaluationResult {
  // Simulate API delay
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    ideaSummary: `(Fallback) "${input.ideaName}" is a solution in the ${input.industry || "tech"} space. ${input.description.substring(0, 100)}...`,
    swot: {
      strengths: ["Addresses a need", "Innovative approach"],
      weaknesses: ["Execution risk", "Resource intensive"],
      opportunities: ["Growing market", "Partnerships"],
      threats: ["Competition", "Regulation"],
    },
    marketPotential: "Medium - Requires further validation.",
    profitability: "Uncertain - Depends on execution.",
    competitors: [
      {
        name: "Generic Competitor",
        description: "A similar existing solution",
        similarity: "Medium",
      },
    ],
    risks: ["Market adoption", "Funding"],
    overallScore: 50,
    recommendation: "Proceed with caution (Fallback data - check API key)",
    nextSteps: ["Validate assumptions", "Build MVP"],
  };
}
