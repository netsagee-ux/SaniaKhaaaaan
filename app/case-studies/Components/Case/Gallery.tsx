"use client";

import Image from "next/image";
import { memo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Inter } from "next/font/google";

type Props = {
  images: string[];
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

function Gallery({ images }: Props) {
  if (!images?.length) return null;

  const controls = useAnimation();

  // Duplicate images for seamless infinite loop
  const loopImages = [...images, ...images];

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 40, // slow premium motion
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <section className="w-full max-w-[1300px] mx-auto mt-32 overflow-hidden">

      {/* TITLE — INTER */}
      <h2
        className={`
          ${inter.className}
          text-[18px]
          text-neutral-500
          font-medium
          mb-12
          tracking-tight
        `}
      >
        Gallery
      </h2>

      {/* SCROLL AREA */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() =>
          controls.start({
            x: ["0%", "-50%"],
            transition: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          })
        }
      >
        <motion.div
          className="flex gap-8 w-max"
          animate={controls}
        >
          {loopImages.map((img, i) => {
            const src = img.trim();

            return (
              <div
                key={src + i}
                className="
                  relative
                  min-w-[340px]
                  h-[460px]
                  overflow-hidden
                  rounded-[32px]
                  bg-neutral-100
                  flex-shrink-0
                  shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                "
              >
                <Image
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  fill
                  sizes="340px"
                  className="
                    object-cover
                    transition-transform
                    duration-1000
                    ease-out
                    hover:scale-110
                  "
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Gallery);