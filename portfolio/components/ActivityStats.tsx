"use client";

import { useState, useEffect } from "react";
import { GitHubUserStats } from "@/utils/github-api";
import { LeetCodeUserStats } from "@/utils/leetcode-api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  Filler
);

interface WeeklyActivity {
  weekKey: string;
  githubContributions: number;
  leetcodeSubmissions: number;
}

interface ActivityStatsProps {
  initialData?: {
    github: GitHubUserStats;
    leetcode: LeetCodeUserStats;
    weeklyActivity: WeeklyActivity[];
  };
}

type TimeframeType = "weekly" | "monthly";

export default function ActivityStats({ initialData }: ActivityStatsProps) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframeType>("weekly");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/user-stats");
        if (!response.ok) {
          throw new Error("Failed to fetch activity stats");
        }
        const statsData = await response.json();
        setData(statsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching activity stats:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (!initialData) {
      fetchData();
    }
  }, [initialData]);

  // Format date label based on timeframe
  const formatDateLabel = (weekKey: string) => {
    const [year, week] = weekKey.split("-W");

    if (!week) {
      // For yearly data
      return year;
    }

    const weekNumber = parseInt(week);

    // Calculate the first day of the year
    const firstDay = new Date(parseInt(year), 0, 1);

    // Calculate the first day of the week
    const dayOffset = (weekNumber - 1) * 7;
    const weekStart = new Date(firstDay);
    weekStart.setDate(firstDay.getDate() + dayOffset - firstDay.getDay());

    // Format date based on selected timeframe
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (timeframe === "weekly") {
      return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()}`;
    } else {
      // For monthly data, extract month from the week date
      return `${monthNames[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
    }
  };

  // Process data based on selected timeframe
  const processActivityData = () => {
    if (!data?.weeklyActivity) return [];
  if (timeframe === "weekly") {
      // Use the last 8 weeks
      return data.weeklyActivity
        .slice(-8)
        .sort((a, b) => a.weekKey.localeCompare(b.weekKey));
    } else {
      // Group by month
      const monthlyData = new Map<
        string,
        { githubContributions: number; leetcodeSubmissions: number }
      >();

      data.weeklyActivity.forEach((week) => {
        const [year, weekNum] = week.weekKey.split("-W");
        const weekNumber = parseInt(weekNum);

        // Approximate month from week number
        const firstDay = new Date(parseInt(year), 0, 1);
        const dayOffset = (weekNumber - 1) * 7;
        const weekDate = new Date(firstDay);
        weekDate.setDate(firstDay.getDate() + dayOffset - firstDay.getDay());

        const monthKey = `${year}-${String(weekDate.getMonth() + 1).padStart(
          2,
          "0"
        )}`;

        if (!monthlyData.has(monthKey)) {
          monthlyData.set(monthKey, {
            githubContributions: 0,
            leetcodeSubmissions: 0,
          });
        }

        const current = monthlyData.get(monthKey)!;
        monthlyData.set(monthKey, {
          githubContributions:
            current.githubContributions + week.githubContributions,
          leetcodeSubmissions:
            current.leetcodeSubmissions + week.leetcodeSubmissions,
        });
      });

      // Get current date to filter out future months
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed

      // Convert to array, filter out future months, and take last 6 months
      return Array.from(monthlyData.entries())
        .map(([monthKey, data]) => {
          const [year, month] = monthKey.split("-").map((num) => parseInt(num));
          return {
            weekKey: monthKey, // Using weekKey for consistency
            year,
            month,
            ...data,
          };
        })
        .filter((item) => {
          // Filter out future months
          return (
            item.year < currentYear ||
            (item.year === currentYear && item.month <= currentMonth)
          );
        })
        .sort((a, b) => a.weekKey.localeCompare(b.weekKey))
        .slice(-6);
    }
  };

  const processedActivityData = processActivityData();

  if (loading) {
    return (
      <div className="bg-zinc-900 p-6 rounded-lg shadow-md mb-8 animate-pulse">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Loading activity stats...
        </h2>
        <div className="h-40 bg-zinc-800 rounded-md"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-zinc-900 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-400">
          Failed to load activity stats
        </h2>
        <p className="text-center text-zinc-400">{error || "Unknown error"}</p>
      </div>
    );
  }

  const { github, leetcode } = data;

  // Calculate top X% for LeetCode rank
  const leetCodeTopPercent = 100 - Math.round(leetcode.percentile);

  // Prepare line chart data
  const lineChartData = {
    labels: processedActivityData.map((item) => formatDateLabel(item.weekKey)),
    datasets: [
      {
        label: "GitHub Contributions",
        data: processedActivityData.map((item) => item.githubContributions),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: "LeetCode Submissions",
        data: processedActivityData.map((item) => item.leetcodeSubmissions),
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(234, 179, 8)",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  // Prepare bar chart data for LeetCode problems by difficulty with darker colors
  const leetcodeBarData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Problems Solved",
        data: [leetcode.easySolved, leetcode.mediumSolved, leetcode.hardSolved],
        backgroundColor: [
          "rgba(22, 163, 74, 0.8)", // darker green for easy
          "rgba(217, 119, 6, 0.8)", // darker orange for medium
          "rgba(185, 28, 28, 0.8)", // darker red for hard
        ],
        borderColor: [
          "rgba(22, 163, 74, 1)",
          "rgba(217, 119, 6, 1)",
          "rgba(185, 28, 28, 1)",
        ],
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  // Bar chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const, // Horizontal bar chart
    plugins: {
      legend: {
        display: false, // Hide legend since colors indicate difficulty
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            const total = leetcode.totalSolved;
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}% of total)`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            weight: "bold" as const,
          },
        },
      },
    },
  };

  // Timeframe button style helper
  const getTimeframeButtonStyle = (buttonTimeframe: TimeframeType) => {
    const baseStyle = "px-4 py-1 rounded-md font-medium transition-colors";
    return timeframe === buttonTimeframe
      ? `${baseStyle} bg-blue-600 text-white`
      : `${baseStyle} bg-zinc-800 text-zinc-400 hover:bg-zinc-700`;
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-lg shadow-md mb-8 border border-zinc-800">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-1">Coding Activity</h2>
          <p className="text-zinc-400">GitHub and LeetCode progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-auto">
          {/* GitHub Stats */}
          <div className="bg-black p-3 rounded-md border border-zinc-800">
            <div className="text-sm text-zinc-400">GitHub - 8 weeks</div>
            <div className="text-xl font-bold">
              {github.totalContributions} contributions
            </div>
          </div>

          {/* LeetCode Ranking */}
          <div className="bg-black p-3 rounded-md border border-zinc-800">
            <div className="text-sm text-zinc-400">LeetCode Ranking</div>
            <div className="text-xl font-bold text-yellow-400">
              Top {leetCodeTopPercent}%
            </div>
            <div className="mt-1 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300"
                style={{ width: `${leetcode.percentile}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe selector and charts row */}
      <div className="mt-6 mb-2">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeframe("weekly")}
              className={getTimeframeButtonStyle("weekly")}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe("monthly")}
              className={getTimeframeButtonStyle("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Line Chart - 2/3 width on large screens */}
          <div className="lg:col-span-2 bg-black p-4 rounded-md border border-zinc-800 h-80">
            {processedActivityData.length > 0 ? (
              <Line data={lineChartData} options={lineChartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-zinc-500">No activity data available</p>
              </div>
            )}
          </div>

          {/* LeetCode Problems Bar Chart - 1/3 width on large screens */}
          <div className="bg-black p-4 rounded-md border border-zinc-800 h-80">
            <h3 className="text-lg font-semibold mb-4">
              Problems by Difficulty
            </h3>
            <div className="h-56 flex items-center justify-center">
              {leetcode.totalSolved > 0 ? (
                <Bar data={leetcodeBarData} options={barChartOptions} />
              ) : (
                <p className="text-zinc-500">No LeetCode data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
