import { NextResponse }
from "next/server";

import { runAudit }
from "@/lib/audit-engine";

import { supabase }
from "@/lib/supabase";

import { sendAuditConfirmationEmail }
from "@/lib/email-service";

export async function POST(req) {

  try {

    const body =
      await req.json();

    // Validate input
    if (
      !body ||
      !Array.isArray(body.tools) ||
      !body.email
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid audit payload - email is required",
        },
        {
          status: 400,
        }
      );
    }

    // Run audit
    const auditResult =
      await runAudit(body);

    // Save audit to DB
    const {
      data: auditData,
      error: auditError,
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

    if (auditError) {
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

    // Save lead to DB
    const {
      error: leadError,
    } = await supabase
      .from("leads")
      .insert([
        {
          email: body.email,
          company_name: body.companyName || null,
          role: body.role || null,
          team_size: body.teamSize || null,
          audit_id: auditData.id,
          total_savings: auditResult.totalSavings,
          annual_savings: auditResult.annualSavings,
        },
      ]);

    if (leadError) {
      // Log but don't fail the request
    }

    // Send confirmation email
    const emailResult = await sendAuditConfirmationEmail(
      body.email,
      {
        companyName: body.companyName,
        role: body.role,
      },
      auditResult.totalSavings
    );

    if (!emailResult.success) {
      // Log but don't fail the request
    }

    return NextResponse.json({

      success: true,

      auditId: auditData.id,
    });

  } catch (err) {
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