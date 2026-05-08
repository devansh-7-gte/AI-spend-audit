import { TOOL_CONFIG }
from "./pricing-data";

// Tool consolidation groups - tools that serve similar purposes
const TOOL_GROUPS = {
  chat: ["chatgpt", "claude", "gemini", "grok", "perplexity"],
  coding: ["copilot", "cursor"],
  tts: ["elevenlabs", "runway"],
  automation: ["n8n", "dify"],
  api: ["openrouter", "togetherai", "replicate", "mistral", "anthropic"],
  lowcode: ["lovable", "antigravity"],
};

// Downgrade map with realistic alternatives
const DOWNGRADE_MAP = {
  chatgpt: "plus",
  claude: "pro",
  copilot: "individual",
  cursor: "pro",
  gemini: "pro",
  perplexity: "pro",
  notebooklm: "pro",
  elevenlabs: "creator",
  lovable: "pro",
  antigravity: "starter",
  grok: "free",
  openrouter: "free",
  togetherai: "pro",
  replicate: "starter",
  mistral: "free",
  n8n: "pro",
  anthropic: "free",
  dify: "startup",
  runway: "pro"
};

export function generateRecommendation(tool, input) {
  const seats = Number(tool.seats) || 1;
  const spend = Number(tool.monthlySpend) || 0;
  const useCase = input.useCase || "general";

  let recommendation = "";
  let savings = 0;
  let severity = "low";
  let category = "neutral";

  const currentPlanPrice = TOOL_CONFIG[tool.tool]?.pricing?.[tool.plan] || 0;
  const costPerSeat = seats > 0 ? spend / seats : spend;

  // RULE 1: Seat right-sizing for team/business/enterprise plans
  if (
    (tool.plan === "team" || 
     tool.plan === "business" || 
     tool.plan === "enterprise") &&
    seats <= 3
  ) {
    const downgradePlan = DOWNGRADE_MAP[tool.tool];
    const downgradePlanPrice = TOOL_CONFIG[tool.tool]?.pricing?.[downgradePlan] || 0;
    
    // For small teams, calculate savings by reducing to individual seats
    const monthlyPricePerSeat = currentPlanPrice / Math.max(1, seats);
    const downgradeCost = downgradePlanPrice * seats;
    const currentCost = spend;
    
    savings = Math.max(0, currentCost - downgradeCost);

    if (savings > 0) {
      severity = "medium";
      category = "downgrade";
      recommendation = `Downgrade from ${tool.plan} to ${downgradePlan}: Your ${seats} team members don't need team collaboration features. Save $${savings}/month ($${savings * 12}/year).`;
    }
  }

  // RULE 2: Enterprise overkill - significant overages
  if (tool.plan === "enterprise" && seats < 15) {
    const likelyPlanPrice = TOOL_CONFIG[tool.tool]?.pricing?.["pro"] || 
                           TOOL_CONFIG[tool.tool]?.pricing?.["business"] || 0;
    const oversizingSavings = Math.max(0, spend - (likelyPlanPrice * seats));
    
    if (oversizingSavings > 0) {
      savings = Math.max(savings, oversizingSavings);
      severity = "high";
      category = "enterprise-overkill";
      recommendation = `Enterprise tier is oversized for ${seats} seats. Move to business/pro tier and save approximately $${oversizingSavings}/month.`;
    }
  }

  // RULE 3: Detect unused seats (cost per seat anomaly)
  if (seats >= 5 && costPerSeat > 50) {
    const estimatedActiveSeats = Math.ceil(spend / 30); // Assume ~$30 per active seat
    const unusedSeats = Math.max(0, seats - estimatedActiveSeats);
    
    if (unusedSeats >= 2) {
      const unusedSeatSavings = unusedSeats * (spend / seats);
      savings = Math.max(savings, Math.round(unusedSeatSavings));
      severity = "high";
      category = "unused-seats";
      recommendation = `${unusedSeats} seats appear unused (avg cost: $${Math.round(costPerSeat)}/seat). Reduce to ~${estimatedActiveSeats} active seats and save $${unusedSeatSavings.toFixed(0)}/month.`;
    }
  }

  // RULE 4: Workflow mismatch detection
  if (useCase === "writing" && tool.tool === "copilot") {
    savings = Math.max(savings, Math.round(spend * 0.3));
    severity = "medium";
    category = "workflow-mismatch";
    recommendation = `GitHub Copilot is code-focused. For writing workflows, Claude/ChatGPT is more effective. Save ~30% by switching.`;
  }

  if (useCase === "automation" && 
      !["n8n", "dify", "lovable", "antigravity"].includes(tool.tool)) {
    savings = Math.max(savings, Math.round(spend * 0.25));
    severity = "medium";
    category = "workflow-mismatch";
    recommendation = `For automation workflows, dedicated tools like n8n/Dify are more cost-effective than general AI models. Potential savings: 25%.`;
  }

  // RULE 5: Annual payment discount optimization
  if (!tool.billingCycle?.includes("annual") && spend > 20) {
    const annualDiscount = Math.round(spend * 0.15 * 12); // 15% discount for annual
    savings = Math.max(savings, annualDiscount / 12);
    if (savings > 0) {
      severity = "low";
      if (category === "neutral") category = "billing-optimization";
      recommendation = `Switch to annual billing: Save 15% = $${annualDiscount}/year ($${Math.round(annualDiscount / 12)}/month).`;
    }
  }

  // RULE 6: Tool consolidation opportunities
  const toolGroup = Object.entries(TOOL_GROUPS).find(
    ([_, tools]) => tools.includes(tool.tool)
  );
  
  if (toolGroup) {
    const groupTools = input.tools.filter(t => 
      TOOL_GROUPS[toolGroup[0]].includes(t.tool)
    );
    
    if (groupTools.length > 1) {
      const totalGroupSpend = groupTools.reduce((sum, t) => 
        sum + (Number(t.monthlySpend) || 0), 0
      );
      const consolidationSavings = Math.round(totalGroupSpend * 0.35);
      
      savings = Math.max(savings, consolidationSavings / groupTools.length);
      severity = "medium";
      category = "consolidation";
      recommendation = `Consolidate ${groupTools.length} ${toolGroup[0]} tools into 1-2 leaders. You're paying $${totalGroupSpend}/month for overlapping services. Save ~$${consolidationSavings}/month.`;
    }
  }

  // RULE 7: No optimization opportunity
  if (savings === 0 && !recommendation) {
    severity = "low";
    category = "optimized";
    recommendation = `Your ${tool.tool} setup is appropriately sized for ${seats} ${seats === 1 ? 'person' : 'people'} on the ${tool.plan} plan ($${spend}/month). No major optimization opportunities detected.`;
  }

  return {
    recommendation: recommendation.trim(),
    savings: Math.max(0, Math.round(savings)),
    severity,
    category,
  };
}