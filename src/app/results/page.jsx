"use client";

import { useEffect, useState } from "react";
import { runAudit } from "@/lib/audit-engine";

export default function ResultsPage() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auditInput"));

    if (data) {
      const audit = runAudit(data);
      setResult(audit);
    }
  }, []);

  if (!result) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Total Savings: ${result.totalSavings}
      </h1>

      <p>Annual: ${result.annualSavings}</p>

      {result.results.map((r, i) => (
        <div key={i} className="mt-4 border p-4 rounded">
          <p>{r.tool}</p>
          <p>{r.recommendation}</p>
          <p>${r.savings}</p>
        </div>
      ))}
    </div>
  );
}