import Image from "next/image";

export default function MindsCrownLoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-full bg-[#050505] text-[#f4ecd8] overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/minds.png"
          alt="Minds Crown Background"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-black/30 to-black/45" />
      </div>

      <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-[#FF8C42] drop-shadow-lg mb-3">
        Minds Crown
      </h1>
      <h2 className="relative z-10 text-2xl sm:text-3xl font-bold text-center text-[#f4ecd8] mb-8 drop-shadow">
        Leaderboard is loading...
      </h2>

      <div className="relative z-10 w-16 h-16 border-4 border-[#FF8C42] border-t-transparent rounded-full animate-spin mb-2" />
    </div>
  );
}
