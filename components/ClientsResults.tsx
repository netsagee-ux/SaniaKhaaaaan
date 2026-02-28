"use client";

import { memo, useEffect, useRef } from "react";
import Image from "next/image";
import { Playfair_Display, Inter, Poppins } from "next/font/google";
import { motion, useInView } from "framer-motion";

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

/* ================= Optimized Animations ================= */

// Removed filter blur animation (expensive)
// Use opacity + translate only (GPU-friendly)

const blurFade = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

/* ================= Optimized CountUp ================= */

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * to);
      ref.current!.textContent = value + suffix;

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ================= Component ================= */

function ClientResults() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={stagger}
      className="w-full bg-[#e9e5df] py-16 sm:py-20 md:py-28"
    >
      <div
        className="
          w-full
          px-4 sm:px-6
          md:max-w-6xl md:mx-auto
          grid md:grid-cols-2
          gap-12 md:gap-20
          items-center
        "
      >
        {/* LEFT */}
        <motion.div variants={stagger}>
          <motion.span
            variants={blurFade}
            className={`${inter.className}
              inline-block
              bg-[#DBD8D4]
              text-[#6D6A65]
              text-sm
              px-5 py-2
              rounded
              font-semibold
              mb-5
            `}
          >
            Client results
          </motion.span>

          <motion.h2
            variants={blurFade}
            className={`${inter.className}
              text-[28px]
              sm:text-[34px]
              md:text-[44px]
              lg:text-[52px]
              leading-[1.1]
              font-semibold
              text-black
              tracking-[-0.02em]
              mb-4
            `}
          >
            Designing a smart <br />
            home product with{" "}
            <span className={playfair.className}>purpose</span>
            <span className="ml-2">●</span>
          </motion.h2>

          <motion.p
            variants={blurFade}
            className={`${poppins.className}
              text-gray-500
              text-[15px]
              sm:text-[16px]
              leading-relaxed
              mb-8
            `}
          >
            A home-tech startup approached me with a rough
            idea but no clear product direction. I developed
            the concept, ergonomics, and 3D design, creating
            a functional product ready for prototyping and
            manufacturing.
          </motion.p>

          <motion.div
            variants={blurFade}
            className="grid grid-cols-2 gap-6 sm:gap-10"
          >
            <div>
              <h3 className={`${inter.className} text-[30px] sm:text-[36px] font-semibold`}>
                <CountUp to={3} suffix="X" />
              </h3>
              <p className={`${inter.className} text-sm font-medium`}>
                Faster Prototyping
              </p>
              <p className={`${poppins.className} text-xs text-[#8A867F]`}>
                Reduced dev time
              </p>
            </div>

            <div>
              <h3 className={`${inter.className} text-[30px] sm:text-[36px] font-semibold`}>
                <CountUp to={40} suffix="%" />
              </h3>
              <p className={`${inter.className} text-sm font-medium`}>
                Cost Efficiency
              </p>
              <p className={`${poppins.className} text-xs text-[#8A867F]`}>
                In production stage
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          variants={blurFade}
          className="flex justify-center md:justify-end"
        >
          <div
            className="
              relative
              w-full
              max-w-[420px]
              aspect-[4/5]
              rounded-2xl
              overflow-hidden
              bg-[#D9D2C7]
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            "
          >
            <Image
              src="/images/services-icons-1.png"
              alt="Product design"
              fill
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 420px,
                     420px"
              className="object-cover"
            />

            <div
              className="
                absolute inset-0
                flex items-center justify-center
                text-white
                text-xl sm:text-2xl md:text-3xl
                font-semibold
                bg-black/20
              "
            >
              SmartHome
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default memo(ClientResults);