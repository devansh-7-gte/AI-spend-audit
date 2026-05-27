import { NextResponse }
from "next/server";

import { runAudit }
from "@/lib/audit-engine";

import { supabase }
from "@/lib/supabase";

import { sendAuditConfirmationEmail }
from "@/lib/email-service";

export async function POST(req) {

  console.log('[AUDIT_START]', new Date().toISOString());

  try {

    const body =
      await req.json();

    // Validate input
    if (
      !body ||
      !Array.isArray(body.tools) ||
      !body.email
    ) {
      console.log('[AUDIT_VALIDATION_FAILED]', 'Missing required fields');
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

    console.log('[AUDIT_VALIDATED]', { toolCount: body.tools.length, email: body.email });

    // Run audit (should not throw, but catch just in case)
    let auditResult;
    try {
      auditResult = await runAudit(body);
      console.log('[AUDIT_COMPLETE]', { totalSavings: auditResult.totalSavings });
    } catch (auditErr) {
      console.error('[AUDIT_GENERATION_ERROR]', auditErr.message, auditErr.stack);
      // Return partial results with error
      return NextResponse.json({
        success: false,
        error: 'Audit generation failed',
        message: auditErr.message,
      }, { status: 500 });
    }

    // Save audit to DB (optional - don't fail if it errors)
    let auditId = null;
    try {
      console.log('[DB_SAVE_START]', 'Saving audit to database');
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
        console.warn('[DB_ERROR]', 'Failed to save audit:', auditError.message);
      } else {
        auditId = auditData?.id;
        console.log('[DB_SAVE_SUCCESS]', { auditId });
      }
    } catch (dbErr) {
      console.warn('[DB_EXCEPTION]', 'Audit insert exception:', dbErr.message);
    }

    // Save lead to DB (optional - don't fail if it errors)
    try {
      if (auditId) {
        console.log('[DB_SAVE_LEAD_START]', 'Saving lead to database');
        const { error: leadError } = await supabase
          .from("leads")
          .insert([
            {
              email: body.email,
              company_name: body.companyName || null,
              role: body.role || null,
              team_size: body.teamSize || null,
              audit_id: auditId,
              total_savings: auditResult.totalSavings,
              annual_savings: auditResult.annualSavings,
            },
          ]);

        if (leadError) {
          console.warn('[DB_LEAD_ERROR]', 'Failed to save lead:', leadError.message);
        } else {
          console.log('[DB_LEAD_SUCCESS]');
        }
      }
    } catch (dbErr) {
      console.warn('[DB_LEAD_EXCEPTION]', 'Lead insert exception:', dbErr.message);
    }

    // Send confirmation email (optional - don't fail if it errors)
    try {
      console.log('[EMAIL_SEND_START]', 'Sending confirmation email');
      await sendAuditConfirmationEmail(
        body.email,
        {
          companyName: body.companyName,
          role: body.role,
        },
        auditResult.totalSavings
      );
      console.log('[EMAIL_SEND_SUCCESS]');
    } catch (emailErr) {
      console.warn('[EMAIL_ERROR]', 'Failed to send email:', emailErr.message);
    }

    // Return success with audit results (even if DB/email failed)
    console.log('[AUDIT_RESPONSE_SUCCESS]');
    return NextResponse.json({
      success: true,
      auditId: auditId || 'local-' + Date.now(),
      results: auditResult,
    });

  } catch (err) {
    console.error('[AUDIT_FATAL_ERROR]', {
      message: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      {
        error: err.message || "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}