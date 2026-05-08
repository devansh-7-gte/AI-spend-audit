import React from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/header";
import HeroSection from "@/components/hero";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background */}
      <div className="grid-background"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-250px] right-[-200px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]"></div>

      <Header />

      <main className="relative z-10">

        {/* Hero */}
        <HeroSection />

        {/* Stats */}
        <section className="py-16 border-y border-slate-800 bg-slate-950/60 backdrop-blur-sm">

          <div className="container mx-auto px-4">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">

              <div>
                <h3 className="text-4xl font-bold text-indigo-400">
                  40%
                </h3>

                <p className="text-white mt-2">
                  Avg Savings
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-purple-400">
                  1K+
                </h3>

                <p className="text-white mt-2">
                  Audits Generated
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-cyan-400">
                  95%
                </h3>

                <p className="text-white mt-2">
                  Optimization Accuracy
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-emerald-400">
                  24/7
                </h3>

                <p className="text-white mt-2">
                  AI Analysis
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* Features */}
        <section className="py-24 relative">

          <div className="container mx-auto px-4">

            <div className="max-w-3xl mx-auto text-center mb-16">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-200 text-sm mb-6">

                <Sparkles className="w-4 h-4" />

                AI Powered Insights

              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">

                Cut AI Costs
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Without Losing Productivity
                </span>

              </h2>

              <p className="text-white text-lg leading-8">
                CreditFunk analyzes your AI stack,
                detects overspending, and provides
                actionable recommendations instantly.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {features.map((feature, index) => (

                <Card
                  key={index}
                  className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                >

                  <CardContent className="p-6">

                    <div className="w-14 h-14 rounded-xl bg-white border border-indigo-500/20 flex items-center justify-center mb-6">

                      {feature.icon}

                    </div>

                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {feature.title}
                    </h3>

                    <p className="text-white leading-7">
                      {feature.description}
                    </p>

                  </CardContent>

                </Card>
              ))}

            </div>

          </div>

        </section>

        {/* How It Works */}
        <section className="py-24 bg-slate-900/40 border-y border-slate-800">

          <div className="container mx-auto px-4">

            <div className="max-w-3xl mx-auto text-center mb-20">

              <h2 className="text-4xl font-bold mb-6 text-white">
                How It Works
              </h2>

              <p className="text-white text-lg">
                Run a complete AI spending audit
                in under 2 minutes.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              {howItWorks.map((item, index) => (

                <div
                  key={index}
                  className="relative bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center backdrop-blur-sm"
                >

                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">

                    {index + 1}

                  </div>

                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white border border-indigo-500/20 flex items-center justify-center mb-6 mt-4">

                    {item.icon}

                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {item.title}
                  </h3>

                  <p className="text-white leading-7">
                    {item.description}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* Testimonials */}
        <section className="py-24">

          <div className="container mx-auto px-4">

            <div className="text-center mb-16">

              <h2 className="text-4xl font-bold mb-4 text-white">
                Teams Saving Thousands
              </h2>

              <p className="text-white text-lg">
                Real companies optimizing AI operations
                with CreditFunk.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {testimonial.map((item, index) => (

                <Card
                  key={index}
                  className="bg-slate-900/70 border border-slate-800"
                >

                  <CardContent className="p-6">

                    <div className="flex items-center gap-4 mb-6">

                      <Image
                        src={item.image}
                        alt={item.author}
                        width={48}
                        height={48}
                        className="rounded-full border border-slate-700"
                      />

                      <div>

                        <h4 className="font-semibold text-white">
                          {item.author}
                        </h4>

                        <p className="text-sm text-white">
                          {item.role}
                        </p>

                      </div>

                    </div>

                    <p className="text-white italic leading-7">
                      “{item.quote}”
                    </p>

                  </CardContent>

                </Card>
              ))}

            </div>

          </div>

        </section>

        {/* FAQ */}
        <section className="py-24 bg-slate-900/40 border-y border-slate-800">

          <div className="container mx-auto px-4">

            <div className="max-w-3xl mx-auto text-center mb-14">

              <h2 className="text-4xl font-bold mb-4 text-white">
                Frequently Asked Questions
              </h2>

              <p className="text-white text-lg">
                Everything you need to know.
              </p>

            </div>

            <div className="max-w-4xl mx-auto">

              <Accordion
                type="single"
                collapsible
                className="space-y-4"
              >

                {faqs.map((faq, index) => (

                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-slate-800 rounded-xl px-6 bg-slate-900/70"
                  >

                    <AccordionTrigger className="text-left text-lg text-white hover:text-indigo-300 transition-colors">

                      {faq.question}

                    </AccordionTrigger>

                    <AccordionContent className="text-white leading-7">

                      {faq.answer}

                    </AccordionContent>

                  </AccordionItem>
                ))}

              </Accordion>

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="py-28 relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">

            <div className="max-w-4xl mx-auto text-center border border-slate-800 bg-slate-900/70 backdrop-blur-xl rounded-3xl p-12">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-sm mb-6">

                <Zap className="w-4 h-4" />

                AI Spend Optimization

              </div>

              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">

                Stop Overspending
                <br />

                On AI Tools

              </h2>

              <p className="text-white text-lg max-w-2xl mx-auto mb-10 leading-8">

                Discover hidden waste, optimize subscriptions,
                and reduce operational AI costs with
                intelligent recommendations.

              </p>

              <Link href="/audit">

                <Button
                  size="lg"
                  className="h-14 px-10 text-lg bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                >

                  Run Free Audit

                  <ArrowRight className="ml-2 h-5 w-5" />

                </Button>

              </Link>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}