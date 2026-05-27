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

  // Generate AI summary with timeout (non-blocking)
  let aiSummary = `Audit shows $${roundedSavings} in potential monthly savings (${savingsPercentage}% of current spend). Review individual tool recommendations for optimization opportunities.`;
  
  if (process.env.GEMINI_API_KEY) {
    const summaryPromise = generateAISummary(input, roundedSavings, savingsPercentage);
    const timeoutPromise = new Promise(resolve => {
      setTimeout(() => resolve(null), 3000);
    });
    
    try {
      const result = await Promise.race([summaryPromise, timeoutPromise]);
      if (result) {
        aiSummary = result;
      } else {
        console.warn('[AUDIT_SUMMARY_TIMEOUT]', 'Gemini API timeout - using fallback');
      }
    } catch (err) {
      console.warn('[AUDIT_SUMMARY_ERROR]', err.message);
      // Keep fallback summary
    }
  }

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

    // AI Summary (always has a value)
    aiSummary: aiSummary || `Audit shows $${roundedSavings} in potential monthly savings (${savingsPercentage}% of current spend).`,

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
  
  const prompt = `You are an AI spend optimization consultant. Analyze this AI tooling audit and provide a comprehensive multi-line summary.

TOOLS: ${JSON.stringify(input.tools, null, 2)}

TOTAL MONTHLY SAVINGS: $${roundedSavings}
SAVINGS PERCENTAGE: ${savingsPercentage}%

Generate a detailed summary with these sections:

**Executive Summary:**
Brief overview of key findings (1-2 sentences).

**Key Inefficiencies:**
- List 2-3 main cost problems identified
- Include specific tools and why they're inefficient

**Optimization Opportunities:**
- List 2-3 actionable recommendations
- Mention potential savings for each

**Financial Impact:**
- Monthly savings: $${roundedSavings}
- Annual savings: $${roundedSavings * 12}
- Savings percentage: ${savingsPercentage}%

**Action Items:**
- Top 1-2 priorities to implement immediately

Format as clear, professional bullet points. No markdown formatting (no ** or __ characters).`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API: ${response.status}`);
  }
  
  const result = await response.json();
  return (result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "").replace(/\*\*/g, "").replace(/__/g, "");
}

function generateAuditId() {
  return Math.random()
    .toString(36)
    .substring(2, 10);
}