// LeetCode API utility functions
export interface LeetCodeSubmission {
  date: string; // YYYY-MM-DD
  timestamp: number;
  status: string; // "Accepted" or other status
  language: string;
  problem: string;
}

export interface LeetCodeUserStats {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  weeklySubmissions: {
    [weekKey: string]: number; // Format: "YYYY-Wxx" (e.g., "2025-W16")
  };
  recentSubmissions: LeetCodeSubmission[];
  percentile: number; // Added percentile ranking
  error?: string;
}

export async function fetchLeetCodeStats(
  username: string
): Promise<LeetCodeUserStats> {
  try {
    // Using LeetCode's GraphQL API
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query userProfile($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
              username
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
                totalSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
              submissionCalendar
              profile {
                ranking
                reputation
                starRating
              }
            }
            recentSubmissionList(username: $username, limit: 20) {
              title
              timestamp
              statusDisplay
              lang
            }
          }
        `,
        variables: {
          username,
        },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors || !data.data) {
      throw new Error(
        data.errors?.[0]?.message || "Failed to fetch LeetCode data"
      );
    }

    const { matchedUser, allQuestionsCount, recentSubmissionList } = data.data;

    if (!matchedUser) {
      throw new Error(`User ${username} not found`);
    }

    // Parse submission calendar (comes as JSON string)
    let submissionCalendar = {};
    try {
      submissionCalendar = JSON.parse(matchedUser.submissionCalendar || "{}");
    } catch (e) {
      console.error("Failed to parse submission calendar:", e);
    }

    // Group submissions by week
    const weeklySubmissions: { [weekKey: string]: number } = {};
    Object.entries(submissionCalendar).forEach(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp) * 1000);
      const weekNumber = getWeekNumber(date);
      const year = date.getFullYear();
      const weekKey = `${year}-W${weekNumber.toString().padStart(2, "0")}`;

      weeklySubmissions[weekKey] =
        (weeklySubmissions[weekKey] || 0) + (count as number);
    });

    // Process recent submissions
    const recentSubmissions: LeetCodeSubmission[] = (
      recentSubmissionList || []
    ).map((submission: any) => {
      const date = new Date(submission.timestamp * 1000);
      return {
        date: date.toISOString().split("T")[0],
        timestamp: submission.timestamp,
        status: submission.statusDisplay,
        language: submission.lang,
        problem: submission.title,
      };
    });

    // Calculate percentile based on user's ranking
    // LeetCode has around 3.5 million users as of 2025, adjust if needed
    const totalLeetCodeUsers = 3500000;
    const ranking = matchedUser.profile?.ranking || totalLeetCodeUsers;
    const percentile = Math.max(
      0,
      Math.min(100, 100 - (ranking / totalLeetCodeUsers) * 100)
    );

    return {
      username: matchedUser.username,
      totalSolved:
        matchedUser.submitStats.acSubmissionNum.find(
          (item: any) => item.difficulty === "All"
        )?.count || 0,
      totalQuestions:
        allQuestionsCount.find((item: any) => item.difficulty === "All")
          ?.count || 0,
      easySolved:
        matchedUser.submitStats.acSubmissionNum.find(
          (item: any) => item.difficulty === "Easy"
        )?.count || 0,
      mediumSolved:
        matchedUser.submitStats.acSubmissionNum.find(
          (item: any) => item.difficulty === "Medium"
        )?.count || 0,
      hardSolved:
        matchedUser.submitStats.acSubmissionNum.find(
          (item: any) => item.difficulty === "Hard"
        )?.count || 0,
      weeklySubmissions,
      recentSubmissions,
      percentile, // Add percentile to returned object
    };
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return {
      username,
      totalSolved: 0,
      totalQuestions: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      weeklySubmissions: {},
      recentSubmissions: [],
      percentile: 0, // Default percentile
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
