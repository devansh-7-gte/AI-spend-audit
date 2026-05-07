"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { TOOL_CONFIG } from "@/lib/pricing-data";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function SpendForm() {
  const router = useRouter();

  const [tools, setTools] = useState([
    {
      tool: "",
      plan: "",
      monthlySpend: "",
      seats: "",
    },
  ]);

  const [teamSize, setTeamSize] = useState(1);

  const [useCase, setUseCase] =
    useState("coding");

  const [alert, setAlert] = useState(null);

  // Load saved data
  useEffect(() => {
    const saved =
      localStorage.getItem("auditInput");

    if (saved) {
      const parsed = JSON.parse(saved);

      setTools(
        parsed.tools || [
          {
            tool: "",
            plan: "",
            monthlySpend: "",
            seats: "",
          },
        ]
      );

      setTeamSize(
        parsed.teamSize || 1
      );

      setUseCase(
        parsed.useCase || "coding"
      );
    }
  }, []);

  // Save data automatically
  useEffect(() => {
    const data = {
      tools,
      teamSize,
      useCase,
    };

    localStorage.setItem(
      "auditInput",
      JSON.stringify(data)
    );
  }, [tools, teamSize, useCase]);

  const handleToolChange = (
    index,
    field,
    value
  ) => {
    const updated = [...tools];

    updated[index][field] = value;

    // Reset plan if tool changes
    if (field === "tool") {
      updated[index].plan = "";
    }

    setTools(updated);
  };

  const addTool = () => {
    setTools([
      ...tools,
      {
        tool: "",
        plan: "",
        monthlySpend: "",
        seats: "",
      },
    ]);
  };

  const removeTool = (index) => {
    const updated = tools.filter(
      (_, i) => i !== index
    );

    setTools(updated);
  };

  // Validation
  const isFormValid =
    tools.every(
      (t) =>
        t.tool.trim() !== "" &&
        t.plan.trim() !== "" &&
        t.monthlySpend !== "" &&
        t.seats !== ""
    ) &&
    teamSize !== "" &&
    useCase.trim() !== "";

  const handleSubmit = async () => {

  if (!isFormValid) {

    setAlert(
      "Please fill out all fields to run the audit."
    );

    return;
  }

  try {

    setAlert(null);

    const payload = {
      tools,
      teamSize,
      useCase,
    };

    const res = await fetch(
      "/api/audit",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          payload
        ),
      }
    );

    const data =
      await res.json();

    if (!res.ok) {

      throw new Error(
        data.error ||
        "Failed to run audit"
      );
    }

    router.push(
      `/results?id=${data.auditId}`
    );

  } catch (err) {

    setAlert(
      err.message
    );
  }
};

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6 space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold">
            AI Spend Audit
          </h2>

          <p className="text-muted-foreground mt-2">
            Analyze your AI tooling costs and
            identify savings opportunities.
          </p>
        </div>

        {/* Alert */}
        {alert && (
          <Alert className="border-red-500 text-red-600">
            {alert}
          </Alert>
        )}

        {/* Tools */}
        {tools.map((t, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                Tool #{i + 1}
              </h3>

              {tools.length > 1 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    removeTool(i)
                  }
                >
                  Remove
                </Button>
              )}
            </div>

            {/* Tool Select */}
            <Select
              value={t.tool}
              onValueChange={(value) =>
                handleToolChange(
                  i,
                  "tool",
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Tool" />
              </SelectTrigger>

              <SelectContent>
                {Object.entries(
                  TOOL_CONFIG
                ).map(([key, value]) => (
                  <SelectItem
                    key={key}
                    value={key}
                  >
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Plan Select */}
            <Select
              value={t.plan}
              onValueChange={(value) =>
                handleToolChange(
                  i,
                  "plan",
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>

              <SelectContent>
                {TOOL_CONFIG[
                  t.tool
                ]?.plans?.map((plan) => (
                  <SelectItem
                    key={plan}
                    value={plan}
                  >
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Monthly Spend */}
            <Input
              type="number"
              placeholder="Monthly Spend ($)"
              value={t.monthlySpend}
              onChange={(e) =>
                handleToolChange(
                  i,
                  "monthlySpend",
                  e.target.value
                )
              }
            />

            {/* Seats */}
            <Input
              type="number"
              placeholder="Seats"
              value={t.seats}
              onChange={(e) =>
                handleToolChange(
                  i,
                  "seats",
                  e.target.value
                )
              }
            />
          </div>
        ))}

        {/* Add Tool */}
        <Button
          variant="secondary"
          onClick={addTool}
          className="w-full"
        >
          + Add Another Tool
        </Button>

        {/* Team Size */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Team Size
          </label>

          <Input
            type="number"
            value={teamSize}
            onChange={(e) =>
              setTeamSize(e.target.value)
            }
          />
        </div>

        {/* Use Case */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Primary Use Case
          </label>

          <Select
            value={useCase}
            onValueChange={setUseCase}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="coding">
                Coding
              </SelectItem>

              <SelectItem value="writing">
                Writing
              </SelectItem>

              <SelectItem value="research">
                Research
              </SelectItem>

              <SelectItem value="mixed">
                Mixed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          className="w-full"
        >
          Run Audit
        </Button>

      </CardContent>
    </Card>
  );
}