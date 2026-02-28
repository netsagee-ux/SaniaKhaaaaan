"use client";

import { useEffect, useState, useRef, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import supabase from "@/lib/supabase";
import { Inter, Poppins } from "next/font/google";

/* ---------- FONTS ---------- */

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const LIMIT = 4;

export default function CaseStudiesGrid() {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // 🔥 useRef cache = no re-render
  const cache = useRef<Record<number, { data: any[]; total: number }>>({});
  const abortRef = useRef<AbortController | null>(null);

  const totalPages = Math.ceil(total / LIMIT);

  const fetchData = useCallback(
    async (currentPage: number, prefetch = false) => {
      if (cache.current[currentPage]) {
        if (!prefetch) {
          setData(cache.current[currentPage].data);
          setTotal(cache.current[currentPage].total);
          setLoading(false);
        }
        return;
      }

      if (!prefetch) setLoading(true);

      const from = currentPage * LIMIT;
      const to = from + LIMIT - 1;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const { data: result, error, count } = await supabase
        .from("case_studies")
        .select(
          "id,title,slug,cover_image,cover_video,category,created_at",
          { count: "exact" }
        )
        .order("created_at", { ascending: false })
        .range(from, to)
        .abortSignal(controller.signal);

      if (error) {
        if (!prefetch) setLoading(false);
        return;
      }

      const safe = result || [];

      cache.current[currentPage] = {
        data: safe,
        total: count || 0,
      };

      if (!prefetch) {
        setData(safe);
        setTotal(count || 0);
        setLoading(false);
      }
    },
    []
  );

  // Main fetch
  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  // 🔥 Prefetch next page for instant navigation
  useEffect(() => {
    if (page + 1 < totalPages) {
      fetchData(page + 1, true);
    }
  }, [page, totalPages, fetchData]);

  return (
    <div className="py-24">
      <div
        className="
          max-w-7xl mx-auto px-6
          grid grid-cols-1 sm:grid-cols-2
          gap-14
        "
      >
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : data.map((item) => <Card key={item.id} item={item} />)}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-8 mt-20">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className={`
            w-14 h-14 rounded-full bg-black text-white text-xl
            hover:scale-110 active:scale-95 transition
            disabled:opacity-30
            ${poppins.className}
          `}
        >
          ←
        </button>

        <button
          onClick={() =>
            setPage((p) => (p + 1 < totalPages ? p + 1 : p))
          }
          disabled={page + 1 >= totalPages}
          className={`
            w-14 h-14 rounded-full bg-black text-white text-xl
            hover:scale-110 active:scale-95 transition
            disabled:opacity-30
            ${poppins.className}
          `}
        >
          →
        </button>
      </div>
    </div>
  );
}

/* ---------- CARD ---------- */

const Card = memo(function Card({ item }: any) {
  const play = useCallback((e: any) => {
    e.currentTarget.play().catch(() => {});
  }, []);

  const pause = useCallback((e: any) => {
    e.currentTarget.pause();
  }, []);

  return (
    <Link
      href={`/case-studies/${item.slug}`}
      prefetch
      className="block"
    >
      <div
        className="
          relative
          rounded-[28px]
          overflow-hidden
          bg-white
          border border-white
          shadow-[0_15px_50px_rgba(0,0,0,0.08)]
        "
      >
        <div className="overflow-hidden">
          {item.cover_video ? (
            <video
              src={item.cover_video}
              muted
              loop
              playsInline
              preload="none"
              onMouseEnter={play}
              onMouseLeave={pause}
              className="
                w-full h-[380px] object-cover
                transition-transform duration-[1400ms] ease-out
                hover:scale-[1.05]
              "
            />
          ) : (
            <Image
              src={item.cover_image}
              alt={item.title}
              width={800}
              height={600}
              loading="lazy"
              sizes="(max-width:768px) 100vw, 50vw"
              className="w-full h-[380px] object-cover"
            />
          )}
        </div>

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/35 via-black/10 to-transparent
            pointer-events-none
          "
        />
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h3
          className={`
            text-xl font-semibold tracking-tight
            ${inter.className}
          `}
        >
          {item.title}
        </h3>

        <span
          className={`
            text-xs px-4 py-2 rounded-full
            bg-black/5 text-neutral-600
            ${poppins.className}
          `}
        >
          {item.category || "General"}
        </span>
      </div>
    </Link>
  );
});

/* ---------- SKELETON ---------- */

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="rounded-[28px] bg-gray-200 h-[380px]" />
      <div className="mt-6 flex justify-between">
        <div className="h-5 w-40 bg-gray-300 rounded" />
        <div className="h-8 w-20 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}