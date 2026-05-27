import { NextResponse }
from "next/server";

import { supabase }
from "@/lib/supabase";

export async function GET(
  req,
  { params }
) {

  try {

    // Next.js 15 fix
    const { id } =
      await params;

    console.log('[SHARE_REQUEST]', { id });

    // Handle local IDs (from unsaved audits)
    if (id.startsWith('local-')) {
      console.log('[SHARE_LOCAL_ID]', 'Cannot retrieve unsaved audit');
      return NextResponse.json(
        {
          error: "Audit not found - use the audit data from the POST response",
        },
        {
          status: 404,
        }
      );
    }

    // Query database with timeout
    const queryPromise = supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database query timeout')), 5000)
    );

    let data, error;
    try {
      ({ data, error } = await Promise.race([queryPromise, timeoutPromise]));
    } catch (timeoutErr) {
      console.warn('[SHARE_TIMEOUT]', timeoutErr.message);
      return NextResponse.json(
        {
          error: "Database query timeout",
        },
        {
          status: 504,
        }
      );
    }

    if (error || !data) {
      console.warn('[SHARE_NOT_FOUND]', error?.message || 'No data');
      return NextResponse.json(
        {
          error: "Audit not found",
        },
        {
          status: 404,
        }
      );
    }

    console.log('[SHARE_SUCCESS]', { auditId: id });
    return NextResponse.json({
      success: true,
      audit: data,
    });

  } catch (err) {
    console.error('[SHARE_ERROR]', {
      message: err.message,
      stack: err.stack,
    });

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}