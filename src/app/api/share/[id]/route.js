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

    const {
      data,
      error,
    } = await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {

      return NextResponse.json(
        {
          error:
            "Audit not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      audit: data,
    });

  } catch (err) {

    console.error(err);

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