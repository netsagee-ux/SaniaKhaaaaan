"use client";

import { memo, useRef, useEffect, useState, useMemo } from "react";
import { Inter, Poppins } from "next/font/google";
import { FiEye, FiBarChart2 } from "react-icons/fi";

/* ================= Fonts ================= */

const inter = Inter({ subsets: ["latin"], weight: ["500", "600"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

function TopCases({ data = [] }: { data?: [string, number][] }) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [showArrow, setShowArrow] = useState(false);

  const interClass = useMemo(() => inter.className, []);
  const poppinsClass = useMemo(() => poppins.className, []);

  /* ================= Overflow Detection ================= */

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const hasOverflow = el.scrollHeight > el.clientHeight;
      setShowArrow((prev) => (prev !== hasOverflow ? hasOverflow : prev));
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [data]);

  /* ================= Render ================= */

  return (
    <section
      className="
        group
        bg-white/90
        backdrop-blur
        p-7 sm:p-8
        rounded-3xl
        border border-black/5
        shadow-sm hover:shadow-lg
        transition-shadow duration-300
        relative overflow-hidden
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6 relative">
        <FiBarChart2 className="text-amber-500" />

        <h3
          className={`
            ${interClass}
            text-lg sm:text-xl
            font-semibold
            text-slate-800
          `}
        >
          Top Case Studies
        </h3>
      </div>

      {/* LIST */}
      <div
        ref={listRef}
        className="
          space-y-2
          max-h-72
          overflow-y-auto
          pr-2
          scroll-smooth
        "
      >
        {data.length > 0 ? (
          data.map(([slug, count], i) => (
            <div
              key={slug}
              className="
                flex justify-between items-center
                py-3 px-4
                rounded-xl
                hover:bg-slate-50
                transition-colors
              "
            >
              {/* LEFT */}
              <div className="flex gap-3 items-center max-w-[70%]">
                <span className="text-xs font-bold text-amber-500 w-6">
                  #{i + 1}
                </span>

                <span
                  className={`
                    ${poppinsClass}
                    text-slate-700
                    truncate
                  `}
                >
                  {slug}
                </span>
              </div>

              {/* RIGHT */}
              <div
                className="
                  flex items-center gap-1
                  bg-slate-100
                  px-3 py-1
                  rounded-full
                "
              >
                <FiEye className="text-slate-500 text-sm" />

                <span
                  className={`
                    ${interClass}
                    text-sm font-semibold
                    text-slate-700
                  `}
                >
                  {count ?? 0} views
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-sm">
            No case study data yet
          </p>
        )}
      </div>

      {/* SCROLL INDICATOR */}
      {showArrow && (
        <div
          className="
            absolute bottom-3 left-1/2
            -translate-x-1/2
            text-slate-400
            animate-bounce
            pointer-events-none
          "
        >
          ↓
        </div>
      )}
    </section>
  );
}

export default memo(TopCases);