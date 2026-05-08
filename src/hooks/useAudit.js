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