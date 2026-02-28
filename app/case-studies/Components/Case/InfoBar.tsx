"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Poppins, Inter } from "next/font/google";

type Props = {
  data: any;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

function InfoBar({ data }: Props) {
  const items = [
    { label: "Category", value: data.category },
    { label: "Client", value: data.client_name },
    { label: "Platforms", value: data.platforms },
    { label: "Year", value: data.year },
  ].filter(item => item.value);

  if (!items.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="
        w-full
        bg-[#eee9e9]
        rounded-2xl
        px-5 md:px-8
        py-5
        flex
        flex-wrap
        md:flex-nowrap
        items-center
        justify-between
        gap-4 md:gap-6
        shadow-sm
      "
    >
      {items.map((item, index) => (
        <FragmentWrapper key={item.label}>
          <AnimatedItem
            label={item.label}
            value={item.value}
            delay={index * 0.1}
          />
          {index !== items.length - 1 && <Divider delay={index * 0.1} />}
        </FragmentWrapper>
      ))}
    </motion.div>
  );
}

const Divider = memo(function Divider({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: delay + 0.2, duration: 0.5 }}
      className="hidden md:block w-px h-15 bg-[#dfdbd3] origin-top "
    />
  );
});

const AnimatedItem = memo(function AnimatedItem({
  label,
  value,
  delay,
}: {
  label: string;
  value?: string;
  delay: number;
}) {
  if (!value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
      className="min-w-[110px] transition-transform"
    >
      {/* LABEL (Your Exact Style) */}
      <p
        className={`
          text-[13px]
          text-gray-500
          leading-tight
          ${inter.className}
        `}
      >
        {label}
      </p>

      {/* VALUE */}
       <p className={`${inter.className} text-sm sm:text-base font-medium`}>
        {value}
      </p>
    </motion.div>
  );
});

function FragmentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export default memo(InfoBar);