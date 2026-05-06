"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SpendForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formattedData = {
      tools: [
        {
          tool: data.tool,
          plan: data.plan,
          monthlySpend: Number(data.monthlySpend),
          seats: Number(data.seats),
        },
      ],
      teamSize: Number(data.teamSize),
      useCase: data.useCase,
    };

    localStorage.setItem("auditInput", JSON.stringify(formattedData));

    router.push("/results");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">AI Spend Audit</h2>

      <input
        {...register("tool")}
        placeholder="Tool (e.g. chatgpt)"
        className="border p-2 w-full"
      />

      <input
        {...register("plan")}
        placeholder="Plan (e.g. team)"
        className="border p-2 w-full"
      />

      <input
        {...register("monthlySpend")}
        placeholder="Monthly Spend ($)"
        className="border p-2 w-full"
      />

      <input
        {...register("seats")}
        placeholder="Seats"
        className="border p-2 w-full"
      />

      <input
        {...register("teamSize")}
        placeholder="Team Size"
        className="border p-2 w-full"
      />

      <select {...register("useCase")} className="border p-2 w-full">
        <option value="coding">Coding</option>
        <option value="writing">Writing</option>
        <option value="research">Research</option>
        <option value="mixed">Mixed</option>
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">
        Run Audit
      </button>
    </form>
  );
}