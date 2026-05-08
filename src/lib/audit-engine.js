import { generateRecommendation }
from "./recommendations";
import { GoogleGenAI } from "@google/genai";

export async function runAudit(input) {

  let totalSavings = 0;
  let totalSpend = 0;

  const results = input.tools.map(
    (tool) => {

      const result =
        generateRecommendation(
          tool,
          input
        );

      totalSavings +=
        Number(result.savings) || 0;

      totalSpend +=
        Number(tool.monthlySpend) || 0;

      return {
        ...tool,

        recommendation:
          result.recommendation,

        savings:
          Number(result.savings) || 0,
      };
    }
  );

  const roundedSavings =
    Math.round(totalSavings);

  const roundedSpend =
    Math.round(totalSpend);

  const savingsPercentage =
    roundedSpend > 0
      ? Math.round(
          (roundedSavings /
            roundedSpend) *
            100
        )
      : 0;

  return {

    // Individual tool analysis
    results,

    // Financial metrics
    totalSavings:
      roundedSavings,

    annualSavings:
      roundedSavings * 12,

    totalSpend:
      roundedSpend,

    savingsPercentage,

    // AI Summary
    aiSummary:
      await generateAISummary(
        input,
        roundedSavings,
        savingsPercentage
      ),

    // Share metadata
    generatedAt:
      new Date().toISOString(),

    auditId:
      generateAuditId(),
  };
}

async function generateAISummary(
 input, roundedSavings, savingsPercentage
) {
const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }
  const model = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
   const prompt = `
You are an AI spend optimization consultant.

Analyze this AI tooling audit.

TOOLS:
${JSON.stringify(input.tools, null, 2)}

TOTAL MONTHLY SAVINGS:
$${roundedSavings}

SAVINGS PERCENTAGE:
${savingsPercentage}%

Write:
- major inefficiencies
- optimization opportunities
- workflow improvements
- annual savings impact

Keep response concise and professional.
`;
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contents: [{
      parts: [{
        text: prompt
      }]
    }]
  })
});

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}`);
      }
         const improveJson = await response.json();
    const improvedText =
      (improveJson?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No summary available.").replace(/\*\*/g, "");

    return improvedText;
  
}

function generateAuditId() {
  return Math.random()
    .toString(36)
    .substring(2, 10);
}