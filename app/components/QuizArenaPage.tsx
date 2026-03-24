"use client";

import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
import LoadingScreen from "./LoadingScreen";

interface TeamRow {
  teamId: string;
  teamName: string;
  totalScore: number;
  rank: number;
}

export default function QuizArenaPage() {
  const [teams, setTeams] = useState<TeamRow[] | null>(null);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  async function fetchTeams() {
    setError("");
    setRefreshing(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_SHEETDB_API!);
      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      const parsedTeams: Array<Omit<TeamRow, "rank">> = data.map((row: Record<string, unknown>) => {
        const teamId =
          String(row["Team"] ?? row["team"] ?? row["Team Id"] ?? row["team id"] ?? row["teamId"] ?? "");
        const teamName =
          String(row["Team Name"] ?? row["team name"] ?? row["teamName"] ?? row["name"] ?? "");

        let totalScore = 0;
        for (let i = 1; i <= 15; i++) {
          const val = row[`s${i}`];
          const num = typeof val === "string" && val.trim() !== "" ? Number(val) : Number(val ?? 0);
          totalScore += Number.isNaN(num) ? 0 : num;
        }

        return { teamId, teamName, totalScore };
      });

      parsedTeams.sort((a, b) => b.totalScore - a.totalScore);
      setTeams(parsedTeams.map((team, index) => ({ ...team, rank: index + 1 })));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  if (!teams && !error) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-8 px-2 relative bg-gradient-to-b from-black/10 to-amber-900/50 overflow-hidden">
      <div className="absolute inset-0 -z-10 w-full h-full">
        <video
          src="bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 pointer-events-none" />
      </div>

      <div className="w-full max-w-7xl mx-auto flex items-center justify-center px-4 mb-8">
        <div className="flex justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center tracking-tight drop-shadow-lg lg:hidden">
            <span className="block text-amber-900/60">Quiz Arena</span>
            <span className="block text-amber-900/60">Leaderboard</span>
          </h1>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto flex items-end justify-end px-4 mb-2">
        <div className="flex flex-col items-end w-32">
          <button
            onClick={fetchTeams}
            disabled={refreshing}
            className={`bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-colors duration-150 ${
              refreshing ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="flex w-full max-w-7xl mx-auto items-center justify-center gap-4">
        <div className="flex-1 flex justify-center">
          {error ? <div className="text-red-600 font-bold">{error}</div> : <Leaderboard teams={teams || []} />}
        </div>
      </div>

      <footer className="w-full max-w-4xl mx-auto mt-8 mb-4 px-4 flex flex-col items-center">
        <div className="text-2xl font-extrabold text-center text-amber-400 mb-4 tracking-wide">EVENT COORDINATORS</div>
        <div className="flex flex-col sm:flex-row gap-6 w-full items-center justify-center">
          <div className="flex-1 max-w-md bg-[#7c4913cd] text-yellow-200 rounded-lg shadow-lg px-6 py-4 flex flex-col items-center border-4 border-yellow-700 relative ticket-edge">
            <div className="w-full text-center font-bold text-lg tracking-wide mb-2">MANISHANKAR V</div>
            <div className="w-full text-center font-bold text-lg tracking-wide">KARTHIKEYAN R</div>
          </div>

          <div className="flex-1 max-w-md bg-[#7c4913cd] text-yellow-200 rounded-lg shadow-lg px-6 py-4 flex flex-col items-center border-4 border-yellow-700 relative ticket-edge">
            <div className="w-full text-center font-bold text-lg tracking-wide mb-2 border-b border-yellow-400 pb-1">QUIZ MASTER</div>
            <div className="w-full text-center font-bold text-lg tracking-wide">KALAIVANAN R</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
