"use client";

import { useState, memo, useCallback, useRef } from "react";
import supabase from "@/lib/supabase";
import { Inter, Poppins } from "next/font/google";
import { slugify } from "@/lib/slugify";

/* ---------- FONTS ---------- */

const inter = Inter({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/* ---------- TYPES ---------- */

type FormType = {
  title: string;
  subtitle: string;
  client_name: string;
  category: string;
  platforms: string;
  year: string;
  cover_video: string;
  cover_image: string;
  challenge: string;
  strategy: string;
  problem: string;
  solution: string;
  results: string;
  gallery: string;
};

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

/* ---------- CONSTANTS ---------- */

const INITIAL_FORM: FormType = {
  title: "",
  subtitle: "",
  client_name: "",
  category: "",
  platforms: "",
  year: "",
  cover_video: "",
  cover_image: "",
  challenge: "",
  strategy: "",
  problem: "",
  solution: "",
  results: "",
  gallery: "",
};

/* ---------- INPUT ---------- */

const Input = memo(function Input({
  label,
  value,
  onChange,
}: InputProps) {
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value),
    [onChange]
  );

  return (
    <div className="space-y-2">
      <p className={`${poppins.className} text-sm text-neutral-600`}>
        {label}
      </p>

      <input
        value={value}
        onChange={handleInput}
        placeholder={label}
        className="
          w-full px-4 py-3 rounded-xl
          bg-white border border-neutral-200
          shadow-sm outline-none
          focus:border-indigo-500
          focus:ring-4 focus:ring-indigo-100
          transition
        "
      />
    </div>
  );
});

/* ---------- TEXTAREA ---------- */

const TextArea = memo(function TextArea({
  label,
  value,
  onChange,
}: TextAreaProps) {
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      onChange(e.target.value),
    [onChange]
  );

  return (
    <div className="space-y-2">
      <p className={`${poppins.className} text-sm text-neutral-600`}>
        {label}
      </p>

      <textarea
        value={value}
        onChange={handleInput}
        placeholder={label}
        className="
          w-full min-h-[160px] px-4 py-3 rounded-xl
          bg-white border border-neutral-200
          shadow-sm outline-none
          focus:border-indigo-500
          focus:ring-4 focus:ring-indigo-100
          transition resize-y
        "
      />
    </div>
  );
});

/* ---------- PAGE ---------- */

function AdminPage() {
  const [form, setForm] = useState<FormType>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormType>(form);
  formRef.current = form;

  /* ---------- HANDLERS ---------- */

  const handleChange = useCallback(
    (key: keyof FormType, value: string) => {
      setForm((prev) => {
        if (prev[key] === value) return prev;
        return { ...prev, [key]: value };
      });
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (loading) return;

    const currentForm = formRef.current;

    if (!currentForm.title.trim()) {
      alert("Title required");
      return;
    }

    try {
      setLoading(true);

      const slug = slugify(currentForm.title.trim());

      const { error } = await supabase
        .from("case_studies")
        .insert([{ ...currentForm, slug }]);

      if (error) {
        alert("Error saving");
        return;
      }

      alert("Saved!");
      setForm(INITIAL_FORM);

    } catch (err) {
      console.log(err);
      alert("Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [loading]);

  /* ---------- UI ---------- */

  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-indigo-50 via-white to-purple-50
      flex justify-center
      px-4 py-10 sm:py-14 mt-20
    ">
      <div className="w-full max-w-6xl">

        <div className="text-center mb-10">
          <h1 className={`${inter.className}
            text-3xl sm:text-5xl font-semibold`}>
            Case Study Dashboard
          </h1>

          <p className={`${poppins.className}
            mt-3 text-neutral-600`}>
            Manage and publish high-quality case studies
          </p>
        </div>

        <div className="
          bg-white rounded-3xl
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          p-6 sm:p-10 space-y-12
        ">

          <section className="space-y-6">
            <h2 className={`${inter.className} text-2xl font-semibold`}>
              Basic Info
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Title" value={form.title} onChange={(v) => handleChange("title", v)} />
              <Input label="Subheading" value={form.subtitle} onChange={(v) => handleChange("subtitle", v)} />
              <Input label="Client Name" value={form.client_name} onChange={(v) => handleChange("client_name", v)} />
              <Input label="Category" value={form.category} onChange={(v) => handleChange("category", v)} />
              <Input label="Platforms" value={form.platforms} onChange={(v) => handleChange("platforms", v)} />
              <Input label="Year" value={form.year} onChange={(v) => handleChange("year", v)} />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className={`${inter.className} text-2xl font-semibold`}>
              Media
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Cover Video URL" value={form.cover_video} onChange={(v) => handleChange("cover_video", v)} />
              <Input label="Cover Image URL" value={form.cover_image} onChange={(v) => handleChange("cover_image", v)} />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className={`${inter.className} text-2xl font-semibold`}>
              Case Study Content
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <TextArea label="Challenge" value={form.challenge} onChange={(v) => handleChange("challenge", v)} />
              <TextArea label="Strategy" value={form.strategy} onChange={(v) => handleChange("strategy", v)} />
              <TextArea label="Problem" value={form.problem} onChange={(v) => handleChange("problem", v)} />
              <TextArea label="Solution" value={form.solution} onChange={(v) => handleChange("solution", v)} />
              <TextArea label="Results" value={form.results} onChange={(v) => handleChange("results", v)} />
              <TextArea label="Gallery URLs" value={form.gallery} onChange={(v) => handleChange("gallery", v)} />
            </div>
          </section>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`${inter.className}
              w-full py-4 rounded-2xl text-lg font-medium
              text-white bg-gradient-to-r
              from-indigo-600 to-purple-600
              hover:opacity-90 active:scale-95
              disabled:opacity-60 disabled:cursor-not-allowed
              transition shadow-lg`}
          >
            {loading ? "Publishing..." : "Publish Case Study"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default memo(AdminPage);