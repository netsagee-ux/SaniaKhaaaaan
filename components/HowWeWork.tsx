"use client";

import { memo } from "react";
import { Playfair_Display, Inter, Poppins } from "next/font/google";
import { FiSearch, FiEdit3, FiTool } from "react-icons/fi";
import { motion } from "framer-motion";

/* ================= Fonts ================= */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["700"],
  display: "swap",
});

/* ================= Animation Config (Stable Object) ================= */

const lineTransition = {
  duration: 4,
  delay: 1,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut",
};

function HowWeWork() {
  return (
    <section className="w-full bg-[#e9e5df] py-32">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* BADGE */}
        <div className="flex justify-center items-center mb-6">
          <span
            className={`${inter.className}
              bg-[#DBD8D4]
              text-[#6D6A65]
              text-sm
              px-5 py-2
              rounded
              font-semibold
            `}
          >
            How I work
          </span>
        </div>

        {/* HEADING */}
        <h2
          className={`${inter.className}
            text-[44px] md:text-[64px]
            leading-[1.1]
            font-semibold
            text-neutral-900
            tracking-[-0.03em]
            mb-24
          `}
        >
          I like to keep <br />
          things{" "}
          <span className={playfair.className}>
            thoughtful
          </span>{" "}
          and simple
        </h2>

        {/* STEPS */}
        <div className="relative grid md:grid-cols-3 gap-12 items-start">

          {/* STATIC BASE LINE */}
          <svg
            className="hidden md:block absolute top-14 left-0 w-full pointer-events-none"
            height="120"
            viewBox="0 0 1200 120"
          >
            <path
              d="M 200 60 C 380 110, 480 110, 650 60 S 920 10, 1100 60"
              stroke="#D6CEC2"
              strokeWidth="2.5"
              fill="transparent"
              strokeLinecap="round"
            />
          </svg>

          {/* GPU-Optimized Animated Line */}
          <svg
            className="hidden md:block absolute top-14 left-0 w-full pointer-events-none"
            height="120"
            viewBox="0 0 1200 120"
          >
            <motion.path
              d="M 200 60 C 380 110, 480 110, 650 60 S 920 10, 1100 60"
              stroke="#B8AEA0"
              strokeWidth="3"
              fill="transparent"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={lineTransition}
              style={{ willChange: "pathLength" }}
            />
          </svg>

          {/* STEP 1 */}
          <Step
            icon={<FiSearch size={34} strokeWidth={2.5} />}
            title="Research & Define"
            description="Understanding user needs, market context, and product goals before design begins."
          />

          {/* STEP 2 */}
          <Step
            icon={<FiEdit3 size={34} strokeWidth={2.5} />}
            title="Design & Prototype"
            description="Sketching, CAD modeling, and building prototypes to explore form and function."
          />

          {/* STEP 3 */}
          <Step
            icon={<FiTool size={34} strokeWidth={2.5} />}
            title="Test & Refine"
            description="Improving usability, materials, and manufacturing readiness for production."
          />

        </div>
      </div>
    </section>
  );
}

/* ================= Memoized Step Component ================= */

const Step = memo(function Step({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative z-10">
      <div className="w-24 h-24 mx-auto mb-6 bg-[#F1ECE5] rounded-2xl flex items-center justify-center shadow-sm">
        {icon}
      </div>

      <h3
        className={`${inter.className}
          text-[22px]
          font-semibold
          tracking-[-0.01em]
          text-neutral-900
          mb-3
        `}
      >
        {title}
      </h3>

      <p
        className={`${poppins.className}
          text-[#6F6B65]
          font-medium
          leading-relaxed
          max-w-xs
          mx-auto
        `}
      >
        {description}
      </p>
    </div>
  );
});

export default memo(HowWeWork);