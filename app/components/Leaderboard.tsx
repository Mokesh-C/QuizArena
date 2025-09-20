import React from "react";
// Medal icon import removed

export interface Team {
  "Team Id": string;
  "Team Name": string;
  [key: string]: string | number | undefined;
}

interface LeaderboardProps {
  teams: Array<{
    teamId: string;
    teamName: string;
    totalScore: number;
    rank: number;
  }>;
}

const placeSuffix = (rank: number) => {
  if (rank === 1) return "st";
  if (rank === 2) return "nd";
  if (rank === 3) return "rd";
  return "th";
};

export default function Leaderboard({ teams }: LeaderboardProps) {
  const top3 = teams.slice(0, 3);
  const rest = teams.slice(3);
  return (
    <div className="w-full mx-auto rounded-2xl shadow-2xl p-4 sm:p-8 mt-6 ">
      {/* Podium: mobile - stack vertically, desktop - podium style */}
      <div className="w-full flex flex-col sm:grid sm:grid-cols-3 gap-4 mb-8 items-end justify-center">
        {/* Mobile: stack vertically, center all */}
        <div className="flex flex-col gap-4 w-full sm:hidden">
          {top3.map((team, idx) => {
            // Medal color logic removed
            const rankColor = idx === 0 ? 'text-orange-700' : idx === 1 ? 'text-orange-700' : 'text-orange-700';
            return (
                <div
                  key={team.teamId}
                  className={`mx-auto w-11/12 max-w-xs bg-amber-100/90 rounded-b-lg shadow-xl px-4 py-6 flex flex-col items-center relative overflow-hidden ${idx === 0 ? 'py-8 shadow-2xl' : ''}`}
                >
                  {/* Brown top bar */}
                              <div className="absolute top-0 left-0 w-full flex items-center justify-center" style={{height:'20%', minHeight:'28px', background:'#7c4a13', borderBottomLeftRadius:'1rem', borderBottomRightRadius:'1rem', zIndex:2}}>
                                <span className="text-yellow-200 font-extrabold text-base sm:text-lg tracking-wide drop-shadow-md">
                            Team {team.teamId}
                                </span>
                              </div>
                  {(idx === 0 || idx === 1 || idx === 2) && (
            <div className="flex flex-col items-center w-full relative" style={{zIndex: 3}}>
              <span className={`${idx === 0 ? 'text-6xl' : 'text-5xl'} drop-shadow-lg animate-bounce`}>👑</span>
            </div>
                  )}
                <div className={`flex items-center gap-2 font-extrabold mb-1 ${idx === 0 ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'} ${rankColor}`}>
                  <span className="sr-only">{idx === 0 ? 'Gold' : idx === 1 ? 'Silver' : 'Bronze'} Medal</span>
                  <span>{team.rank}<sup className={idx === 0 ? 'text-lg sm:text-xl' : 'text-base'}>{placeSuffix(team.rank)}</sup></span>
                </div>
                <div className={`font-extrabold text-amber-900 ${idx === 0 ? 'text-3xl sm:text-3xl' : 'text-3xl sm:text-2xl'} mb-1 text-center`}>{team.teamName}</div>
                <div className={`font-extrabold ${idx === 0 ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} text-amber-700 text-center`}>{team.totalScore}</div>
              </div>
            );
          })}
        </div>
        {/* Desktop: podium style */}
        <div className="hidden sm:contents">
          {/* 2nd place - left */}
          <div className="flex justify-center order-2 sm:order-1">
            {top3[1] && (
                  <div className="w-full max-w-xs bg-amber-100/60 rounded-b-lg shadow-xl px-4 py-6 flex flex-col items-center  relative overflow-hidden">
                    {/* Brown top bar */}
                      <div className="absolute top-0 left-0 w-full flex items-center justify-center" style={{height:'18%', minHeight:'28px', background:'#7c4a13', borderBottomLeftRadius:'1rem', borderBottomRightRadius:'1rem', zIndex:2}}>
                        <span className="text-yellow-200 font-extrabold text-base sm:text-lg tracking-wide drop-shadow-md">
                          Team {top3[1].teamId}
                        </span>
                      </div>
                <div className="-mb-2 flex justify-center w-full relative" style={{zIndex: 3}}>
                  <span className="text-5xl drop-shadow-lg animate-bounce">👑</span>
                </div>
                <div className="flex items-center gap-2 font-extrabold text-3xl sm:text-4xl text-orange-700 mb-1">
                  <span>2<sup className="text-lg sm:text-xl">nd</sup></span>
                </div>
                <div className="font-extrabold text-amber-900 text-2xl sm:text-3xl mb-1 text-center">{top3[1].teamName}</div>
                <div className="font-extrabold text-2xl sm:text-3xl text-amber-700 text-center">{top3[1].totalScore}</div>
              </div>
            )}
          </div>
          {/* 1st place - center, higher */}
          <div className="flex justify-center order-1 sm:order-2 sm:relative sm:-top-8">
            {top3[0] && (
                  <div className="w-full max-w-xs bg-amber-100/60 rounded-b-lg shadow-2xl px-4 py-8 flex flex-col items-center  relative overflow-hidden">
                    {/* Brown top bar */}
                      <div className="absolute top-0 left-0 w-full flex items-center justify-center" style={{height:'18%', minHeight:'28px', background:'#7c4a13', borderBottomLeftRadius:'1rem', borderBottomRightRadius:'1rem', zIndex:2}}>
                        <span className="text-yellow-200 font-extrabold text-base sm:text-lg tracking-wide drop-shadow-md">
                          Team {top3[0].teamId}
                        </span>
                      </div>
                <div className="-mb-2 flex justify-center w-full relative" style={{zIndex: 3}}>
                  <span className="text-7xl drop-shadow-lg animate-bounce">👑</span>
                </div>
                <div className="flex items-center gap-2 font-extrabold text-4xl sm:text-5xl text-orange-700 mb-1">
                  <span>1<sup className="text-lg sm:text-xl">st</sup></span>
                </div>
                <div className="font-extrabold text-amber-900 text-2xl sm:text-3xl mb-1 text-center">{top3[0].teamName}</div>
                <div className="font-extrabold text-3xl sm:text-4xl text-amber-700 text-center">{top3[0].totalScore}</div>
              </div>
            )}
          </div>
          {/* 3rd place - right */}
          <div className="flex justify-center order-3 sm:order-3">
            {top3[2] && (
                  <div className="w-full max-w-xs bg-amber-100/60 rounded-b-lg shadow-xl px-4 py-6 flex flex-col items-center relative overflow-hidden">
                    {/* Brown top bar */}
                    <div className="absolute top-0 left-0 w-full flex items-center justify-center" style={{height:'18%', minHeight:'28px', background:'#7c4a13', borderBottomLeftRadius:'1rem', borderBottomRightRadius:'1rem', zIndex:2}}>
                      <span className="text-yellow-200 font-extrabold text-base sm:text-lg tracking-wide drop-shadow-md">
                        Team {top3[2].teamId}
                      </span>
                    </div>
                <div className="-mb-2 flex justify-center w-full relative" style={{zIndex: 3}}>
                  <span className="text-5xl drop-shadow-lg animate-bounce">👑</span>
                </div>
                <div className="flex items-center gap-2 font-extrabold text-3xl sm:text-4xl text-orange-700 mb-1">
                  <span>3<sup className="text-lg sm:text-xl">rd</sup></span>
                </div>
                <div className="font-extrabold text-amber-900 text-2xl sm:text-3xl mb-1 text-center">{top3[2].teamName}</div>
                <div className="font-extrabold text-2xl sm:text-3xl text-amber-700 text-center">{top3[2].totalScore}</div>
              </div>
            )}
          </div>
        </div>
      </div><div className="flex-1 flex justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center tracking-tight drop-shadow-lg hidden lg:block">
            <span className="block text-amber-900/60">Leaderboard</span>
          </h1>
        </div>
      
      {/* Full-width card layout for the rest */}
      <div className="flex flex-col gap-3 mt-14 mb-24 md:mb-60">
        {rest.map((team) => (
          <div
            key={team.teamId}
            className="w-full bg-amber-50/90 rounded-xl shadow-md flex flex-row items-center px-2 sm:px-6 py-3 sm:py-4 border-l-8 border-amber-400"
          >
            {/* Rank column */}
            <div className="w-16 sm:w-24 flex flex-col items-center justify-center">
              <span className="font-extrabold text-xl md:text-3xl text-amber-700">
                {team.rank}
                <sup className="text-xs">{placeSuffix(team.rank)}</sup>
              </span>
            </div>
            {/* Team number column */}
            <div className="w-20 sm:w-32 flex flex-col items-center justify-center">
              <span className="text-sm sm:text-base font-semibold text-amber-800 whitespace-nowrap">Team {team.teamId}</span>
            </div>
            {/* Team name column */}
            <div className="flex-1 flex flex-col items-center justify-center px-1">
              <div className="font-bold text-amber-900 text-base sm:text-lg text-center truncate max-w-full">{team.teamName}</div>
            </div>
            {/* Score column */}
            <div className="w-14 sm:w-20 font-extrabold text-lg sm:text-xl text-amber-700 text-center flex items-center justify-center">
              {team.totalScore}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
