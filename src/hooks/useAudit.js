"use client";

import {
  useEffect,
  useState,
} from "react";

export function useAudit(id) {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const debugLog = (
    hypothesisId,
    location,
    message,
    data = {},
    runId = "initial"
  ) => {
    // #region agent log
    fetch("http://127.0.0.1:7242/ingest/f99714ff-4044-4b49-bf96-d10723fd352b", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        runId,
        hypothesisId,
        location,
        message,
        data,
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  };

  useEffect(() => {

    if (!id) {
      debugLog(
        "H1",
        "useAudit.js:25",
        "Missing audit id in useAudit",
        { id }
      );
      return;
    }

    async function fetchAudit() {

      try {

        setLoading(true);
        debugLog(
          "H2",
          "useAudit.js:40",
          "Fetching share API",
          { id, endpoint: `/api/share/${id}` }
        );

        const res = await fetch(
          `/api/share/${id}`
        );

        const json =
          await res.json();
        debugLog(
          "H3",
          "useAudit.js:51",
          "Share API response received",
          {
            status: res.status,
            ok: res.ok,
            hasAudit: Boolean(json?.audit),
            hasResult: Boolean(json?.audit?.result),
            resultKeys: json?.audit?.result
              ? Object.keys(json.audit.result)
              : [],
          }
        );

        if (!res.ok) {

          throw new Error(
            json.error ||
            "Failed to fetch audit"
          );
        }

        setData(json);
        debugLog(
          "H4",
          "useAudit.js:74",
          "Audit data stored in state",
          {
            hasResultsArray: Array.isArray(
              json?.audit?.result?.results
            ),
            resultsLength:
              json?.audit?.result?.results
                ?.length ?? null,
          }
        );

      } catch (err) {

        setError(err.message);
        debugLog(
          "H5",
          "useAudit.js:90",
          "Audit fetch failed",
          { error: err?.message || "unknown" }
        );

      } finally {

        setLoading(false);
      }
    }

    fetchAudit();

  }, [id]);

  return {
    data,
    loading,
    error,
  };
}