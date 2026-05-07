"use client";

import { useEffect }
from "react";

import { supabase }
from "@/lib/supabase";

export default function TestPage() {

  useEffect(() => {

    async function testConnection() {

      const { data, error } =
        await supabase
          .from("audits")
          .select("*");

      console.log("DATA:", data);

      console.log("ERROR:", error);
    }

    testConnection();

  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="text-center">

        <h1 className="text-4xl font-bold">
          Supabase Test
        </h1>

        <p className="mt-4 text-gray-400">
          Check console for results
        </p>

      </div>

    </div>
  );
}