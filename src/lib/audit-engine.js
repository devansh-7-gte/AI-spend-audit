import { generateRecommendation }
from "./recommendations";

export function runAudit(input) {

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
      generateAISummary(
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

function generateAISummary(
  input,
  savings,
  percentage
) {

  const toolCount =
    input.tools.length;

  const useCase =
    input.useCase || "general";

  if (savings === 0) {
    return `
Your current AI tooling stack appears relatively optimized for your ${useCase} workflows.

No major overspending risks were detected across the ${toolCount} tools analyzed. Your current allocation strategy seems efficient relative to team size and selected plans.

Minor optimizations may still exist through workflow consolidation or selective downgrades, but no immediate high-impact savings opportunities were identified.
    `;
  }

  if (percentage >= 40) {
    return `
Our audit identified significant optimization opportunities across your AI tooling stack.

Approximately $${savings}/month (${percentage}% of current spending) can likely be reduced through better plan alignment, removal of overlapping tools, and optimization of premium subscriptions.

The largest savings opportunities appear to come from enterprise-tier over-selection and unused premium collaboration functionality.

Based on your ${useCase} workflows, a leaner tooling configuration could maintain similar productivity while substantially reducing recurring operational costs.
    `;
  }

  if (percentage >= 20) {
    return `
Your current AI tooling setup shows moderate optimization potential.

The audit detected approximately $${savings}/month in potential savings through plan restructuring and smarter allocation of AI subscriptions across your team.

Most opportunities appear related to redundant premium features and mismatched pricing tiers relative to actual usage patterns.

Implementing the suggested changes could improve tooling efficiency while lowering annual spend by approximately $${
      savings * 12
    }.
    `;
  }

  return `
Your AI stack is relatively healthy, though a few optimization opportunities were detected.

Approximately $${savings}/month in potential savings may be achieved through selective downgrades and improved tool utilization strategies.

The current configuration generally aligns with your ${useCase} workflows, though some premium features may be underutilized relative to subscription cost.
  `;
}

function generateAuditId() {
  return Math.random()
    .toString(36)
    .substring(2, 10);
}