"use client";

import { useEffect, useState, useMemo } from "react";
import supabase from "@/lib/supabase";

export default function useAnalytics() {
  const [views, setViews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [cases, setCases] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalCases, setTotalCases] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);

        const [
          analyticsRes,
          blogsRes,
          casesRes,
        ] = await Promise.all([
          supabase
            .from("analytics")
            .select("page_type,slug,country,visitor_id,created_at")
            .gte("created_at", last30Days.toISOString()),

          supabase
            .from("blogs")
            .select("slug,views", { count: "exact" }),

          supabase
            .from("case_studies")
            .select("slug,views", { count: "exact" }),
        ]);

        if (!mounted) return;

        setViews(analyticsRes.data || []);
        setBlogs(blogsRes.data || []);
        setCases(casesRes.data || []);
        setTotalBlogs(blogsRes.count || 0);
        setTotalCases(casesRes.count || 0);
        setLoading(false);

      } catch (err) {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  /* ---------- SINGLE PASS COMPUTATION ---------- */

  const computed = useMemo(() => {
    if (!views.length) {
      return {
        stats: { total: 0, today: 0, blog: 0, caseV: 0 },
        countries: [],
        topBlogs: [],
        topCases: [],
      };
    }

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    let total = 0;
    let today = 0;
    let blogViews = 0;
    let caseV = 0;

    const countryMap = {};

    for (let i = 0; i < views.length; i++) {
      const v = views[i];
      total++;

      if (v.created_at?.startsWith(todayStr)) {
        today++;
      }

      if (v.page_type === "blog") blogViews++;
      if (v.page_type === "case") caseV++;

      if (v.country) {
        countryMap[v.country] =
          (countryMap[v.country] || 0) + 1;
      }
    }

    const countries = Object.entries(countryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const topBlogs = blogs
      .slice()
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .map((b) => [b.slug, b.views || 0]);

    const topCases = cases
      .slice()
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .map((c) => [c.slug, c.views || 0]);

    return {
      stats: {
        total,
        today,
        blog: blogViews,
        caseV,
      },
      countries,
      topBlogs,
      topCases,
    };
  }, [views, blogs, cases]);

  return {
    ...computed,
    totalBlogs,
    totalCases,
    loading,
  };
}