"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Inter, Poppins } from "next/font/google";

type Props = {
  data: {
    challenge?: string;
    strategy?: string;
    problem?: string;
    solution?: string;
    results?: string;
  };
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function ContentSections({ data }: Props) {
  const sections = useMemo(
    () =>
      [
        { title: "The Challenge", text: data.challenge },
        { title: "Strategy", text: data.strategy },
        { title: "Problem", text: data.problem },
        { title: "Solution", text: data.solution },
        { title: "Results", text: data.results },
      ].filter((s) => s.text),
    [data]
  );

  if (!sections.length) return null;

  return (
    <div className="w-full max-w-[1100px] mx-auto mt-28 space-y-24">
      {sections.map((section, index) => (
        <Section
          key={section.title}
          title={section.title}
          text={section.text}
          isLast={index === sections.length - 1}
          delay={index * 0.15}
        />
      ))}
    </div>
  );
}

const Section = memo(function Section({
  title,
  text,
  isLast,
  delay,
}: {
  title: string;
  text?: string;
  isLast?: boolean;
  delay: number;
}) {
  if (!text) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1], // smooth luxury easing
      }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 w-full max-w-6xl mx-auto px-4 sm:px-6 py-4"
    >
      {/* LEFT LABEL — INTER */}
      <div className="md:col-span-3">
        <h2
          className={`
            ${inter.className}
            text-[18px]
            md:text-[20px]
            font-medium
            text-neutral-500
            tracking-tight
          `}
        >
          {title}
        </h2>
      </div>

      {/* RIGHT TEXT — POPPINS */}
      <div className="md:col-span-9">
        <p
          className={`
            ${poppins.className}
            text-[22px]
            md:text-[26px]
            leading-[1.65]
            text-neutral-900
            tracking-[-0.01em]
          `}
        >
          {text}
        </p>
      </div>

      {/* Elegant Divider */}
      {!isLast && (
        <div className="md:col-span-12 mt-16">
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        </div>
      )}
    </motion.section>
  );
});