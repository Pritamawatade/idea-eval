import { NextRequest, NextResponse } from "next/server";
import { evaluateStartupIdea } from "@/lib/evaluation";
import type {
  EvaluationInput,
  EvaluationApiResponse,
} from "@/types/evaluation";

/**
 * POST /api/evaluate
 *
 * Receives startup idea data and returns evaluation results.
 *
 * Request body:
 * {
 *   ideaName: string (required)
 *   description: string (required)
 *   targetMarket?: string
 *   industry?: string
 *   monetizationModel?: string
 * }
 *
 * Response:
 * {
 *   success: boolean
 *   data?: EvaluationResult
 *   error?: string
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse<EvaluationApiResponse>> {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    const { ideaName, description, targetMarket, industry, monetizationModel } =
      body as Partial<EvaluationInput>;

    if (!ideaName || typeof ideaName !== "string" || ideaName.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          error: "Idea name is required and must be a non-empty string",
        },
        { status: 400 }
      );
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Description is required and must be a non-empty string",
        },
        { status: 400 }
      );
    }

    // Prepare input for evaluation
    const evaluationInput: EvaluationInput = {
      ideaName: ideaName.trim(),
      description: description.trim(),
      targetMarket: targetMarket?.trim() || undefined,
      industry: industry?.trim() || undefined,
      monetizationModel: monetizationModel?.trim() || undefined,
    };

    // TODO: Add authentication/rate limiting here if needed
    // TODO: Log evaluation requests for analytics

    // Call the evaluation function
    // TODO: Replace mock evaluation with real LLM-based evaluation
    const evaluationResult = await evaluateStartupIdea(evaluationInput);

    return NextResponse.json(
      {
        success: true,
        data: evaluationResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Evaluation API error:", error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}

// Optional: Handle other methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      message: "Startup Idea Evaluation API",
      usage: "Send a POST request with ideaName and description in the body",
      endpoint: "/api/evaluate",
    },
    { status: 200 }
  );
}
