export async function fetchTeams() {
  const api = process.env.NEXT_PUBLIC_SHEETDB_API;
  if (!api) throw new Error("API endpoint not set");
  const res = await fetch(api);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  // Map and process data
  const teams = data.map((row: any) => {
    const teamId = row["Team Id"] || row["team id"] || row["teamId"] || row["id"] || "";
    const teamName = row["Team Name"] || row["team name"] || row["teamName"] || row["name"] || "";
    // Sum s1-s50
    let totalScore = 0;
    for (let i = 1; i <= 50; i++) {
      const val = row[`s${i}`];
      const num = typeof val === "string" && val.trim() !== "" ? Number(val) : 0;
      totalScore += isNaN(num) ? 0 : num;
    }
    return { teamId, teamName, totalScore };
  });
  // Sort by score descending and assign rank
  teams.sort((a: any, b: any) => b.totalScore - a.totalScore);
  return teams.map((t: any, i: number) => ({ ...t, rank: i + 1 }));
}
