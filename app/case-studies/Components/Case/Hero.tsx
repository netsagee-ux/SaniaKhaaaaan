"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";
import { Inter, Poppins } from "next/font/google";
import { FiArrowRight } from "react-icons/fi";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

type Props = {
  data: any;
  nextSlug?: string;
};

function Hero({ data, nextSlug }: Props) {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-10 px-3 sm:px-6">

      {/* Animated Border Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-3xl p-[6.5px] bg-gradient-to-r from-white/60 via-white/30 to-white/60"
      >

        {/* Glow */}
        <div className="absolute inset-0 rounded-3xl bg-white/10 blur-md opacity-50 pointer-events-none" />

        <div
          className="
            relative overflow-hidden
            rounded-3xl
            h-[340px] sm:h-[420px] md:h-[200px] lg:h-[360px]
            bg-neutral-200
          "
        >

          {/* MEDIA */}
          {data.cover_video ? (
            <motion.video
              src={data.cover_video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          ) : (
            <Image
              src={data.cover_image}
              alt={data.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 90vw,
                     1152px"
              className="object-cover z-0"
            />
          )}

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-10 text-white z-20">

            {/* TOP ROW */}
            <div className="flex justify-between items-start">

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Link
                  href="/case-studies"
                  className={`
                    ${poppins.className}
                    bg-white text-black
                    text-xs sm:text-sm
                    px-4 py-1.5
                    rounded-full
                    font-medium
                    shadow-md
                    transition-all
                    hover:scale-105
                    hover:shadow-lg
                  `}
                >
                  Back
                </Link>
              </motion.div>

              {nextSlug && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Link
                    href={`/case-studies/${nextSlug}`}
                    className="
                      bg-white
                      text-black
                      p-3
                      rounded-full
                      shadow-lg
                      border border-white/70
                      transition-all
                      hover:scale-110
                      hover:shadow-xl
                    "
                  >
                    <FiArrowRight size={20} />
                  </Link>
                </motion.div>
              )}

            </div>

            {/* TITLE BLOCK */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl"
            >

              <h1
                className={`
                  ${poppins.className}
                  font-semibold
                  tracking-tight
                  text-xl sm:text-2xl md:text-3xl lg:text-4xl
                  leading-[1.15]
                  text-white
                `}
                style={{
                  textShadow: "0 4px 20px rgba(0,0,0,0.65)"
                }}
              >
                {data.title}
              </h1>

              {data.subtitle && (
                <p
                  className={`
                    ${poppins.className}
                    mt-3 sm:mt-4
                    text-sm sm:text-base md:text-lg
                    text-white/90
                    leading-relaxed
                  `}
                >
                  {data.subtitle}
                </p>
              )}

            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default memo(Hero);