"use client";

import { memo } from "react";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import { Heading, Subheading } from "@/components/ui/Typography";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ---------- ANIMATIONS (FROZEN FOR STABILITY) ---------- */

const blurFade = Object.freeze({
  hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

const fadeUp = Object.freeze({
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: d, duration: 0.7 },
  }),
});

function BlogHero() {
  return (
    <section className="w-full bg-[#e9e5df] py-20 sm:py-28 mt-10">
      <div className="max-w-6xl mx-auto px-6 text-center md:text-left">

        {/* BADGE */}
        <motion.span
          variants={blurFade}
          initial="hidden"
          animate="show"
          className={`${inter.className}
            inline-block
            bg-[#DBD8D4]
            text-[#6D6A65]
            px-4 py-2
            rounded-md
            text-sm
            font-semibold
            mb-6
            will-change-transform
          `}
        >
          Blog & Insights
        </motion.span>

        {/* HEADING */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.15}
          className="mt-6 mb-7 will-change-transform"
        >
          <Heading>Blogs</Heading>
        </motion.div>

        {/* SUBHEADING */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="mb-12 mx-auto md:mx-0 will-change-transform"
        >
          <Subheading>
            Discover actionable insights, proven strategies,
            and real-world lessons on social media, branding,
            and digital growth.
          </Subheading>
        </motion.div>

      </div>
    </section>
  );
}

export default memo(BlogHero);