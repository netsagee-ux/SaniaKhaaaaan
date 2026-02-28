"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Inter, Playfair_Display } from "next/font/google";

/* ================= Fonts ================= */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500", "600"],
  display: "swap",
});

/* ================= Animation Config ================= */

const revealVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const revealTransition = {
  duration: 0.9,
};

const floatAnimation = {
  animate: { y: [0, -12, 0] },
  transition: { repeat: Infinity, duration: 5, ease: "easeInOut" },
};

function CallToAction() {
  return (
    <section className="w-full bg-[#e9e5df] pt-20 sm:pt-24 md:pt-32 overflow-hidden relative">
      
      {/* Soft glow background */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/50 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">

          <span
            className={`${inter.className} bg-[#dedad4] px-4 py-2 rounded-full text-xs sm:text-sm`}
          >
            Get started
          </span>

          <h2
            className={`${inter.className} mt-6 sm:mt-8 text-[28px] sm:text-[40px] md:text-[56px] lg:text-[64px] leading-[1.05] font-semibold tracking-[-0.03em]`}
          >
            Let’s build
            <br />
            <span className={playfair.className}>
              something meaningful.
            </span>
          </h2>

          <p className="mt-5 text-neutral-600 text-sm sm:text-base max-w-md mx-auto md:mx-0 leading-relaxed">
            A quick strategy call can unlock your
            next level of growth. Clear ideas,
            premium execution, real results.
          </p>

          <button
            className={`${inter.className}
              mt-8 sm:mt-10
              bg-black text-white
              px-8 sm:px-10 py-3 sm:py-4
              rounded-full shadow-xl
              hover:scale-105 active:scale-95
              transition-transform duration-300
              text-sm sm:text-base
            `}
          >
            Book a call
          </button>
        </div>

        {/* RIGHT SIDE — PHONE */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          transition={revealTransition}
          viewport={{ once: true }}
          className="relative flex justify-center mt-6 md:mt-0 will-change-transform"
        >
          <motion.div
            animate={floatAnimation.animate}
            transition={floatAnimation.transition}
            className="relative will-change-transform"
          >
            <Image
              src="/images/phone.png"   // ✅ Local image (No error)
              alt="Phone mockup"
              width={420}
              height={800}
              priority
              sizes="(max-width: 768px) 200px,
                     (max-width: 1024px) 320px,
                     380px"
              className="
                object-contain
                w-[200px]
                sm:w-[260px]
                md:w-[320px]
                lg:w-[380px]
                h-auto
                select-none
                pointer-events-none
                drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]
              "
            />
          </motion.div>

          {/* Elegant fade crop */}
          <div className="absolute bottom-0 w-full h-32 sm:h-40 bg-gradient-to-b from-transparent via-[#e9e5df]/80 to-[#e9e5df] pointer-events-none" />

          {/* Soft blur blend */}
          <div className="absolute bottom-0 w-full h-20 backdrop-blur-md bg-[#e9e5df]/40 pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}

export default memo(CallToAction);