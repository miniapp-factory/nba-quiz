"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type LeaderboardEntry = {
  name: string;
  score: number;
};

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("nba-quiz-leaderboard");
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  const saveEntry = (name: string, score: number) => {
    const newEntry = { name, score };
    const updated = [...entries, newEntry].sort((a, b) => b.score - a.score).slice(0, 10);
    setEntries(updated);
    localStorage.setItem("nba-quiz-leaderboard", JSON.stringify(updated));
  };

  return (
    <Card className="w-full max-w-md mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Leaderboard</h2>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {entries.map((e, i) => (
            <li key={i} className="flex justify-between">
              <span>{e.name}</span>
              <span>{e.score}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
