import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { messages, context } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            );
        }

        const systemPrompt = `
You are an expert startup consultant. The user is asking for help with a specific "Next Step" from a startup idea evaluation.

**Startup Idea Context:**
Name: ${context?.ideaName || "Unknown"}
Description: ${context?.description || "Unknown"}
Target Market: ${context?.targetMarket || "Unknown"}

**Focus Step:**
${context?.step || "General advice"}

Your goal is to provide specific, actionable, and practical advice on how to execute this step. Be concise but thorough.
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                ...messages,
            ],
        });

        return NextResponse.json({
            role: "assistant",
            content: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
