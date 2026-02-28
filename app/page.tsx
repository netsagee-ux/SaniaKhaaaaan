"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";

import BrandMarquee from "../components/BrandMarquees";
import ServicesSection from "../components/ServicesSection";
import MissionSection from "../components/MissionSection";
import ClientResults from "@/components/ClientsResults";
import CaseStudy from "@/components/ClientsResults2";
import HowWeWork from "@/components/HowWeWork";
import TestimonialSection from "@/components/HowWeWork1";
import WhyChooseUs from "@/components/WhyChooseUs";

import FAQSection from "@/components/Faqs";
import Footer from "@/components/Footer";
import PortfolioProfile from "../components/PortfolioProfile";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { Inter, Playfair_Display, Poppins } from "next/font/google";

/* ================= FONTS ================= */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* ================= ANIMATIONS ================= */
/* Removed blur filters (very expensive on GPU) */

const blurFade = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const headingSlide = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22 } },
};

/* ================= COMPONENT ================= */

export default function Hero() {

  /* Prevent social icon recreation */
  const socialBlock = useMemo(
    () => (
      <div className="flex gap-8">
        <FaInstagram size={18} />
        <FaLinkedinIn size={18} />
        <FaFacebookF size={18} />
      </div>
    ),
    []
  );

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={stagger}
      className={`${inter.className} w-full bg-[#e9e5df] mt-14 overflow-x-hidden`}
    >

      {/* HERO CONTAINER */}
      <div className="
        max-w-6xl mx-auto
        px-4 sm:px-6
        pt-16 sm:pt-20
        pb-20 sm:pb-24
        grid grid-cols-1 md:grid-cols-2
        gap-14 items-center
      ">

        {/* LEFT SIDE */}
        <motion.div
          variants={stagger}
          className="
            flex flex-col
            items-center md:items-start
            text-center md:text-left
          "
        >

          {/* SOCIAL TICKER */}
          <motion.div
            variants={blurFade}
            className="
              bg-[#EFEAE3]
              rounded-full
              px-10 py-2
              w-[210px]
              overflow-hidden
              border border-white/40
              shadow-sm
              mb-10
              mx-auto md:mx-0
            "
          >
            <motion.div
              className="flex gap-8 will-change-transform"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 18,   // slower = lower CPU usage
                ease: "linear"
              }}
            >
              {socialBlock}
              {socialBlock}
            </motion.div>
          </motion.div>

          {/* HEADING */}
          <motion.h1
            variants={headingSlide}
            className="
              font-black
              text-black
              leading-[0.99] sm:leading-[0.92]
              tracking-[-0.07em] sm:tracking-[-0.08em]
              text-[clamp(62px,6vw,128px)]
              [text-rendering:optimizeLegibility]
              [-webkit-font-smoothing:antialiased]
            "
          >
            Designing products <br />
            people love to use
          </motion.h1>

          {/* SUBHEADING */}
          <motion.p
            variants={blurFade}
            className={`
              ${poppins.className}
              mt-7
              text-[18px] sm:text-lg
              text-neutral-500
              font-medium
              max-w-xl
            `}
          >
            I help brands turn ideas into beautiful,
            functional products from concept to
            production. Blending aesthetics, usability,
            and smart engineering to create designs that
            stand out in the real world.
          </motion.p>

          {/* BUTTON */}
          <motion.button
            variants={blurFade}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="
              mt-10
              bg-black text-white
              px-9 py-4
              rounded-full
              text-base font-medium
              shadow-lg
              hover:bg-neutral-800
              transition
              mx-auto md:mx-0
            "
          >
            Get in touch
          </motion.button>

        </motion.div>

        {/* RIGHT SIDE VIDEO */}
        <motion.div
          variants={blurFade}
          className="flex justify-center md:justify-end w-full"
        >
          <div className="
              relative
              w-full
              max-w-[340px] sm:max-w-[360px]
              aspect-[9/16]
              rounded-[38px]
              overflow-hidden
              border-[10px] border-[#e8e8e1]
              shadow-[0_20px_60px_rgba(0,0,0,0.22)]
              bg-black
          ">

            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" />

            <div className="absolute top-4 left-4 right-4 flex gap-2">
              <div className="h-1 bg-white/40 flex-1 rounded-full overflow-hidden">
                <div className="h-full bg-white w-full animate-pulse" />
              </div>
              <div className="h-1 bg-white/40 flex-1 rounded-full" />
              <div className="h-1 bg-white/40 flex-1 rounded-full" />
            </div>

            <div className="absolute top-9 left-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <Image
                  src="/profile.jpg"
                  alt="profile"
                  width={40}
                  height={40}
                  priority
                  className="object-cover"
                />
              </div>

              <div className="text-white text-sm font-medium">
                sania.design
                <span className="opacity-70 ml-2 text-xs">6h</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* LOWER SECTIONS (UNCHANGED STRUCTURE) */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="pt-5 pb-24"
      >
        <BrandMarquee />
        <ServicesSection />
        <MissionSection />
        <ClientResults />
        <CaseStudy />
        <HowWeWork />
        <TestimonialSection />
        <WhyChooseUs />
        <PortfolioProfile />
        <FAQSection />
        <Footer />
      </motion.div>

    </motion.section>
  );
}