import { NextResponse } from "next/server";
import { fetchGitHubStats } from "@/utils/github-api";
import { fetchLeetCodeStats } from "@/utils/leetcode-api";

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    // Fetch data from both APIs in parallel
    const [githubStats, leetcodeStats] = await Promise.all([
      fetchGitHubStats("EthanRule"),
      fetchLeetCodeStats("Rudar"),
    ]);

    // Combine weekly stats for visualization
    const allWeeks = new Set([
      ...Object.keys(githubStats.weeklyContributions),
      ...Object.keys(leetcodeStats.weeklySubmissions),
    ]);

    const weeklyActivity = Array.from(allWeeks)
      .map((weekKey) => {
        return {
          weekKey,
          githubContributions: githubStats.weeklyContributions[weekKey] || 0,
          leetcodeSubmissions: leetcodeStats.weeklySubmissions[weekKey] || 0,
        };
      })
      .sort((a, b) => a.weekKey.localeCompare(b.weekKey));

    // Return combined data
    return NextResponse.json({
      github: githubStats,
      leetcode: leetcodeStats,
      weeklyActivity,
    });
  } catch (error) {
    console.error("Error in user stats API:", error);
    return NextResponse.json(
      { error: "Failed to fetch user statistics" },
      { status: 500 }
    );
  }
}
