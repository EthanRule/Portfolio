// GitHub API utility functions
export interface GitHubContribution {
  date: string;
  count: number;
}

export interface GitHubUserStats {
  username: string;
  totalContributions: number;
  weeklyContributions: {
    [weekKey: string]: number; // Format: "YYYY-Wxx" (e.g., "2025-W16")
  };
  contributionsData: GitHubContribution[];
  error?: string;
}

export async function fetchGitHubStats(
  username: string
): Promise<GitHubUserStats> {
  try {
    // GitHub API endpoint for user events
    const response = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const events = await response.json();

    // Process events to extract contributions
    const contributionsMap = new Map<string, number>();
    let totalContributions = 0;

    // Process each event and count contributions by date
    events.forEach((event: any) => {
      const date = event.created_at.split("T")[0]; // YYYY-MM-DD format

      // Count various contribution types
      if (
        [
          "PushEvent",
          "PullRequestEvent",
          "IssuesEvent",
          "CommitCommentEvent",
        ].includes(event.type)
      ) {
        const count = contributionsMap.get(date) || 0;
        const increment =
          event.type === "PushEvent" && event.payload.commits
            ? event.payload.commits.length
            : 1;

        contributionsMap.set(date, count + increment);
        totalContributions += increment;
      }
    });

    // Convert map to sorted array of contributions
    const contributionsData = Array.from(contributionsMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Group contributions by week
    const weeklyContributions: { [weekKey: string]: number } = {};
    contributionsData.forEach(({ date, count }) => {
      const dateObj = new Date(date);
      const weekNumber = getWeekNumber(dateObj);
      const year = dateObj.getFullYear();
      const weekKey = `${year}-W${weekNumber.toString().padStart(2, "0")}`;

      weeklyContributions[weekKey] =
        (weeklyContributions[weekKey] || 0) + count;
    });

    return {
      username,
      totalContributions,
      weeklyContributions,
      contributionsData,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return {
      username,
      totalContributions: 0,
      weeklyContributions: {},
      contributionsData: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Helper function to get week number from date
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
