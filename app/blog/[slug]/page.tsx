"use client";

import { useEffect, useState, useMemo } from "react";
import supabase from "@/lib/supabase";
import TrackView from "@/components/TrackView";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Poppins, Inter } from "next/font/google";
import { motion } from "framer-motion";
import { FiEye, FiCalendar } from "react-icons/fi";

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Post() {
  const params = useParams();
  const router = useRouter();

  const slug = useMemo(() => {
    if (!params?.slug) return null;
    return Array.isArray(params.slug)
      ? params.slug[0]
      : params.slug;
  }, [params]);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    let mounted = true;

    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select(`
            title,
            content,
            cover_image,
            author,
            created_at,
            slug,
            views
          `)
          .eq("slug", slug)
          .maybeSingle();

        if (!mounted) return;

        if (error || !data) {
          router.replace("/404");
          return;
        }

        setData(data);
        setLoading(false);
      } catch {
        if (mounted) router.replace("/404");
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ece7df] to-[#e6e0d7]">
        <div className="animate-pulse text-neutral-500 text-lg">
          Loading article...
        </div>
      </div>
    );
  }

  if (!data) return null;

  const imageUrl = data.cover_image?.startsWith("http")
    ? data.cover_image
    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.cover_image}`;

  const formattedDate = new Date(data.created_at).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <article className="bg-gradient-to-b from-[#ece7df] to-[#e6e0d7] min-h-screen mt-28 sm:mt-36">

      <TrackView type="blog" slug={slug} />

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="max-w-5xl mx-auto px-6 sm:px-8"
      >

        {/* DATE */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
          <FiCalendar className="text-neutral-400" />
          <span className={`${inter.className} tracking-wide`}>
            {formattedDate}
          </span>
        </div>

        {/* TITLE */}
        <h1
          className={`
            ${poppins.className}
            text-4xl sm:text-5xl md:text-6xl
            font-semibold
            leading-[1.1]
            tracking-tight
            text-neutral-900
            max-w-4xl
          `}
        >
          {data.title}
        </h1>

        {/* VIEWS */}
        <div className="flex items-center gap-2 mt-5 text-sm text-neutral-500">
          <FiEye className="text-neutral-400" />
          <span className={`${inter.className}`}>
            {(data.views ?? 0).toLocaleString()} views
          </span>
        </div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mt-14"
        >
          <div className="relative w-full h-[280px] sm:h-[420px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={imageUrl}
              alt={data.title}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* AUTHOR */}
        <div className="mt-8">
          <p
            className={`
              ${poppins.className}
              text-sm
              text-neutral-600
              tracking-wide
            `}
          >
            By {data.author || "Admin"}
          </p>
        </div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`
            ${poppins.className}
            mt-8 pb-20
            text-[19px] sm:text-[20px] md:text-[21px]
            text-neutral-800
            leading-[2]
            font-medium
          `}
        >
          {data.content}
        </motion.div>

      </motion.div>

    </article>
  );
}