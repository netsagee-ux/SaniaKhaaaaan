"use client";

import { memo } from "react";
import { Playfair_Display, Inter, Poppins } from "next/font/google";
import { motion } from "framer-motion";

/* ================= Fonts ================= */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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

/* ================= Static Content ================= */

const paragraphs = [
  "I work with brands and startups who want to create products people truly enjoy using.",
  "Not just products that look good, but products that solve real problems and feel right in everyday life.",
  "Design is more than appearance — it is how something works, feels, and fits into the user’s world.",
  "My process combines research, concept design, and 3D development to bring ideas into reality.",
  "If you want to build thoughtful and market-ready products, I’d love to design with you."
];

/* ================= Optimized Animations ================= */
/* IMPORTANT: Removed blur() – only transform + opacity */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const slideLeft = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" }
  }
};

const staggerContainer = {
  show: { transition: { staggerChildren: 0.18 } }
};

function MissionSection() {
  return (
    <section className="w-full bg-[#e9e5df] py-24 flex justify-center">

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="
          relative
          max-w-2xl
          w-full
          bg-[#EFEAE3]
          rounded-3xl
          px-8
          py-14
          shadow-[0_8px_30px_rgba(0,0,0,0.05)]
          mx-4
        "
      >

        {/* BADGE */}
        <motion.span
          variants={fadeUp}
          className={`${inter.className}
            inline-block
            bg-[#DBD8D4]
            text-[#6D6A65]
            px-3 py-2
            rounded
            text-base
            font-semibold
            mb-5
          `}
        >
          My Mission
        </motion.span>

        {/* HEADING */}
        <motion.h2
          variants={slideLeft}
          className={`${inter.className}
            text-[32px]
            leading-[1.15]
            font-semibold
            text-[#1F1F1F]
            tracking-[-0.02em]
            mb-7
          `}
        >
          Turning ideas into{" "}
          <span className={playfair.className}>
            meaningful
          </span>{" "}
          products
        </motion.h2>

        {/* TEXT */}
        <motion.div
          variants={staggerContainer}
          className={`${poppins.className}
            space-y-5
            text-[17px] sm:text-[18px] md:text-lg
            text-gray-500
            leading-relaxed
            font-medium
          `}
        >
          {paragraphs.map((text, i) => (
            <motion.p key={i} variants={fadeUp}>
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* FOOTER */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 mt-10"
        >
          <div className="w-5 h-5 bg-black rounded-sm" />
          <span className={`${inter.className} font-medium text-[#2C2C2C]`}>
            sania.design
          </span>
        </motion.div>

      </motion.div>

    </section>
  );
}

export default memo(MissionSection);