import { memo } from "react";
import { Inter, Poppins } from "next/font/google";

/* ================= Fonts (Optimized) ================= */

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

/* ================= Base Classes ================= */

const headingBase = `
  text-[58px] sm:text-[64px] md:text-[84px]
  font-bold
  leading-[1]
  tracking-[-0.02em]
  bg-gradient-to-r
  from-black via-neutral-800 to-neutral-600
  bg-clip-text text-transparent
`;

const subheadingBase = `
  text-neutral-500
  text-[18px] md:text-[22px]
  max-w-3xl
  leading-[1.7]
  font-medium
`;

/* ---------- HEADING ---------- */

function HeadingComponent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`${inter.className} ${headingBase} ${className}`}>
      {children}
    </h1>
  );
}

/* ---------- SUBHEADING ---------- */

function SubheadingComponent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`${poppins.className} ${subheadingBase} ${className}`}>
      {children}
    </p>
  );
}

/* ---------- EXPORTS ---------- */

export const Heading = memo(HeadingComponent);
export const Subheading = memo(SubheadingComponent);