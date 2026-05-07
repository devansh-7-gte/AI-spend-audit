import { TOOL_CONFIG }
from "./pricing-data";

export function generateRecommendation(
  tool,
  input
) {

  const seats =
    Number(tool.seats) || 0;

  const spend =
    Number(tool.monthlySpend) || 0;

  const useCase =
    input.useCase || "general";

  let recommendation =
    "Current setup looks reasonable for your current usage patterns.";

  let savings = 0;

  let severity = "low";

  let category = "optimization";

  /*
    ==================================================
    RULE 1 — Small team using team/business plans
    ==================================================
  */

  if (
    seats <= 2 &&
    (
      tool.plan === "team" ||
      tool.plan === "business"
    )
  ) {

    const DOWNGRADE_MAP={
        chatgpt:"plus",
        claude:"pro",
        copilot:"individual",
        cursor:"pro",
    }

    const currentPrice =
      TOOL_CONFIG[
        tool.tool
      ]?.pricing?.[
        tool.plan
      ] || 0;
const cheaperPlan=DOWNGRADE_MAP[tool.tool];
      
    const cheaperPrice =
      TOOL_CONFIG[
        tool.tool
      ]?.pricing?.[
        cheaperPlan
      ] || 0;

    savings =
      (currentPrice -
        cheaperPrice) * seats;

    recommendation = `
Your current ${tool.plan} subscription appears oversized for a ${seats}-person team.

Downgrading to the ${cheaperPlan} plan would likely maintain similar functionality while reducing unnecessary collaboration-tier spending.
    `;

    severity = "medium";

    category = "downgrade";
  }

  /*
    ==================================================
    RULE 2 — Copilot for writing workflows
    ==================================================
  */

  if (
    useCase === "writing" &&
    tool.tool === "copilot"
  ) {

    recommendation = `
GitHub Copilot is primarily optimized for software engineering workflows.

For writing-focused use cases, tools like Claude Pro or ChatGPT Plus generally provide stronger long-form generation, editing, summarization, and reasoning capabilities at similar or lower cost.
    `;

    savings =
      Math.max(
        savings,
        spend * 0.25
      );

    severity = "medium";

    category = "workflow-mismatch";
  }

  /*
    ==================================================
    RULE 3 — Enterprise overkill
    ==================================================
  */

  if (
    tool.plan === "enterprise" &&
    seats < 10
  ) {

    savings += spend * 0.35;

    recommendation = `
Enterprise plans are usually only cost-effective for larger organizations requiring advanced compliance, centralized admin tooling, audit logs, security controls, or dedicated support.

Your current seat allocation suggests these premium enterprise capabilities may be underutilized relative to cost.
    `;

    severity = "high";

    category = "enterprise-overkill";
  }

  /*
    ==================================================
    RULE 4 — Too many AI tools
    ==================================================
  */

  if (
    input.tools.length >= 4
  ) {

    savings += spend * 0.1;

    recommendation += `

Your organization is also paying for multiple overlapping AI subscriptions simultaneously. Consolidating similar tools could further reduce operational complexity and recurring costs.
    `;
  }

  /*
    ==================================================
    RULE 5 — Underutilized seats
    ==================================================
  */

  if (
    seats >= 20 &&
    spend / seats > 40
  ) {

    savings += spend * 0.15;

    recommendation += `

Average spend-per-seat appears unusually high relative to standard industry usage patterns. This may indicate inactive seats or underutilized premium licenses.
    `;

    severity = "high";

    category = "seat-optimization";
  }

  /*
    ==================================================
    RULE 6 — Positive optimization signal
    ==================================================
  */

  if (
    savings === 0
  ) {

    recommendation = `
Your current configuration appears relatively efficient for your stated ${useCase} workflows.

No major overspending patterns or plan mismatches were detected based on current pricing heuristics and seat allocation.
    `;
  }

  return {

    recommendation:
      recommendation.trim(),

    savings:
      Math.max(
        0,
        Math.round(savings)
      ),

    severity,

    category,
  };
}