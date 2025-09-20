import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-full">
      {/* Background video */}
      <video
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-amber-900/30 -z-10" />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-amber-100 drop-shadow-lg mb-4">
        Quiz Arena
      </h1>
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-amber-200 mb-8 drop-shadow">
        Leaderboard is loading...
      </h2>
      <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-2" />
    </div>
  );
}
