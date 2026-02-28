"use client";

import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { memo } from "react";
import { Heading, Subheading } from "@/components/ui/Typography";

/* ---------- FONTS (auto-optimized by Next) ---------- */

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

/* ---------- STATIC DATA (Prevents Re-Creation on Re-render) ---------- */

const AVATARS = ["/images/a1.jpg", "/images/a2.jpg", "/images/a3.jpg"];

const CARDS = [
  {
    img: "/images/team1.jpg",
    title: "Product Concept Design",
    desc: "Turning ideas into concepts",
  },
  {
    img: "/images/team2.jpg",
    title: "3D Modeling",
    desc: "Precision modeling",
  },
  {
    img: "/images/team3.jpg",
    title: "Prototype Development",
    desc: "From idea to product",
  },
];

/* ---------- ANIMATIONS (Frozen for stability) ---------- */

const blurFade = Object.freeze({
  hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8 },
  },
});

const headingSlide = Object.freeze({
  hidden: { opacity: 0, x: -60, filter: "blur(12px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1 },
  },
});

const stagger = Object.freeze({
  show: { transition: { staggerChildren: 0.2 } },
});

/* ---------- COMPONENT ---------- */

function WhoWeAre() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="w-full bg-[#e9e5df] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-24 md:pt-32 pb-20">

        {/* TOP CONTENT */}
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">

          <motion.span
            variants={blurFade}
            className={`${inter.className}
              bg-[#DBD8D4]
              text-[#6D6A65]
              px-6 py-2
              rounded-md
              text-sm
              font-semibold
            `}
          >
            About
          </motion.span>

          <motion.div variants={headingSlide} className="mt-10 mb-8">
            <Heading>Sania Sheikh</Heading>
          </motion.div>

          <motion.div variants={blurFade}>
            <Subheading className="max-w-3xl mb-12 mx-auto md:mx-0">
              Sania Sheikh is an industrial product designer
              focused on creating meaningful, functional,
              and beautiful products.
            </Subheading>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={blurFade}
            className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center md:justify-start"
          >
            <div className="flex -space-x-3">
              {AVATARS.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  width={36}
                  height={36}
                  alt="Client"
                  sizes="36px"
                  loading="lazy"
                  quality={70}
                  className="rounded-full border-2 border-white object-cover"
                />
              ))}
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs border-2 border-white">
                ✷
              </div>
            </div>

            <div className={`${poppins.className} text-center sm:text-left`}>
              <div className="text-orange-400 text-sm">★★★★★</div>
              <p className="text-sm text-gray-600">
                Trusted by 150+ clients
              </p>
            </div>
          </motion.div>
        </div>

        {/* IMAGE ROW */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mt-16 md:mt-24"
        >
          {CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={blurFade}
              whileHover={{ y: -12 }}
              className="rounded-3xl overflow-hidden bg-white/40 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-xl will-change-transform"
            >
              <Image
                src={card.img}
                width={500}
                height={600}
                alt={card.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={80}
                loading="lazy"
                className="object-cover w-full h-[380px] sm:h-[440px] md:h-[520px]"
              />

              <div className="p-6">
                <h3 className={`${inter.className} font-semibold text-lg md:text-xl`}>
                  {card.title}
                </h3>

                <p className={`${poppins.className} text-gray-500 text-sm mt-1`}>
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}

export default memo(WhoWeAre);