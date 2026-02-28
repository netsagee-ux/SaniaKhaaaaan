"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";

/* ================= Font ================= */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ================= Static Data ================= */

const brands = [
  "Venice",
  "Theo",
  "Rotterdam",
  "Berlin",
  "Paris",
  "London",
  "Amsterdam",
  "Milano",
];

/* ================= Animation Config ================= */

const marqueeAnimation = {
  animate: { x: ["0%", "-50%"] },
  transition: {
    repeat: Infinity,
    duration: 40,
    ease: "linear",
  },
};

/* ================= Mask Style ================= */

const maskStyle = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
};

function OurClients() {

  // Duplicate brands only once
  const loopBrands = useMemo(() => [...brands, ...brands], []);

  return (
    <section
      className={`
        ${inter.className}
        w-full
        bg-[#e9e5df]
        flex justify-center
        overflow-hidden
        py-8
      `}
    >
      <div
        className="
          w-full
          max-w-6xl
          px-6 sm:px-10
          flex flex-col md:flex-row
          items-center
          gap-8 md:gap-12
        "
        style={maskStyle}
      >
        {/* LEFT TEXT */}
        <p
          className="
            text-neutral-500
            text-sm sm:text-base
            font-medium
            tracking-wide
            whitespace-nowrap
            text-center md:text-left
          "
        >
          Trusted by modern brands
        </p>

        {/* MARQUEE */}
        <div className="flex-1 overflow-hidden">
          <motion.ul
            className="
              flex items-center
              gap-12 md:gap-16
              whitespace-nowrap
              px-4 sm:px-0
              will-change-transform
            "
            animate={marqueeAnimation.animate}
            transition={marqueeAnimation.transition}
          >
            {loopBrands.map((brand, i) => (
              <li
                key={`${brand}-${i}`}
                className="
                  flex-shrink-0
                  text-2xl sm:text-3xl md:text-3xl
                  font-semibold
                  tracking-[-0.02em]
                  text-neutral-400/80
                  hover:text-neutral-700
                  transition-colors duration-300
                  cursor-default
                  select-none
                "
              >
                {brand}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

export default memo(OurClients);