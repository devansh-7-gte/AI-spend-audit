import { NextResponse }
from "next/server";

import { runAudit }
from "@/lib/audit-engine";

import { supabase }
from "@/lib/supabase";

export async function POST(req) {

  try {

    const body =
      await req.json();

    console.log(
      "BODY:",
      body
    );

    // Validate input
    if (
      !body ||
      !Array.isArray(body.tools)
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid audit payload",
        },
        {
          status: 400,
        }
      );
    }

    // Run audit
    const auditResult =
      runAudit(body);

    // Save to DB
    const {
      data,
      error,
    } = await supabase
      .from("audits")
      .insert([
        {
          input: body,

          result: auditResult,
        },
      ])
      .select()
      .single();

    if (error) {

      console.error(error);

      return NextResponse.json(
        {
          error:
            "Failed to save audit",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({

      success: true,

      auditId: data.id,
    });

  } catch (err) {

    console.error(
      "Error running audit:",
      err
    );

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}