import { memo, useMemo } from "react";
import StatCard from "./StatCard";

interface Stats {
  total?: number;
  today?: number;
  blog?: number;
  caseV?: number;
}

interface StatsGridProps {
  stats?: Stats;
  totalBlogs?: number;
  totalCases?: number;
}

function StatsGrid({
  stats = {},
  totalBlogs = 0,
  totalCases = 0,
}: StatsGridProps) {

  /* ================= Safe Destructuring ================= */

  const {
    total = 0,
    today = 0,
    blog = 0,
    caseV = 0,
  } = stats;

  /* ================= Stable Card Config ================= */

  const cards = useMemo(
    () => [
      {
        title: "Total Visitors",
        value: total,
        trend: 12,
        description: "All time traffic",
      },
      {
        title: "Visitors Today",
        value: today,
        trend: 5,
        description: "Live daily visitors",
      },
      {
        title: "Blog Engagement",
        value: blog,
        trend: 9,
        description: "Blog traffic growth",
      },
      {
        title: "Case Study Views",
        value: caseV,
        trend: -2,
        description: "Portfolio engagement",
      },
      {
        title: "Published Blogs",
        value: totalBlogs,
        description: "Content library",
      },
      {
        title: "Case Studies",
        value: totalCases,
        description: "Portfolio projects",
      },
    ],
    [total, today, blog, caseV, totalBlogs, totalCases]
  );

  return (
    <section className="space-y-6 mb-16">

      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl font-semibold text-black">
          Analytics Overview
        </h2>

        <p className="text-sm text-gray-500">
          Real-time performance and visitor insights
        </p>
      </div>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            trend={card.trend}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(StatsGrid);