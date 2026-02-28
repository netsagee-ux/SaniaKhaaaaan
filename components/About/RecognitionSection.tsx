"use client";

import { memo, useMemo } from "react";
import { Inter, Poppins } from "next/font/google";
import { motion } from "framer-motion";

/* ================= Fonts (Static) ================= */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* ================= Static Data ================= */

const awards = [
  {
    id: "reddot-2024",
    title: "Red Dot Design Concept Award",
    desc: "Recognized for an innovative consumer product concept combining ergonomics, sustainability, and minimal aesthetics.",
    year: "2024",
  },
  {
    id: "prototype-2023",
    title: "Best Industrial Product Prototype",
    desc: "Awarded for developing a functional prototype that moved from sketch to production-ready design.",
    year: "2023",
  },
  {
    id: "sustainable-2024",
    title: "Sustainable Product Design Recognition",
    desc: "Honored for integrating eco-friendly materials and lifecycle thinking into product development.",
    year: "2024",
  },
  {
    id: "emerging-2023",
    title: "Emerging Product Designer Award",
    desc: "Recognized as a rising designer creating meaningful and user-centered physical products.",
    year: "2023",
  },
];

/* ================= Animation Config (Stable) ================= */

const revealAnimation = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
  viewport: { once: true },
};

/* ================= Component ================= */

function RecognitionSection() {
  // Memoize font class combinations (prevents recreation)
  const interClass = useMemo(() => inter.className, []);
  const poppinsClass = useMemo(() => poppins.className, []);

  return (
    <section className="w-full bg-[#e9e5df] py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span
            className={`${interClass} bg-[#dedad4] text-neutral-700 text-xs sm:text-sm px-4 py-2 rounded-md`}
          >
            Recognition
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`${interClass} text-center text-[30px] sm:text-[42px] md:text-[56px] lg:text-[64px] leading-[1.1] font-semibold tracking-[-0.03em] text-black`}
        >
          Awards that reflect <br className="hidden sm:block" />
          our commitment
        </h2>

        {/* Table Card */}
        <motion.div
          {...revealAnimation}
          className="mt-12 sm:mt-16 bg-[#e3ded6] rounded-2xl p-5 sm:p-8 md:p-10 will-change-transform"
        >
          {/* Header Row */}
          <div
            className={`${interClass} hidden md:grid grid-cols-12 text-sm text-neutral-500 pb-4 border-b border-neutral-300`}
          >
            <div className="col-span-4">Award</div>
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-right">Year</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-neutral-300">
            {awards.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-start"
              >
                <div
                  className={`${interClass} md:col-span-4 font-medium text-black text-base sm:text-lg`}
                >
                  {item.title}
                </div>

                <div
                  className={`${poppinsClass} md:col-span-6 text-neutral-600 text-sm sm:text-[15px] leading-relaxed`}
                >
                  {item.desc}
                </div>

                <div
                  className={`${poppinsClass} md:col-span-2 md:text-right font-medium text-black text-sm sm:text-base`}
                >
                  {item.year}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(RecognitionSection);