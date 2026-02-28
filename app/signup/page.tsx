"use client";

import { useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";

import {
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiStar,
  FiClock,
  FiShield,
  FiZap,
} from "react-icons/fi";

import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* -------- STATIC COUNTRY LIST (OUTSIDE COMPONENT = NO RECREATION) -------- */
const countries = [
  { value: "PK", label: "Pakistan" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IT", label: "Italy" },
  { value: "ES", label: "Spain" },
  { value: "NL", label: "Netherlands" },
  { value: "SE", label: "Sweden" },
  { value: "NO", label: "Norway" },
  { value: "CH", label: "Switzerland" },
  { value: "AT", label: "Austria" },
  { value: "BE", label: "Belgium" },
  { value: "DK", label: "Denmark" },
  { value: "FI", label: "Finland" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "IE", label: "Ireland" },
  { value: "TR", label: "Turkey" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "QA", label: "Qatar" },
  { value: "KW", label: "Kuwait" },
  { value: "BH", label: "Bahrain" },
  { value: "OM", label: "Oman" },
  { value: "JO", label: "Jordan" },
  { value: "EG", label: "Egypt" },
  { value: "IN", label: "India" },
  { value: "CN", label: "China" },
  { value: "JP", label: "Japan" },
  { value: "KR", label: "South Korea" },
  { value: "MY", label: "Malaysia" },
  { value: "SG", label: "Singapore" },
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
  { value: "NZ", label: "New Zealand" },
];

export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = useMemo(() => searchParams.get("redirect"), [searchParams]);
  const action = useMemo(() => searchParams.get("action"), [searchParams]);

  const [name, setName] = useState("");
  const [country, setCountry] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formatError = useCallback((msg) => {
    if (msg.includes("already")) return "This email is already registered.";
    if (msg.includes("Password")) return "Password must be at least 6 characters.";
    if (msg.includes("email")) return "Please enter a valid email.";
    return msg;
  }, []);

  const handleSignup = useCallback(async () => {
    if (loading) return;

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }
    if (!password.trim() || password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const user = data?.user;

      if (user) {
        await supabase.from("profiles").upsert({
          id: user.id,
          name: name.trim(),
          country: country?.label || null,
        });
      }

      router.push(`/login?redirect=${redirect || ""}&action=${action || ""}`);
    } catch (err) {
      setErrorMsg(formatError(err.message));
    } finally {
      setLoading(false);
    }
  }, [email, password, name, country, router, redirect, action, formatError, loading]);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const formatCountryOption = useCallback(
    (c) => (
      <div className="flex items-center gap-2">
        <ReactCountryFlag countryCode={c.value} svg />
        <span>{c.label}</span>
      </div>
    ),
    []
  );

  const featureList = useMemo(
    () => [
      { icon: <FiStar />, title: "Best Features", text: "Premium branding tools and clean experience." },
      { icon: <FiShield />, title: "Security First", text: "Safe authentication and profile protection." },
      { icon: <FiZap />, title: "Performance", text: "Fast and optimized platform." },
      { icon: <FiClock />, title: "Coming Soon", text: "Analytics and automation tools." },
    ],
    []
  );

  return (
    <div className={`min-h-screen bg-white relative overflow-hidden flex items-center justify-center px-4 ${poppins.className}`}>
      
      {/* Background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-100 blur-[150px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-100 blur-[150px] rounded-full bottom-[-150px] right-[-150px]" />

      <div className="relative w-full max-w-5xl grid md:grid-cols-2 gap-6">

        {/* LEFT SECTION */}
        <div className="hidden md:flex flex-col justify-center p-8">
          <h1 className={`${inter.className} text-5xl font-bold text-gray-900 leading-tight`}>
            Build Your <br /> Brand Presence
          </h1>

          <p className="mt-4 text-gray-500 text-sm max-w-sm">
            Join a platform designed for creators, strategists and professionals.
          </p>

          <div className="mt-8 space-y-4">
            {featureList.map((f, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="mt-1">{f.icon}</span>
                <div>
                  <h3 className={`${inter.className} font-semibold`}>
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-500">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 sm:p-10">

          <div className="text-center mb-8">
            <h2 className={`${inter.className} text-4xl font-bold text-gray-900`}>
              Create Account
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Start building your professional presence
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl">
              <FiAlertCircle className="mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-4">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              autoComplete="name"
              className="w-full h-12 px-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm"
            />

            <Select
              options={countries}
              value={country}
              onChange={setCountry}
              placeholder="Search country..."
              className="text-sm"
              formatOptionLabel={formatCountryOption}
              menuPortalTarget={typeof window !== "undefined" ? document.body : null}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className="w-full h-12 px-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Password"
                className="w-full h-12 px-4 pr-12 rounded-2xl bg-gray-50 border border-gray-200 text-sm"
              />

              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className={`w-full h-12 rounded-2xl bg-black text-white text-sm font-semibold ${inter.className} disabled:opacity-70`}
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}