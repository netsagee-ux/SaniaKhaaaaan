"use client";

import { useState, useMemo, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type Post = {
  id: string;
  slug: string;
  title: string;
  cover_image?: string;
  author?: string;
  created_at?: string;
};

const PER_PAGE = 4;

/* ---------- HELPERS (STABLE) ---------- */

const limitWords = (text: string = "", limit: number = 20) => {
  const words = text.trim().split(" ");
  return words.length > limit
    ? words.slice(0, limit).join(" ") + "..."
    : text;
};

const getSafeImage = (src?: string) => {
  if (!src) return "/placeholder.jpg";
  if (src.endsWith(".mp4")) return "/placeholder.jpg";
  if (src.startsWith("http") || src.startsWith("/")) return src;
  return "/placeholder.jpg";
};

function BlogGridClient({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [page, setPage] = useState(1);

  /* ---------- SERVER ALREADY SORTED ----------
     Remove redundant sorting for performance
  */
  const sortedPosts = posts;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(sortedPosts.length / PER_PAGE)),
    [sortedPosts.length]
  );

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const visiblePosts = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return sortedPosts.slice(start, start + PER_PAGE);
  }, [page, sortedPosts]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const handleNavigate = useCallback(
    (slug: string) => {
      router.push(`/blog/${slug}`);
    },
    [router]
  );

  if (!posts?.length) {
    return (
      <p className={`${inter.className} text-center py-24 text-neutral-500`}>
        No blogs found
      </p>
    );
  }

  return (
    <section
      className="
        w-full
        max-w-6xl
        mx-auto
        px-4 sm:px-8
        pb-24
        bg-[#e9e5df]
      "
    >
      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-14">
        {visiblePosts.map((post, i) => {
          const title20 = limitWords(post.title, 20);

          const date = post.created_at
            ? new Date(post.created_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "";

          const isLatest = page === 1 && i === 0;

          return (
            <article
              key={post.id}
              className="
                group
                cursor-pointer
                will-change-transform
              "
              onClick={() => handleNavigate(post.slug)}
            >
              {/* IMAGE */}
              <div className="relative rounded-[24px] overflow-hidden shadow-md">
                <Image
                  src={getSafeImage(post.cover_image)}
                  alt={post.title}
                  width={900}
                  height={600}
                  priority={i < 2 && page === 1}
                  loading={i < 2 && page === 1 ? "eager" : "lazy"}
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 600px"
                  className="
                    w-full
                    h-[240px] sm:h-[300px] lg:h-[340px]
                    object-cover
                    transform-gpu
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:scale-[1.03]
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {isLatest && (
                  <div
                    className={`
                      ${inter.className}
                      absolute top-4 left-4
                      px-3 py-1
                      text-xs font-semibold
                      rounded-full
                      text-white
                      bg-black/85
                      backdrop-blur
                    `}
                  >
                    Latest
                  </div>
                )}

                <h3
                  className={`
                    ${inter.className}
                    absolute bottom-5 left-5 right-5
                    text-white
                    text-lg sm:text-xl
                    font-semibold
                  `}
                >
                  {title20}
                </h3>
              </div>

              {/* BOTTOM */}
              <div className="mt-4 space-y-2">
                <h2 className={`${inter.className} text-lg font-semibold`}>
                  {post.title}
                </h2>

                <div className="flex justify-between items-center">
                  <div>
                    <p
                      className={`${inter.className} text-sm text-neutral-600`}
                    >
                      {post.author || "Shahzad Ahmad"}
                    </p>

                    <time
                      className={`${inter.className} text-xs text-neutral-500`}
                    >
                      {date}
                    </time>
                  </div>

                  <div
                    className="
                      w-8 h-8
                      rounded-full
                      bg-black
                      text-white
                      flex items-center justify-center
                      transition-transform
                      group-hover:translate-x-1
                    "
                  >
                    <FiArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* PAGINATION */}
      <nav className="flex justify-center mt-16 gap-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="
            px-4 py-2
            border
            rounded-full
            text-sm
            disabled:opacity-40
            hover:bg-black hover:text-white
            transition-colors
          "
        >
          Prev
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`
              px-4 py-2
              rounded-full
              text-sm
              border
              transition-colors
              ${
                page === num
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
              }
            `}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={page === totalPages}
          className="
            px-4 py-2
            border
            rounded-full
            text-sm
            disabled:opacity-40
            hover:bg-black hover:text-white
            transition-colors
          "
        >
          Next
        </button>
      </nav>
    </section>
  );
}

export default memo(BlogGridClient);