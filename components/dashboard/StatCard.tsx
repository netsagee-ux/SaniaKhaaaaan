"use client";

import { memo, useMemo } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowDownRight } from "react-icons/fi";

interface StatCardProps {
  title: string;
  value: number;
  trend?: number;
  description?: string;
}

function StatCard({
  title,
  value,
  trend = 0,
  description,
}: StatCardProps) {

  /* ================= Derived Values ================= */

  const positive = trend >= 0;

  const formattedValue = useMemo(
    () => value.toLocaleString(),
    [value]
  );

  const trendClasses = useMemo(() => {
    return positive
      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
      : "bg-rose-50 text-rose-600 border-rose-100";
  }, [positive]);

  /* ================= Render ================= */

  return (
    <div
      className="
        relative
        group
        rounded-3xl
        p-6 md:p-7
        bg-white/90
        backdrop-blur-md
        border border-slate-200/70
        shadow-[0_8px_25px_rgba(0,0,0,0.05)]
        hover:shadow-[0_18px_35px_rgba(0,0,0,0.08)]
        hover:-translate-y-1
        transition-transform transition-shadow duration-300
        will-change-transform
        overflow-hidden
      "
    >

      {/* Background Glow */}
      <div
        className="
          absolute
          -top-16 -right-16
          w-40 h-40
          bg-indigo-100/40
          rounded-full
          blur-3xl
          opacity-70
          group-hover:scale-110
          transition-transform
        "
      />

      {/* Title */}
      <p className="text-sm text-slate-500 font-medium mb-3 relative z-10">
        {title}
      </p>

      {/* Value */}
      <h2
        className="
          text-3xl md:text-4xl
          font-semibold
          tracking-tight
          text-slate-900
          relative z-10
        "
      >
        {formattedValue}
      </h2>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 relative z-10">

        {description && (
          <p className="text-sm text-slate-500">
            {description}
          </p>
        )}

        {trend !== 0 && (
          <div
            className={`
              flex items-center gap-1
              text-xs font-semibold
              px-3 py-1.5
              rounded-full
              border
              ${trendClasses}
            `}
          >
            {positive ? (
              <FiArrowUpRight size={14} />
            ) : (
              <FiArrowDownRight size={14} />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(StatCard);