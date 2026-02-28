"use client";

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Stable animation config */
const menuAnimation = {
  initial: { y: "-100%" },
  animate: { y: 0 },
  exit: { y: "-100%" },
  transition: { duration: 0.3, ease: "easeOut" },
};

function Navbar() {
  const [open, setOpen] = useState(false);

  /* Prevent background scroll when menu open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <div className={inter.className}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-[#e9e5df]/95 backdrop-blur-sm z-20">

        <div className="
          w-full
          px-4 sm:px-6
          md:max-w-6xl md:mx-auto
          h-[74px]
          flex items-center
        ">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-black">
            <div className="w-6 h-6 bg-black rounded-md" />
            viral
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10 ml-auto">

            <div className="flex gap-8 text-[15px] font-medium text-black">
              <Link href="/" className="hover:text-black/60 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-black/60 transition-colors">About</Link>
              <Link href="/case-studies" className="hover:text-black/60 transition-colors">Case Studies</Link>
              <Link href="/blog" className="hover:text-black/60 transition-colors">Blog</Link>
            </div>

            <button className="
              bg-black text-white px-6 py-2.5 rounded-full
              text-sm font-semibold
              hover:bg-black/80
              transition-colors
              active:scale-95
            ">
              Book a call
            </button>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="
              md:hidden
              ml-auto
              w-10 h-10
              flex flex-col
              items-center justify-center
              gap-[5px]
              active:scale-90
              transition-transform
            "
          >
            <span className="w-6 h-[2px] bg-black rounded-full" />
            <span className="w-6 h-[2px] bg-black rounded-full" />
          </button>

        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <motion.div
          {...menuAnimation}
          className="fixed inset-0 bg-[#e9e5df] md:hidden will-change-transform"
        >

          {/* TOP BAR */}
          <div className="flex items-center justify-between px-4 h-[74px] border-b border-black/5">

            <Link href="/" onClick={()=>setOpen(false)} className="flex items-center gap-2 font-semibold text-lg">
              <div className="w-6 h-6 bg-black rounded-md" />
              viral
            </Link>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-2xl hover:rotate-90 transition-transform"
            >
              ✕
            </button>

          </div>

          {/* LINKS */}
          <div className="px-6 pt-12 flex flex-col gap-6 text-lg font-semibold text-[#333]">

            <Link href="/" onClick={()=>setOpen(false)} className="hover:text-black/60 transition-colors">Home</Link>
            <Link href="/about" onClick={()=>setOpen(false)} className="hover:text-black/60 transition-colors">About</Link>
            <Link href="/case-studies" onClick={()=>setOpen(false)} className="hover:text-black/60 transition-colors">Case Studies</Link>
            <Link href="/blog" onClick={()=>setOpen(false)} className="hover:text-black/60 transition-colors">Blog</Link>

            <button className="
              mt-10
              bg-black text-white
              py-4 rounded-full
              text-lg font-semibold
              shadow-md
              hover:bg-black/85
              transition-colors
              active:scale-95
            ">
              Book a call
            </button>

          </div>

        </motion.div>
      )}

    </div>
  );
}

export default memo(Navbar);