"use client";

import { memo, useEffect, useRef } from "react";
import Image from "next/image";
import { Playfair_Display, Inter, Poppins } from "next/font/google";
import { useInView } from "framer-motion";

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

/* ================= Optimized CountUp ================= */

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;

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

function CaseStudy() {
  return (
    <section className="w-full bg-[#e9e5df] py-16 sm:py-20 md:py-28">
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
        {/* LEFT IMAGE */}
        <div className="flex justify-center md:justify-start">
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
              src="/images/product-case.jpg"
              alt="Product design"
              fill
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 420px,
                     420px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-5 right-5 w-3 h-3 bg-black rounded-full" />

            <div
              className={`${inter.className}
                absolute bottom-6 left-6
                text-white
                text-xl sm:text-2xl md:text-3xl
                font-semibold
              `}
            >
              Aura Lamp
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <span
            className={`${inter.className}
              inline-block
              bg-[#DBD8D4]
              text-[#6D6A65]
              text-sm
              px-4 py-2
              rounded
              font-semibold
              mb-6
            `}
          >
            Client results
          </span>

          <h2
            className={`${inter.className}
              text-[28px]
              sm:text-[36px]
              md:text-[48px]
              lg:text-[56px]
              leading-[1.1]
              font-semibold
              text-black
              tracking-[-0.02em]
              mb-5
            `}
          >
            Launching a consumer <br className="hidden sm:block" />
            product with{" "}
            <span className={playfair.className}>
              intention
            </span>
          </h2>

          <p
            className={`${poppins.className}
              text-gray-600
              text-[15px]
              sm:text-[16px]
              leading-relaxed
              mb-10
              max-w-xl
            `}
          >
            A hardware startup approached me with an early
            concept for a smart home lamp. I refined the
            form, ergonomics, and materials, creating a
            design ready for prototyping and manufacturing.
          </p>

          <div
            className="
              grid grid-cols-2
              gap-8 sm:gap-12
              max-w-md
            "
          >
            <div>
              <h3
                className={`${inter.className}
                  text-[30px]
                  sm:text-[36px]
                  font-semibold
                `}
              >
                <CountUp to={5} />
              </h3>

              <p className={`${inter.className} text-sm sm:text-base font-medium`}>
                Prototypes Built
              </p>

              <p className={`${poppins.className} text-xs text-[#8A867F]`}>
                Before final design
              </p>
            </div>

            <div>
              <h3
                className={`${inter.className}
                  text-[30px]
                  sm:text-[36px]
                  font-semibold
                `}
              >
                <CountUp to={35} suffix="%" />
              </h3>

              <p className={`${inter.className} text-sm sm:text-base font-medium`}>
                Cost Reduced
              </p>

              <p className={`${poppins.className} text-xs text-[#8A867F]`}>
                In production
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(CaseStudy);