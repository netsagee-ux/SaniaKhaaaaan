"use client";

import { Inter, Playfair_Display, Poppins } from "next/font/google";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const inter = Inter({
  subsets:["latin"],
  weight:["400","500","600","700"],
  display:"swap"
});

const poppins = Poppins({
  subsets:["latin"],
  weight:["400","500"],
  display:"swap"
});

const playfair = Playfair_Display({
  subsets:["latin"],
  style:["italic"],
  weight:["700"],
  display:"swap"
});

export default function WhyChooseUs(){
  return(
    <section className="w-full bg-[#e9e5df] py-16 sm:py-20 md:py-28">

      {/* CONTAINER */}
      <div className="
        w-full
        px-5 sm:px-6
        md:max-w-6xl md:mx-auto
      ">

        {/* BADGE */}
        <div className="flex justify-center mb-5">
          <span className={`
            ${inter.className}
             bg-[#DBD8D4]
              text-[#6D6A65]
              text-sm
              px-3 py-2
              rounded
              font-semibold
          `}>
            The difference
          </span>
        </div>

        {/* HEADING */}
        <h2 className={`
          ${inter.className}
          text-center
          text-[28px]
          sm:text-[36px]
          md:text-[48px]
          lg:text-[58px]
          leading-[1.15]
          font-semibold
          tracking-[-0.03em]
          text-black
          mb-12 md:mb-18 lg:mb-20
        `}>
          Why choose Viral <br className="hidden sm:block"/>
          over <span className={playfair.className}>everyone</span> else?
        </h2>

        {/* GRID */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6 sm:gap-8 md:gap-10
        ">

          {/* OTHER */}
          <motion.div
            initial={{opacity:0,y:40}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{duration:.6}}
            className="
              bg-[#E3DED6]
              rounded-2xl sm:rounded-3xl
              p-6 sm:p-8 md:p-10
              hover:shadow-md
              transition
            "
          >

            <h3 className={`${inter.className}
              text-neutral-400
              text-center
              text-base sm:text-lg md:text-xl
              font-semibold
              mb-6 md:mb-8
            `}>
              Other Agencies
            </h3>

            <ul className={`${poppins.className}
              space-y-4
              text-gray-600
              text-sm sm:text-[15px]
            `}>

              {[
                "Generic content templates",
                "Monthly reporting only",
                "Separate teams for platforms",
                "Long-term contracts required",
                "One-size-fits-all approach",
              ].map((item,i)=>(
                <li key={i} className="flex gap-3 items-start">

                  <span className="
                    w-5 h-5
                    flex items-center justify-center
                    rounded-full
                    bg-neutral-400/20
                    mt-0.5
                  ">
                    <X size={14} className="text-neutral-500"/>
                  </span>

                  {item}
                </li>
              ))}

            </ul>
          </motion.div>

          {/* VIRAL */}
          <motion.div
            initial={{opacity:0,y:40}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{duration:.6,delay:.15}}
            className="
              bg-[#EFEAE3]
              rounded-2xl sm:rounded-3xl
              p-6 sm:p-8 md:p-10
              shadow-sm
              hover:shadow-lg
              transition
            "
          >

            <h3 className={`${inter.className}
              flex items-center justify-center gap-2
              text-base sm:text-lg md:text-xl
              font-semibold
              mb-6 md:mb-8
            `}>
              <span className="
                w-6 h-6
                bg-black
                rounded-md
                flex items-center justify-center
                text-white text-xs
              ">
                ✷
              </span>
              viral
            </h3>

            <ul className={`${poppins.className}
              space-y-4
              text-neutral-800
              font-medium
              text-sm sm:text-[15px]
            `}>

              {[
                "Custom content for your brand",
                "Real-time performance tracking",
                "Integrated cross-platform strategy",
                "Flexible month-to-month options",
                "Tailored to your goals",
              ].map((item,i)=>(
                <li key={i} className="flex gap-3 items-start">

                  <span className="
                    w-5 h-5
                    flex items-center justify-center
                    rounded-full
                    bg-black
                    mt-0.5
                  ">
                    <Check size={12} className="text-white"/>
                  </span>

                  {item}
                </li>
              ))}

            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
