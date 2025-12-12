# Startup Idea Evaluator

A modern, AI-powered platform that evaluates startup ideas in seconds. Built with Next.js and OpenAI.

![Startup Idea Evaluator](https://placehold.co/1200x630/png?text=Startup+Idea+Evaluator)

## 🚀 Features

- **Instant AI Evaluation**: Uses OpenAI's GPT-4o to analyze your startup idea.
- **Comprehensive Analysis**:
  - **SWOT Analysis**: Strengths, Weaknesses, Opportunities, Threats.
  - **Market Potential**: Assessment of market size and growth.
  - **Profitability**: Revenue model analysis and break-even projections.
  - **Competitor Analysis**: Identification of potential competitors and similarity scoring.
  - **Risk Assessment**: Key risks and mitigation strategies.
- **Actionable Feedback**: Concrete next steps and a final recommendation (Proceed, Pivot, etc.).
- **Downloadable Reports**: Export the full evaluation as a Markdown file.
- **Modern UI**: Clean, responsive interface built with Tailwind CSS and Shadcn UI.

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fidea-eval)

## 🤖 Workflow Automation with Kestra

This project includes a [Kestra](https://kestra.io) workflow definition (`kestra-flow.yaml`) to automate the evaluation of startup ideas.

To use it:
1.  Install Kestra (e.g., via Docker).
2.  Import the `kestra-flow.yaml` file into your Kestra instance.
3.  Ensure your Next.js app is running (e.g., on port 3000).
4.  Execute the workflow to trigger an evaluation.

## 🐰 Code Review with CodeRabbit

This project is configured for automated code reviews using [CodeRabbit](https://coderabbit.ai). The configuration file is located at `.coderabbit.yaml`.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [OpenAI API](https://openai.com/) (GPT-4o)
- **Validation**: [Zod](https://zod.dev/) (Structured Outputs)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / Radix UI

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- An OpenAI API Key

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/idea-eval.git
    cd idea-eval
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root directory and add your OpenAI API key:
    ```bash
    OPENAI_API_KEY=sk-your-api-key-here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    # or
    bun dev
    ```

5.  **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 How to Use

1.  **Enter your Idea**: Fill in the form with your startup idea's name, description, and optional details like target market or industry.
2.  **Evaluate**: Click the "Evaluate My Idea" button. The AI will process your input (usually takes 5-10 seconds).
3.  **Review Results**: Read through the detailed report covering SWOT, competitors, and more.
4.  **Download**: Click "Download Report" to save the analysis for later.
5.  **Iterate**: Use the "Evaluate Another Idea" button to test different concepts or refined versions of your idea.

## 📂 Project Structure

```
├── app/
│   ├── api/evaluate/    # API route for handling evaluation requests
│   ├── globals.css      # Global styles and Tailwind directives
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main homepage (Form + Result view)
├── components/
│   ├── ui/              # Reusable UI components (Button, Card, etc.)
│   ├── evaluation-form.tsx   # Form component
│   └── evaluation-result.tsx # Result display component
├── lib/
│   ├── evaluation.ts    # Core evaluation logic (OpenAI integration)
│   └── utils.ts         # Utility functions
├── types/
│   └── evaluation.ts    # TypeScript interfaces
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
