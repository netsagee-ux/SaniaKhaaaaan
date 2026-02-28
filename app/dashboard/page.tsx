"use client";

import { useEffect, useState, useRef } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  FiLogOut,
  FiStar,
  FiClock,
  FiEdit3,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";

import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function Dashboard() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const outside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  const getData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUser(user);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
    setName(data?.name || "");
    setLoading(false);
  };

  const selectFile = (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setMenuOpen(false);
  };

  const saveAvatar = async () => {
    if (!file) return;
    try {
      setUploading(true);
      const ext = file.name.split(".").pop();
      const path = `${user.id}.${ext}`;

      await supabase.storage.from("avatars").upload(path, file, {
        upsert: true,
      });

      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const avatarUrl = data.publicUrl + "?t=" + Date.now();

      await supabase.from("profiles").upsert({
        id: user.id,
        avatar_url: avatarUrl,
      });

      setProfile((prev: any) => ({ ...prev, avatar_url: avatarUrl }));
      setPreview(null);
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const removeAvatar = async () => {
    await supabase.from("profiles").upsert({
      id: user.id,
      avatar_url: null,
    });

    setProfile((prev: any) => ({ ...prev, avatar_url: null }));
    setMenuOpen(false);
  };

  const saveName = async () => {
    await supabase.from("profiles").upsert({
      id: user.id,
      name,
    });

    setProfile((prev: any) => ({ ...prev, name }));
    setEditingName(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div
        className={`${poppins.variable} min-h-screen flex items-center justify-center bg-white px-4`}
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <div className="animate-pulse text-gray-400 text-sm sm:text-base">
          Loading your workspace...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${inter.variable} ${poppins.variable} min-h-screen bg-[#e9e5df]/95 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-10 sm:py-14 lg:py-20 mt-16 sm:mt-20`}
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111] tracking-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Manage your profile and settings
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full sm:w-auto bg-black text-white px-6 sm:px-7 py-3 rounded-2xl text-sm font-medium shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5"
        >
          <FiLogOut className="inline mr-2" />
          Logout
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="max-w-6xl mx-auto bg-white rounded-[28px] sm:rounded-[32px] border border-[#f0f0f0] shadow-[0_20px_60px_rgba(0,0,0,0.04)] p-6 sm:p-10 lg:p-14 transition-all duration-500">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {/* AVATAR */}
          <div className="relative group">
            <img
              src={
                preview ||
                profile?.avatar_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  name || user.email
                )}`
              }
              className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full object-cover ring-4 sm:ring-8 ring-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition duration-500 group-hover:scale-105"
              alt="User Avatar"
            />
          </div>

          {/* EDIT */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-sm text-gray-500 hover:text-black transition font-medium flex items-center gap-2"
            >
              <FiEdit3 /> Edit Profile
            </button>

            {menuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 mt-4 w-64 bg-white border border-[#f2f2f2] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden z-30 animate-dropdown">
                <label className="flex items-center gap-3 px-6 py-4 text-sm hover:bg-[#fafafa] cursor-pointer transition">
                  <FiUpload /> Update Photo
                  <input hidden type="file" accept="image/*" onChange={selectFile} />
                </label>

                <button
                  onClick={removeAvatar}
                  className="w-full flex gap-3 px-6 py-4 text-sm text-red-500 hover:bg-[#fff5f5] transition"
                >
                  <FiTrash2 /> Remove Photo
                </button>

                <button
                  onClick={() => setEditingName(true)}
                  className="w-full flex gap-3 px-6 py-4 text-sm hover:bg-[#fafafa] transition"
                >
                  <FiEdit3 /> Update Name
                </button>
              </div>
            )}
          </div>

          {file && (
            <button
              onClick={saveAvatar}
              className="w-full sm:w-auto bg-black text-white px-6 py-2.5 rounded-xl text-sm shadow hover:shadow-lg transition-all duration-300"
            >
              {uploading ? "Saving..." : "Save Photo"}
            </button>
          )}

          {editingName ? (
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:w-auto border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition"
              />
              <button
                onClick={saveName}
                className="bg-black text-white px-4 py-2 rounded-xl text-sm"
              >
                Save
              </button>
            </div>
          ) : (
            <h2
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#111] tracking-tight text-center"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {profile?.name || user.email}
            </h2>
          )}

          <p className="text-xs sm:text-sm text-gray-400 break-all text-center">
            {user.email}
          </p>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="max-w-6xl mx-auto mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white border border-[#f2f2f2] rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500">
          <h3
            className="font-semibold flex gap-3 text-[#111]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiStar /> Best Features
          </h3>
          <p className="text-sm text-gray-500 mt-4">
            Elegant customization, seamless interactions and refined design.
          </p>
        </div>

        <div className="bg-white border border-[#f2f2f2] rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500">
          <h3
            className="font-semibold flex gap-3 text-[#111]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiClock /> Coming Soon
          </h3>
          <p className="text-sm text-gray-500 mt-4">
            Advanced analytics, automation and intelligent insights.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}