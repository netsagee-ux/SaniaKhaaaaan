"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Inter, Poppins, Playfair_Display } from "next/font/google";

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

/* Stable animation config */
const cardAnimation = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" },
};

function PortfolioProfile() {
  return (
    <section className="relative w-full bg-[#e9e5df] py-16 sm:py-20 md:py-28 overflow-hidden">

      {/* OPTIMIZED SOFT GLOW */}
      <div
        className="
          absolute
          top-[-120px]
          left-1/2 -translate-x-1/2
          w-[500px] h-[500px]
          bg-gradient-to-r
          from-gray-200 to-gray-300
          blur-2xl
          opacity-30
          rounded-full
          pointer-events-none
        "
      />

      <div className="w-full px-5 sm:px-6 md:max-w-6xl md:mx-auto relative z-10">

        {/* HEADING */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`${inter.className}
              text-[28px]
              sm:text-[36px]
              md:text-[48px]
              lg:text-[60px]
              font-semibold
              leading-[1.15]
              tracking-[-0.03em]
              text-black
            `}
          >
            Meet the creator <br className="hidden sm:block" />
            behind your{" "}
            <span className={playfair.className}>
              success.
            </span>
          </h2>

          <p
            className={`${poppins.className}
              mt-5
              text-gray-500
              text-[15px] sm:text-[16px]
              leading-relaxed
              max-w-xl
              mx-auto
            `}
          >
            A passionate developer crafting premium digital experiences
            for modern brands.
          </p>
        </div>

        {/* CARD */}
        <motion.div {...cardAnimation}>
          <div
            className="
              grid grid-cols-1 md:grid-cols-2
              backdrop-blur-lg
              border border-white/40
              rounded-3xl md:rounded-[40px]
              shadow-xl
              overflow-hidden
            "
          >

            {/* IMAGE */}
            <div className="relative h-[340px] sm:h-[420px] md:min-h-[520px] group overflow-hidden">

              <Image
                src="/images/profileImage.jpg"
                alt="Profile"
                fill
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       600px"
                priority={false}
                className="
                  object-cover
                  scale-105
                  group-hover:scale-110
                  transition-transform
                  duration-700
                  will-change-transform
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">

              <h3
                className={`${inter.className}
                  text-[24px] sm:text-[28px] md:text-[34px]
                  font-semibold mb-4 tracking-tight
                `}
              >
                Sania Sheikh
              </h3>

              <p
                className={`${poppins.className}
                  text-gray-600
                  text-[15px] sm:text-[16px]
                  leading-relaxed
                  mb-8
                `}
              >
                Shopify & React developer focused on building
                high-converting stores, beautiful websites, and smart
                automation systems that grow businesses.
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["Shopify Expert", "React Developer", "AI Automation"].map((t) => (
                  <span
                    key={t}
                    className={`${inter.className}
                      px-4 py-2
                      bg-neutral-900
                      text-white
                      rounded-full
                      text-xs sm:text-sm
                      hover:bg-neutral-700
                      transition-colors
                    `}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">

                <button
                  className={`${inter.className}
                    w-full sm:w-auto
                    px-8 py-3
                    rounded-full
                    bg-neutral-900
                    text-white
                    font-medium
                    shadow-md
                    hover:bg-neutral-700
                    hover:scale-[1.03]
                    active:scale-95
                    transition-transform
                    transition-colors
                  `}
                >
                  Hire Me
                </button>

                <button
                  className={`${inter.className}
                    w-full sm:w-auto
                    px-8 py-3
                    rounded-full
                    border border-black/20
                    bg-white/40
                    backdrop-blur-sm
                    font-medium
                    hover:bg-black
                    hover:text-white
                    hover:border-black
                    transition-colors
                  `}
                >
                  View Work
                </button>

              </div>

            </div>

          </div>
        </motion.div>

      </div>

    </section>
  );
}

export default memo(PortfolioProfile);