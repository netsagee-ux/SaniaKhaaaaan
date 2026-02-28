"use client";

import { useRef } from "react";
import { Inter } from "next/font/google";
import useAnalytics from "@/hooks/useAnalytics";
import StatsGrid from "@/components/dashboard/StatsGrid";
import TopBlogs from "@/components/dashboard/TopBlogs";
import TopCases from "@/components/dashboard/TopCases";
import Link from "next/link";

/* ---------- FONT ---------- */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function DashboardPage() {
  const {
    stats,
    topBlogs,
    topCases,
    totalBlogs,
    totalCases,
    loading,
  } = useAnalytics();

  /* ---------- GREETING (no need for useMemo) ---------- */

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f6f2]">
        <p className="text-slate-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`${inter.className} min-h-screen bg-[#e9e5df]/95 py-10 mt-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HERO */}
        <div
          className="
            mb-12 p-8 sm:p-10
            rounded-[28px]
            bg-gradient-to-br
            from-[#f3eadf]
            to-[#e7dbc8]
            border border-black/5
            shadow-sm
          "
        >
          <h1
            className="
              text-3xl sm:text-4xl lg:text-5xl
              font-semibold text-slate-800
              mb-3
            "
          >
            {greeting}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg">
            Here’s what’s happening with your platform today.
          </p>
        </div>

        {/* STATS */}
        <StatsGrid
          stats={stats}
          totalBlogs={totalBlogs}
          totalCases={totalCases}
        />

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">

          <Link href="/admin/blog" className="group">
            <div
              className="
                relative overflow-hidden
                bg-white
                p-8 rounded-3xl
                border border-black/5
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-transform transition-shadow duration-300
                will-change-transform
              "
            >
              <div
                className="
                  absolute inset-0
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                  bg-gradient-to-br
                  from-indigo-50/40
                  via-transparent
                  to-purple-50/40
                "
              />

              <div className="relative">
                <h3 className="text-xl font-semibold mb-2">
                  Manage Blogs ✍️
                </h3>

                <p className="text-slate-500 mb-4">
                  Create, edit and manage blog posts.
                </p>

                <span
                  className="
                    inline-block
                    text-sm font-medium
                    text-indigo-600
                    group-hover:translate-x-1
                    transition-transform
                  "
                >
                  Open Blog Manager →
                </span>
              </div>
            </div>
          </Link>

          <Link href="/admin/case-studies" className="group">
            <div
              className="
                relative overflow-hidden
                bg-white
                p-8 rounded-3xl
                border border-black/5
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-transform transition-shadow duration-300
                will-change-transform
              "
            >
              <div
                className="
                  absolute inset-0
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                  bg-gradient-to-br
                  from-amber-50/40
                  via-transparent
                  to-orange-50/40
                "
              />

              <div className="relative">
                <h3 className="text-xl font-semibold mb-2">
                  Case Studies 📊
                </h3>

                <p className="text-slate-500 mb-4">
                  View and update your case studies.
                </p>

                <span
                  className="
                    inline-block
                    text-sm font-medium
                    text-amber-600
                    group-hover:translate-x-1
                    transition-transform
                  "
                >
                  Open Case Manager →
                </span>
              </div>
            </div>
          </Link>

        </div>

        {/* TOP CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopBlogs data={topBlogs} />
          <TopCases data={topCases} />
        </div>

      </div>
    </div>
  );
}