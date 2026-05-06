export function runAudit(input) {
  let totalSavings = 0;

  const results = input.tools.map((tool) => {
    let recommendation = "Looks fine";
    let savings = 0;

    if (tool.seats <= 2 && tool.plan === "team") {
      recommendation = "Downgrade to individual plan";
      savings = tool.monthlySpend * 0.3;
    }

    totalSavings += savings;

    return {
      ...tool,
      recommendation,
      savings,
    };
  });

  return {
    results,
    totalSavings,
    annualSavings: totalSavings * 12,
  };
}