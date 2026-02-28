"use client";

import { memo } from "react";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-neutral-200
        rounded-xl
        ${className}
      `}
    >
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-transparent
          via-white/50
          to-transparent
          animate-skeleton
          will-change-transform
          pointer-events-none
        "
      />
    </div>
  );
}

export default memo(Skeleton);