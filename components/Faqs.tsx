"use client";

import { useState } from "react";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400","500","600"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400","500"],
  display: "swap",
});

const faqs = [
  {
    q: "How quickly will we see results?",
    a: "Most clients see increased engagement within the first 2 weeks, with significant growth typically happening by month 2. We focus on building sustainable momentum rather than quick spikes that don't last.",
  },
  {
    q: "What platforms do you manage?",
    a: "We manage Instagram, TikTok, LinkedIn, and YouTube depending on where your audience is most active.",
  },
  {
    q: "Do you work with our industry?",
    a: "We work with most industries. Our strategy adapts to your niche and audience.",
  },
  {
    q: "What if we want to cancel?",
    a: "You can cancel anytime. We keep things flexible with no long-term lock-ins.",
  },
  {
    q: "How involved do we need to be?",
    a: "You can be as involved as you like. Many clients prefer a hands-off approach while we handle execution.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      className={`${inter.className} w-full bg-[#e9e5df] py-20 md:py-28 flex justify-center`}
    >
      {/* MAIN CARD */}
      <div
        className="
          bg-[#EFEAE3]
          rounded-3xl
          px-6
          md:px-14
          py-10
          md:py-14
          max-w-2xl
          w-full
          shadow-[0_20px_60px_rgba(0,0,0,0.05)]
        "
      >
        {/* BADGE (INTER) */}
        <span
          className={`
            ${inter.className}
             bg-[#DBD8D4]
              text-[#6D6A65]
              text-sm
              px-5 py-2
              rounded
              font-semibold
          `}
        >
          Questions
        </span>

        {/* HEADING (INTER + PLAYFAIR WORD) */}
        <h2
          className={`
            ${inter.className}
            mt-6
            text-[30px]
            sm:text-[36px]
            md:text-[46px]
            leading-[1.1]
            font-semibold
            tracking-[-0.02em]
            text-black
          `}
        >
          Frequently <br />
          Asked{" "}
          <span className={playfair.className}>
            Questions
          </span>
        </h2>

        {/* FAQ LIST */}
        <div className="mt-10 space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                className="
                  bg-[#DFD9D0]
                  rounded-xl
                  overflow-hidden
                  transition
                  hover:bg-[#D7D1C8]
                "
              >
                {/* BUTTON */}
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="
                    w-full
                    flex
                    justify-between
                    items-center
                    p-5
                    text-left
                  "
                >
                  {/* QUESTION (INTER) */}
                  <h3 className={`${inter.className} font-medium text-black text-base md:text-lg`}>
                    {item.q}
                  </h3>

                  <span
                    className="
                      w-8 h-8
                      flex items-center justify-center
                      bg-black
                      rounded-md
                      text-white
                      shrink-0
                    "
                  >
                    {isOpen ? <X size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                {/* ANSWER (POPPINS) */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, y: -5 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p
                        className={`
                          ${poppins.className}
                          px-5
                          pb-5
                          text-neutral-600
                          text-sm
                          md:text-[15px]
                          leading-relaxed
                        `}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
