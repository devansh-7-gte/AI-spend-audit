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

  useEffect(() => {

    if (!id) {
      return;
    }

    async function fetchAudit() {

      try {

        setLoading(true);

        // Check localStorage first (for local IDs)
        const cached = localStorage.getItem(
          `audit_${id}`
        );
        
        if (cached) {
          try {
            const result = JSON.parse(cached);
            setData({ audit: { result } });
            setLoading(false);
            return;
          } catch (parseErr) {
            console.warn('Failed to parse cached audit:', parseErr.message);
          }
        }

        // Fetch from API if not in cache
        const res = await fetch(
          `/api/share/${id}`
        );

        const contentType =
          res.headers.get("content-type") ||
          "";

        const json =
          contentType.includes(
            "application/json"
          )
            ? await res.json()
            : (() => {
                throw new Error(
                  `Non-JSON response (content-type: ${contentType})`
                );
              })();

        if (!res.ok) {

          throw new Error(
            json.error ||
            "Failed to fetch audit"
          );
        }

        setData(json);

      } catch (err) {

        setError(err.message);
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