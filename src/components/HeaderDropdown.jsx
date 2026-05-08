"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronDown,
  Sparkles,
  Brain,
  Share2,
  BarChart3,
} from "lucide-react";

export default function HeaderDropdown() {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <Button
          variant="outline"
          className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />

          <span className="hidden md:block">
            Features
          </span>

          <ChevronDown className="h-4 w-4" />
        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-slate-900 border-slate-800 text-white"
      >

        <DropdownMenuItem asChild>
          <Link
            href="/audit"
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            AI Cost Audit
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/results"
            className="flex items-center gap-2"
          >
            <Brain className="h-4 w-4" />
            AI Recommendations
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/share/demo"
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Shareable Reports
          </Link>
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}