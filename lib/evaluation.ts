import type {
  EvaluationInput,
  EvaluationResult,
  Competitor,
} from "@/types/evaluation";

/**
 * Mock evaluation function that returns placeholder data.
 *
 * TODO: Replace this placeholder with real evaluation logic.
 * Options for future implementation:
 * - Call an LLM API (OpenAI, Claude, etc.) to generate analysis
 * - Integrate with a custom ML model for scoring
 * - Use an AI agent framework for comprehensive evaluation
 *
 * @param input - The startup idea input from the user
 * @returns A promise that resolves to the evaluation result
 */
export async function evaluateStartupIdea(
  input: EvaluationInput
): Promise<EvaluationResult> {
  // Simulate API delay (1-2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // TODO: Replace placeholder with real evaluation logic / call to LLM or agent
  // Example integration points:
  // - const openaiResponse = await openai.chat.completions.create({ ... });
  // - const analysis = await customAgent.analyze(input);

  // Generate mock evaluation based on input
  const mockCompetitors: Competitor[] = [
    {
      name: "CompetitorX",
      description: `A similar solution in the ${input.industry || "tech"} space`,
      similarity: "Medium",
    },
    {
      name: "EstablishedCorp",
      description: "Large enterprise with adjacent product offerings",
      similarity: "Low",
    },
    {
      name: "StartupY",
      description: "Recently funded startup with overlapping features",
      similarity: "High",
    },
  ];

  const mockResult: EvaluationResult = {
    ideaSummary: `"${input.ideaName}" is a ${input.industry || "innovative"} solution targeting ${input.targetMarket || "a broad market"}. ${input.description.substring(0, 150)}${input.description.length > 150 ? "..." : ""}`,

    swot: {
      strengths: [
        "Addresses a clear market need",
        "Potential for differentiation through unique features",
        "Scalable business model potential",
        input.monetizationModel
          ? `Clear monetization strategy: ${input.monetizationModel}`
          : "Multiple monetization paths available",
      ],
      weaknesses: [
        "Requires significant initial investment",
        "Market education may be needed",
        "Dependency on key technology or partnerships",
        "Limited brand awareness as a new entrant",
      ],
      opportunities: [
        "Growing market demand in this sector",
        "Potential for strategic partnerships",
        "Expansion into adjacent markets",
        "Emerging technologies could enhance offering",
      ],
      threats: [
        "Established competitors with more resources",
        "Market saturation in some segments",
        "Regulatory changes could impact operations",
        "Economic downturns affecting customer spending",
      ],
    },

    marketPotential: `The ${input.targetMarket || "target"} market shows promising growth potential. Based on the idea description, there appears to be a viable market opportunity. The addressable market could range from $10M to $500M depending on execution and market conditions. Further market research and validation is recommended.`,

    profitability: `With ${input.monetizationModel || "the proposed"} monetization approach, the idea has potential for profitability within 18-36 months. Initial margins may be compressed due to customer acquisition costs, but unit economics could improve with scale. Projected break-even point: 12-24 months with adequate funding.`,

    competitors: mockCompetitors,

    risks: [
      "Market timing risk - too early or too late to market",
      "Execution risk - ability to build and scale the product",
      "Funding risk - securing adequate capital for growth",
      "Team risk - attracting and retaining key talent",
      "Technology risk - keeping up with rapid changes",
      "Regulatory risk - compliance with evolving regulations",
    ],

    // Score based on description length and optional fields filled (simple heuristic)
    overallScore: calculateMockScore(input),

    recommendation: generateMockRecommendation(input),

    nextSteps: [
      "Conduct customer discovery interviews (20-30 potential users)",
      "Build a minimal prototype or landing page to test interest",
      "Analyze top 5 competitors in detail",
      "Develop a detailed financial model with realistic assumptions",
      "Identify and approach potential early adopters or beta users",
      "Research regulatory requirements in target markets",
      "Create a 90-day execution plan with key milestones",
    ],
  };

  return mockResult;
}

/**
 * Calculate a mock score based on input completeness and content
 * TODO: Replace with actual scoring logic from LLM or custom algorithm
 */
function calculateMockScore(input: EvaluationInput): number {
  let baseScore = 60; // Base score

  // Bonus for description length (more detail = better)
  if (input.description.length > 100) baseScore += 5;
  if (input.description.length > 200) baseScore += 5;
  if (input.description.length > 300) baseScore += 5;

  // Bonus for optional fields
  if (input.targetMarket) baseScore += 5;
  if (input.industry) baseScore += 3;
  if (input.monetizationModel) baseScore += 7;

  // Add some randomness to simulate real evaluation variance
  const variance = Math.floor(Math.random() * 10) - 5;
  const finalScore = Math.min(100, Math.max(0, baseScore + variance));

  return finalScore;
}

/**
 * Generate a recommendation based on the calculated score
 * TODO: Replace with LLM-generated recommendation
 */
function generateMockRecommendation(input: EvaluationInput): string {
  const score = calculateMockScore(input);

  if (score >= 80) {
    return `STRONG PROCEED - "${input.ideaName}" shows excellent potential. The idea is well-defined and addresses a clear market need. Recommended to proceed with prototype development and customer validation.`;
  } else if (score >= 65) {
    return `PROCEED WITH CAUTION - "${input.ideaName}" has good potential but requires further refinement. Focus on strengthening the value proposition and conducting deeper market research before significant investment.`;
  } else if (score >= 50) {
    return `PIVOT RECOMMENDED - "${input.ideaName}" has some merit but faces significant challenges. Consider pivoting the concept or narrowing the focus to a more specific niche before proceeding.`;
  } else {
    return `RECONSIDER - "${input.ideaName}" requires substantial rethinking. The current concept may not have sufficient market viability. Consider fundamental changes to the approach or exploring alternative ideas.`;
  }
}
