"use client";

import React from "react";

import Link from "next/link";

import { Button } from "./ui/button";

import dynamic from "next/dynamic";

import {
  BarChart3,
  DollarSign,
} from "lucide-react";

const HeaderDropdown = dynamic(
  () => import("./HeaderDropdown"),
  {
    ssr: false,
  }
);

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-50">
       <div></div>
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">

            <DollarSign className="w-5 h-5 text-white" />

          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              CreditFunk
            </h1>

            <p className="text-xs text-slate-400">
              Optimize AI Tool Costs
            </p>
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Run Audit */}
          <Link href="/audit">

            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">

              <BarChart3 className="h-4 w-4" />

              <span className="hidden md:block">
                Run Audit
              </span>

            </Button>

          </Link>

          {/* Dropdown */}
          <HeaderDropdown />

          {/* Extra Nav */}
          <div className="hidden md:flex items-center gap-2">

            <Link href="/about">

              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                About
              </Button>

            </Link>

            <Link href="/contact">

              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                Contact
              </Button>

            </Link>

          </div>

        </div>

      </nav>

    </header>
  );
};

export default Header;