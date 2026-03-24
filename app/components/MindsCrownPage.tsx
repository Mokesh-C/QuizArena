"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MindsCrownLoadingScreen from "./MindsCrownLoadingScreen";
import MindsCrownLeaderboard from "./MindsCrownLeaderboard";

interface TeamRow {
  teamId: string;
  teamName: string;
  totalScore: number;
  rank: number;
}

export default function MindsCrownPage() {
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
    return <MindsCrownLoadingScreen />;
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-8 px-2 relative bg-[#050505] overflow-hidden text-[#f4ecd8]">
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/minds.png"
          alt="Minds Crown Background"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-black/30 to-black/45" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,140,66,0.08),transparent_55%)]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center px-4 mb-8">
        <div className="flex-1 flex justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center tracking-tight drop-shadow-lg lg:hidden">
            <span className="block text-[#FF8C42]">Minds Crown</span>
            <span className="block text-[#f4ecd8]/90">Leaderboard</span>
          </h1>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-end justify-end px-4 mb-2">
        <div className="flex flex-col items-end w-32">
          <button
            onClick={fetchTeams}
            disabled={refreshing}
            className={`bg-[#FF8C42] hover:bg-[#ff9f66] text-[#050505] font-bold py-2 px-6 rounded-lg shadow-[0_0_25px_rgba(255,140,66,0.22)] transition-colors duration-150 ${
              refreshing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-7xl mx-auto items-center justify-center gap-4">
        <div className="flex-1 flex justify-center">
          {error ? <div className="text-[#ff416c] font-bold">{error}</div> : <MindsCrownLeaderboard teams={teams || []} />}
        </div>
      </div>

      <footer className="relative z-10 w-full max-w-4xl mx-auto mt-8 mb-4 px-4 flex flex-col items-center">
        <div className="text-2xl font-extrabold text-center text-[#FF8C42] mb-4 tracking-wide">EVENT COORDINATORS</div>
        <div className="flex flex-col sm:flex-row gap-6 w-full items-center justify-center">
          <div className="flex-1 max-w-md bg-[#0b0b0b]/95 text-[#f4ecd8] rounded-none shadow-[0_0_30px_rgba(255,140,66,0.12)] px-8 py-7 flex flex-col items-start border border-[#FF8C42]/45">
            <div className="w-full text-left font-bold text-2xl tracking-[0.16em] text-[#FF8C42] mb-4">MANISHANKAR V</div>
          </div>

          <div className="flex-1 max-w-md bg-[#0b0b0b]/95 text-[#f4ecd8] rounded-none shadow-[0_0_30px_rgba(161,196,253,0.12)] px-8 py-7 flex flex-col items-start border border-[#a1c4fd]/35">
            <div className="w-full text-left font-bold text-2xl tracking-[0.16em] text-[#f4ecd8] mb-4">PRAVEEN V</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
