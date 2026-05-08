"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Hero Content */}
      <div className="relative z-10 text-center space-y-8 px-4 md:px-6 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-title">
            Audit Your AI Spending
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover how much you're actually spending on AI tools and get
            actionable insights to reduce costs
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/audit">
            <Button size="lg" variant="default"  className="px-8 bg-violet-900">
              Start Free Audit <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="px-8 text-black">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-8 text-white border-t border-muted">
          <div>
            <p className="text-3xl text-white font-bold text-primary">10K+</p>
            <p className="text-sm text-white text-muted-foreground">Teams Audited</p>
          </div>
          <div>
            <p className="text-3xl text-white font-bold text-primary">$50K+</p>
            <p className="text-sm text-white text-muted-foreground">Saved</p>
          </div>
          <div>
            <p className="text-3xl text-white font-bold text-primary">30%</p>
            <p className="text-sm text-white text-muted-foreground">Avg Savings</p>
          </div>
        </div>
      </div>
    </section>
  );
}