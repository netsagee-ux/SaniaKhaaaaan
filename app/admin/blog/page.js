"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { Inter, Poppins } from "next/font/google";
import { FiLoader } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import supabase from "@/lib/supabase";
import { slugify } from "@/lib/slugify";

/* ---------- FONTS ---------- */

const inter = Inter({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/* ---------- STATIC INITIAL FORM ---------- */

const INITIAL_FORM = {
  title: "",
  cover_image: "",
  excerpt: "",
  content: "",
  author: "",
};

/* ---------- FIELD COMPONENT ---------- */

const Field = memo(function Field({
  label,
  value,
  onChange,
  textarea,
}) {
  const handleInputChange = useCallback(
    (e) => onChange(e.target.value),
    [onChange]
  );

  return (
    <div className="relative group">
      {textarea ? (
        <textarea
          value={value}
          onChange={handleInputChange}
          className={`${poppins.className}
            w-full p-4 pt-6 h-44
            rounded-2xl border border-slate-200
            bg-white/60 backdrop-blur
            focus:ring-2 focus:ring-indigo-200
            outline-none`}
        />
      ) : (
        <input
          value={value}
          onChange={handleInputChange}
          className={`${poppins.className}
            w-full p-4 pt-6
            rounded-2xl border border-slate-200
            bg-white/60 backdrop-blur
            focus:ring-2 focus:ring-indigo-200
            outline-none`}
        />
      )}

      <label className="absolute left-4 top-2 text-xs text-slate-500">
        {label}
      </label>
    </div>
  );
});

/* ---------- BLOG ADMIN ---------- */

function BlogAdmin() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* ---------- STABLE HANDLERS ---------- */

  const handleChange = useCallback((key, value) => {
    setForm((prev) => {
      if (prev[key] === value) return prev; // prevent useless re-render
      return { ...prev, [key]: value };
    });
  }, []);

  const publish = useCallback(async () => {
    if (!form.title || !form.content) {
      setErrorMsg("Title & content required");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const slug = slugify(form.title);

      const { error } = await supabase
        .from("blogs")
        .insert([{ ...form, slug }]);

      if (error) throw error;

      setShowSuccess(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [form]);

  /* ---------- SUCCESS AUTO CLOSE ---------- */

  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <>
      <div className="
        min-h-screen
        bg-gradient-to-br
        from-[#f5f2ec]
        via-[#ece7de]
        to-[#e4ded3]
        py-14 px-4 mt-10
      ">
        <div className="
          max-w-4xl mx-auto
          bg-white/70 backdrop-blur-xl
          p-10 rounded-[34px]
          shadow-[0_25px_70px_rgba(0,0,0,0.12)]
        ">
          <h1 className={`${inter.className} text-4xl mb-3`}>
            Create New Blog
          </h1>

          <p className={`${poppins.className} text-slate-500 mb-10`}>
            Write, design and publish your content beautifully.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Field
              label="Blog Title"
              value={form.title}
              onChange={(v) => handleChange("title", v)}
            />
            <Field
              label="Author Name"
              value={form.author}
              onChange={(v) => handleChange("author", v)}
            />
            <Field
              label="Cover Image URL"
              value={form.cover_image}
              onChange={(v) => handleChange("cover_image", v)}
            />
            <Field
              label="Short Excerpt"
              value={form.excerpt}
              onChange={(v) => handleChange("excerpt", v)}
            />
          </div>

          <div className="mt-6">
            <Field
              label="Blog Content"
              textarea
              value={form.content}
              onChange={(v) => handleChange("content", v)}
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 mt-4">{errorMsg}</p>
          )}

          <button
            onClick={publish}
            disabled={loading}
            className={`${inter.className}
              mt-8 w-full py-5
              rounded-2xl text-white
              bg-gradient-to-r
              from-indigo-600 via-purple-600 to-indigo-600
              hover:scale-[1.02]
              transition
              flex items-center justify-center gap-2`}
          >
            {loading && <FiLoader className="animate-spin" />}
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/40 backdrop-blur
            "
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="
                bg-white p-8
                rounded-3xl text-center
                shadow-2xl max-w-sm w-full
              "
            >
              <div className="
                w-14 h-14 mx-auto mb-4
                rounded-full bg-green-100
                flex items-center justify-center
                text-green-600 text-2xl
              ">
                ✓
              </div>

              <h2 className="text-2xl font-semibold mb-2">
                Blog Published 🎉
              </h2>

              <p className="text-slate-500">
                Your blog is now live.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(BlogAdmin);