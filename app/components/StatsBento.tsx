// app/components/StatsBento.tsx

"use client";

import { BentoCard } from "./BentoCard";
import { useEffect, useState, useCallback } from "react";
import { siteMetadata } from "../data/siteMetadata";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
}

const COLORS = {
  success: "#7e3ced", 
  failure: "#64758b",
  background: "#f3f4f6", 
};

export function StatsBento() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeetCodeStats = useCallback(async () => {
    try {
      const username = siteMetadata.social.leetcodeUsername;
      console.log("Username:", username);

      if (!username) throw new Error("LeetCode username not found");

      const response = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${username}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(
          `Failed to fetch LeetCode stats: ${response.status} ${errorText}`,
        );
      }

      const data = await response.json();
      console.log("Received data:", data);

      if (!data.status || data.status === "error") {
        throw new Error(data.message || "Failed to fetch LeetCode stats");
      }

      setStats({
        totalSolved: data.totalSolved,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved,
        acceptanceRate: data.acceptanceRate,
        ranking: data.ranking,
      });
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError(
        err instanceof Error
          ? `Failed to fetch LeetCode stats: ${err.message}`
          : "Failed to fetch LeetCode stats",
      );
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeetCodeStats();
  }, [fetchLeetCodeStats]);

  const pieData = stats
    ? [
        { name: "Accepted", value: stats.acceptanceRate },
        { name: "Failed", value: 100 - stats.acceptanceRate },
      ]
    : [];

  return (
    <BentoCard height="h-[220px]" linkTo={siteMetadata.social.leetcode}>
      <div className="flex h-full flex-col">
        <h2 className="mb-2 font-medium">
          LeetCode Stats
          {loading && (
            <span className="ml-2 text-xs uppercase text-text-tertiary">
              loading...
            </span>
          )}
        </h2>

        {error ? (
          <div className="text-sm text-red-500">
            {error}
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                fetchLeetCodeStats();
              }}
              className="ml-2 text-xs underline hover:text-red-600"
            >
              Retry
            </button>
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-text-tertiary">Total Solved:</span>{" "}
                <span className="font-medium">{stats.totalSolved}</span>
              </div>
              <div className="text-sm">
                <span className="text-text-tertiary">Easy:</span>{" "}
                <span className="font-medium text-7e3ced">
                  {stats.easySolved}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-text-tertiary">Medium:</span>{" "}
                <span className="font-medium text-7e3ced">
                  {stats.mediumSolved}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-text-tertiary">Hard:</span>{" "}
                <span className="font-medium text-7e3ced">
                  {stats.hardSolved}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-text-tertiary">Ranking:</span>{" "}
                <span className="font-medium">
                  #{stats.ranking.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-text-tertiary">Acceptance Rate:</span>
                <div className="relative mt-2 h-24 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                        animationDuration={1000}
                        animationBegin={0}
                      >
                        <Cell fill={COLORS.success} />
                        <Cell fill={COLORS.failure} />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {stats.acceptanceRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </BentoCard>
  );
}
