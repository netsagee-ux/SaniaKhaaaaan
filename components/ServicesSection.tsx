"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Inter, Poppins, Playfair_Display } from "next/font/google";

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

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
  display: "swap",
});

/* Section Animation */

const blurFade = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

/* Ultra Smooth Luxury 3D Animation */
const floating3D = {
  animate: {
    y: [0, -8, 0],
    rotateY: [-6, 6, -6],
    rotateX: [2, -2, 2],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function ServicesSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
      className="w-full bg-[#e9e5df] py-28 md:py-36"
    >
      <div className="px-6 md:max-w-7xl md:mx-auto">

        {/* CENTERED BADGE */}
        <div className="flex justify-center">
          <motion.span
            variants={blurFade}
            className={`
              ${inter.className}
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
            Services
          </motion.span>
        </div>

        {/* HEADING */}
        <div className="text-center mb-12">
          <h2
            className={`
              ${inter.className}
              text-[36px]
              sm:text-[48px]
              md:text-[72px]
              leading-[1.05]
              font-semibold
              tracking-[-0.03em]
              text-black
            `}
          >
            How I can
            <br />
            help you{" "}
            <span className={`${playfair.className} text-[#1A1A1A]`}>
              grow
            </span>
          </h2>

       
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ServiceCard
            icon="https://img.icons8.com/?size=300&id=ObuWtTlsoTj6&format=png&color=000000"
            title="Local Search Visibility"
            text="Appear clearly when customers search in your area. Structured Google presence and positioning that build immediate credibility."
            extraText="Optimised profile structure, consistent NAP details, review strategy, and ranking improvements designed to increase trust and visibility in your local market."
          />

          <ServiceCard
            icon="https://img.icons8.com/?size=300&id=IL3gRa6MIUzG&format=png&color=000000"
            title="Google Ads for Qualified Enquiries"
            text="Campaigns built around real buying intent. Controlled targeting and measurable cost per enquiry designed to generate serious customer calls."
            extraText="Keyword research, conversion tracking, negative keyword filtering, and continuous performance optimisation to ensure maximum return on ad spend."
          />

          <ServiceCard
            icon="https://img.icons8.com/?size=300&id=caqW1mBLSKET&format=png&color=000000"
            title="Website Conversion Strategy"
            text="Refining structure and clarity so visitors take action. Turning traffic into consistent enquiries and booked appointments."
            extraText="Improved layout hierarchy, psychological triggers, trust signals, and mobile-first optimisation to increase enquiry rate and reduce bounce rate."
          />
        </div>
      </div>
    </motion.section>
  );
}

/* CARD COMPONENT */
function ServiceCard({ icon, title, text, extraText }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        relative
        bg-[#e9e5df]
        border
        border-[#E6E1D8]
        rounded-3xl
        py-8
        px-10
        text-center
        shadow-[0_20px_60px_rgba(0,0,0,0.06)]
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)]
        transition-all
        duration-500
      "
      style={{ perspective: 1200 }}
    >
      {/* Soft Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent opacity-40 pointer-events-none"></div>

      {/* ICON */}
      <div className="mb-6 flex justify-center">
        <motion.img
          src={icon}
          alt={title}
          variants={floating3D}
          animate="animate"
          className="w-24 h-24 object-contain"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        />
      </div>

      {/* TITLE */}
      <h3
        className={`
          ${inter.className}
          text-[19px]
          md:text-[22px]
          font-semibold
          text-black
          tracking-[-0.02em]
          leading-[1.2]
          mb-3
        `}
      >
        {title}
      </h3>

      {/* DESCRIPTION + INLINE EXPANSION */}
      <p
        className={`
          ${poppins.className}
          text-[15px]
          text-[#6A655E]
          leading-relaxed
        `}
      >
        {text}
        {expanded && (
          <>
            {" "}
            {extraText}
          </>
        )}
      </p>

      {/* READ MORE BUTTON */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`
          ${poppins.className}
          mt-5
          text-[15px]
          font-medium
          text-[#2563EB]
          transition-all
          duration-300
        `}
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </motion.div>
  );
}