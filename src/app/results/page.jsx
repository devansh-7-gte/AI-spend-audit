"use client";

import { useState } from "react";

import Link from "next/link";

import {
  useSearchParams,
} from "next/navigation";

import { useAudit }
from "@/hooks/useAudit";

import { Button }
from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge }
from "@/components/ui/badge";

import {
  TrendingDown,
  DollarSign,
  Target,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Copy,
  Share2,
  Brain,
} from "lucide-react";

export default function ResultsPage() {
  // Get audit ID from URL
  const searchParams =
    useSearchParams();

  const auditId =
    searchParams.get("id");

  // Fetch audit using custom hook
  const {
    data,
    loading,
    error,
  } = useAudit(auditId);

  const [copied, setCopied] =
    useState(false);

  const result =
    data?.audit?.result;
  const resultRows = Array.isArray(
    result?.results
  )
    ? result.results
    : [];

  // Loading state
  if (loading) {
    return (
      <div className="dark bg-slate-950 text-white min-h-screen flex items-center justify-center">

        <div className="text-center space-y-4">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>

          <p className="text-lg text-gray-400">
            Analyzing your spending...
          </p>

        </div>

      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="dark bg-slate-950 text-white min-h-screen flex items-center justify-center">

        <div className="text-center space-y-4">

          <h1 className="text-3xl font-bold">
            Error
          </h1>

          <p className="text-red-400">
            {error}
          </p>

        </div>

      </div>
    );
  }

  if (!result || !Array.isArray(result.results)) {
    return (
      <div className="dark bg-slate-950 text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">
            Error
          </h1>
          <p className="text-red-400">
            Audit result is unavailable.
          </p>
        </div>
      </div>
    );
  }

  // Share URL
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/share/${auditId}`
      : "";

  // Copy link
  const copyShareUrl =
    async () => {

      try {

        await navigator.clipboard.writeText(
          shareUrl
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);

      } catch (err) {

        console.error(
          "Copy failed"
        );
      }
    };

  // Max savings for progress bars
 const maxSavings =
  Math.max(
    ...resultRows.map(
      (r) => r.savings || 0
    )
  );

  return (
    <div className="dark bg-slate-950 text-white min-h-screen">

      {/* Header */}

      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 py-8 px-4">

        <div className="max-w-7xl mx-auto">

          <Link href="/audit">

            <Button
              variant="outline"
              className="mb-6"
            >
              ← Back to Audit
            </Button>

          </Link>

          <h1 className="text-5xl font-bold mb-2">
            Your Audit Results
          </h1>

          <p className="text-gray-400 text-lg">
            Here's what we found and how
            you can save
          </p>

        </div>

      </div>

      {/* Main Content */}

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Metrics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Monthly Savings */}

          <Card className="bg-gradient-to-br from-green-900/30 to-green-950/20 border-green-800/50 overflow-hidden">

            <CardContent className="p-6">

              <div className="flex items-start justify-between mb-4">

                <div>

                  <p className="text-gray-400 text-sm mb-2">
                    Monthly Savings
                  </p>

                  <p className="text-4xl font-bold text-green-400">
                    $
                    {result.totalSavings.toLocaleString()}
                  </p>

                </div>

                <DollarSign className="w-12 h-12 text-green-500 opacity-20" />

              </div>

              <p className="text-sm text-gray-400">

                Annual:
                {" "}
                $
                {result.annualSavings.toLocaleString()}

              </p>

            </CardContent>

          </Card>

          {/* Savings Percentage */}

          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-950/20 border-blue-800/50 overflow-hidden">

            <CardContent className="p-6">

              <div className="flex items-start justify-between mb-4">

                <div>

                  <p className="text-gray-400 text-sm mb-2">
                    Potential Savings
                  </p>

                  <p className="text-4xl font-bold text-blue-400">
                    {result.savingsPercentage}%
                  </p>

                </div>

                <TrendingDown className="w-12 h-12 text-blue-500 opacity-20" />

              </div>

              <p className="text-sm text-gray-400">
                Of your current spending
              </p>

            </CardContent>

          </Card>

          {/* Tools Analyzed */}

          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-950/20 border-purple-800/50 overflow-hidden">

            <CardContent className="p-6">

              <div className="flex items-start justify-between mb-4">

                <div>

                  <p className="text-gray-400 text-sm mb-2">
                    Tools Analyzed
                  </p>

                  <p className="text-4xl font-bold text-purple-400">
                    {resultRows.length}
                  </p>

                </div>

                <Target className="w-12 h-12 text-purple-500 opacity-20" />

              </div>

              <p className="text-sm text-gray-400">
                With optimization potential
              </p>

            </CardContent>

          </Card>

        </div>

        {/* AI Summary */}

        <Card className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 border-blue-800/50 mb-12 overflow-hidden relative">

          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

          <CardContent className="p-8 relative z-10">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">

              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-600/20 border border-blue-500/50">

                <Brain className="w-6 h-6 text-blue-300" />

              </div>

              <div>

                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  AI Executive Summary
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Powered by advanced optimization AI
                </p>

              </div>

              <Sparkles className="w-5 h-5 text-yellow-400 ml-auto animate-pulse" />

            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-blue-500/50 via-blue-500/30 to-transparent mb-6"></div>

            {/* Summary Content */}
            <div className="prose prose-invert max-w-none">

              <p className="text-gray-200 leading-8 text-base whitespace-pre-line font-light">

                {result.aiSummary ||
                  `Your AI stack has approximately $${result.totalSavings}/month in potential savings opportunities. Review the specific recommendations below to unlock these savings.`}

              </p>

            </div>

            {/* Footer highlight */}
            <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">

              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />

              <p className="text-sm text-gray-300">

                <span className="text-blue-300 font-semibold">Action Item:</span> Review the detailed recommendations below and prioritize changes with the highest impact.

              </p>

            </div>

          </CardContent>

        </Card>

        {/* Share URL */}

        <Card className="bg-gradient-to-r from-indigo-900/30 to-slate-900 border-indigo-800/40 mb-12">

          <CardContent className="p-6">

            <div className="flex items-center gap-3 mb-4">

              <div className="p-2 rounded-full bg-indigo-500/20">

                <Share2 className="w-5 h-5 text-indigo-400" />

              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Share Audit Results
                </h3>

                <p className="text-sm text-gray-400">
                  Public shareable audit link
                </p>

              </div>

            </div>

            <div className="flex flex-col md:flex-row gap-3">

              <div className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-gray-300 overflow-hidden">

                {shareUrl}

              </div>

              <Button
                onClick={copyShareUrl}
                className="min-w-[140px]"
              >

                <Copy className="w-4 h-4 mr-2" />

                {copied
                  ? "Copied!"
                  : "Copy Link"}

              </Button>

            </div>

          </CardContent>

        </Card>

        {/* Recommendations */}

        <div className="mb-12">

          <h2 className="text-3xl font-bold mb-6">
            Recommendations
          </h2>

          <div className="space-y-4">

            {resultRows.map(
              (r, i) => (

                <Card
                  key={i}
                  className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors overflow-hidden"
                >

                  <CardContent className="p-6">

                    <div className="flex items-start justify-between mb-4">

                      <div className="flex-1">

                        <div className="flex items-center gap-3 mb-2">

                          <CheckCircle2 className="w-5 h-5 text-green-400" />

                          <h3 className="text-xl font-semibold capitalize">
                            {r.tool}
                          </h3>

                          <Badge>
                            {r.plan}
                          </Badge>

                        </div>

                        <p className="text-gray-400 mb-4">
                          {r.recommendation}
                        </p>

                        <p className="text-sm text-green-400 font-semibold">

                          Monthly Savings:
                          {" "}
                          $
                          {r.savings.toLocaleString()}

                        </p>

                      </div>

                      <div className="text-right ml-4">

                        <p className="text-3xl font-bold text-green-400">
                          ${r.savings}
                        </p>

                        <p className="text-xs text-gray-400">
                          per month
                        </p>

                      </div>

                    </div>

                    {/* Progress Bar */}

                    <div className="mt-4">

                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-700"
                          style={{
                            width: `${(r.savings / maxSavings) * 100}%`,
                          }}
                        ></div>

                      </div>

                    </div>

                  </CardContent>

                </Card>
              )
            )}

          </div>

        </div>

        {/* CTA */}

        <div className="text-center space-y-4 mb-12">

          <h3 className="text-2xl font-bold">
            Ready to optimize?
          </h3>

          <p className="text-gray-400 mb-6">
            Reduce unnecessary AI spending
            while improving workflow efficiency
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link href="/audit">

              <Button
                variant="outline"
                size="lg"
              >
                Run Another Audit
              </Button>

            </Link>

            <Link href="/">

              <Button size="lg">

                Back to Home

                <ArrowRight className="ml-2 h-4 w-4" />

              </Button>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}