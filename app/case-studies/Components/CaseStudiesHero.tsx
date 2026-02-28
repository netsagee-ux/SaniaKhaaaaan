"use client";

import { memo } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import { Heading, Subheading } from "@/components/ui/Typography";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Stable animation config */
const fadeUp = Object.freeze({
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: d, duration: 0.7 },
  }),
});

function CaseStudyHero() {
  const avatars = [
    "https://res.cloudinary.com/dhi19zjhx/image/upload/v1771160552/image_1_yimokv.jpg",
    "https://res.cloudinary.com/dhi19zjhx/image/upload/v1771160553/image_3_cthhzu.jpg",
    "https://res.cloudinary.com/dhi19zjhx/image/upload/v1771160552/image_2_kluzxr.jpg",
    "https://res.cloudinary.com/dhi19zjhx/image/upload/v1771160556/image_4_ybw5zk.jpg",
  ];

  return (
    <section className="w-full bg-[#e9e5df] py-20 sm:py-28 mt-10">
      <div className="max-w-6xl mx-auto px-6 text-center md:text-left">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className={`${inter.className}
            inline-block
            bg-[#dedad4]
            text-neutral-700
            text-sm
            px-4 py-2
            rounded-lg
            mb-8
            will-change-transform
          `}
        >
          Case studies
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.15}
          className="mb-10 will-change-transform"
        >
          <Heading>Best Work</Heading>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="mb-12 mx-auto md:mx-0 will-change-transform"
        >
          <Subheading>
            We help ambitious brands turn social media from a daily burden
            into a powerful growth channel. Every strategy is crafted with
            precision, and every outcome is built to deliver real,
            measurable impact.
          </Subheading>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.45}
          className="flex flex-col items-center gap-4 sm:gap-5 md:flex-row md:justify-start"
        >
          {/* Avatars */}
          <div className="flex -space-x-4 justify-center">
            {avatars.map((src, i) => (
              <div
                key={src}
                className="relative w-12 h-12 sm:w-14 sm:h-14"
              >
                <Image
                  src={src}
                  alt={`Creator ${i + 1}`}
                  fill
                  sizes="56px"
                  className="rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
            ))}

            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black text-white flex items-center justify-center border-2 border-white">
              ✺
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center text-center gap-1 sm:flex-row sm:gap-3 md:text-left">
            <div className="text-amber-400 text-lg sm:text-xl">
              ★★★★★
            </div>

            <p className="text-neutral-500 text-sm sm:text-base md:text-lg font-medium">
              Trusted by{" "}
              <span className="font-semibold text-black">
                176+ creators
              </span>{" "}
              worldwide
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default memo(CaseStudyHero);