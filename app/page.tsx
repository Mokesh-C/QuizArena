"use client";

import { useEffect, useState } from "react";
import Leaderboard from "./components/Leaderboard";
import LoadingScreen from "./components/LoadingScreen";
import Image from "next/image";


export default function Home() {
  const [teams, setTeams] = useState<any[] | null>(null);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  async function fetchTeams() {
    setError("");
    setRefreshing(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_SHEETDB_API!);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      const teams = data.map((row: any) => {
        const teamId = row["Team Id"] || row["team id"] || row["teamId"] || row["id"] || "";
        const teamName = row["Team Name"] || row["team name"] || row["teamName"] || row["name"] || "";
        let totalScore = 0;
        for (let i = 1; i <= 15; i++) {
          const val = row[`s${i}`];
          const num = typeof val === "string" && val.trim() !== "" ? Number(val) : 0;
          totalScore += isNaN(num) ? 0 : num;
        }
        return { teamId, teamName, totalScore };
      });
      teams.sort((a: any, b: any) => b.totalScore - a.totalScore);
      setTeams(teams.map((t: any, i: number) => ({ ...t, rank: i + 1 })));
    } catch (e: any) {
      setError(e.message || "Unknown error");
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
      {/* Background video with gradient overlay */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <video
          src="bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0  pointer-events-none" />
      </div>
      {/* Top bar: sponsors left/right, title center */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 mb-8">
        {/* Left sponsor */}
        <div className="hidden md:flex flex-col items-start w-32">
          <Image src="/remax.jpg" alt="Sponsor" width={120} height={120} className="object-contain rounded-md" />
        </div>
        {/* Center title */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center tracking-tight drop-shadow-lg lg:hidden">
            <span className="block text-amber-900/60">Quiz Arena</span>
            <span className="block text-amber-900/60">Leaderboard</span>
          </h1>
        </div>
        {/* Right sponsor */}
        <div className="hidden md:flex flex-col items-end w-32">
          <Image src="/remax.jpg" alt="Sponsor" width={120} height={120} className="object-contain rounded-md" />
        </div>
      </div>
      {/* Manual Refresh Button below right sponsor */}
      <div className="w-full max-w-7xl mx-auto flex items-end justify-end px-4 mb-2">
        <div className="hidden md:flex flex-col items-end w-32" style={{ visibility: 'hidden' }}>
          {/* Placeholder for left alignment */}
        </div>
        <div className="flex-1" />
        <div className="flex flex-col items-end w-32">
          <button
            onClick={fetchTeams}
            disabled={refreshing}
            className={`bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-6 rounded-lg shadow transition-colors duration-150 ${refreshing ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
      {/* Leaderboard centered below sponsors */}
      <div className="flex w-full max-w-7xl mx-auto items-center justify-center gap-4">
        <div className="flex-1 flex justify-center">
          {error ? (
            <div className="text-red-600 font-bold">{error}</div>
          ) : (
            <Leaderboard teams={teams || []} />
          )}
        </div>
      </div>
      {/* Footer: Coordinators and Quiz Master */}
      <footer className="w-full max-w-4xl mx-auto mt-8 mb-4 px-4 flex flex-col items-center">
        <div className="text-2xl font-extrabold text-center text-amber-400 mb-4 tracking-wide">EVENT COORDINATORS</div>
        <div className="flex flex-col sm:flex-row gap-6 w-full items-center justify-center">
          {/* Coordinators Ticket */}
          <div className="flex-1 max-w-md bg-[#7c4913cd]  text-yellow-200 rounded-lg shadow-lg px-6 py-4 flex flex-col items-center border-4 border-yellow-700 relative ticket-edge">
            <div className="w-full text-center font-bold text-lg tracking-wide mb-2">MANISHANKAR V</div>
            <div className="w-full text-center font-bold text-lg tracking-wide">KARTHIKEYAN R</div>
          </div>
          {/* Quiz Master Ticket */}
          <div className="flex-1 max-w-md bg-[#7c4913cd] text-yellow-200 rounded-lg shadow-lg px-6 py-4 flex flex-col items-center border-4 border-yellow-700 relative ticket-edge">
            <div className="w-full text-center font-bold text-lg tracking-wide mb-2 border-b border-yellow-400 pb-1">QUIZ MASTER</div>
            <div className="w-full text-center font-bold text-lg tracking-wide">KALAIVANAN R</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
