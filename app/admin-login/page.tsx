"use client";

import { useState, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { Inter, Poppins } from "next/font/google";

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

function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------- HANDLERS ---------- */

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const login = useCallback(async () => {
    if (loading) return;

    setError("");

    if (!email || !password) {
      setError("Enter email and password");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Store login timestamp
      try {
        localStorage.setItem(
          "admin_login_time",
          Date.now().toString()
        );
      } catch {}

      router.replace("/admin");

    } catch {
      setError("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [email, password, loading, router]);

  /* ---------- UI ---------- */

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-br
        from-[#f7f5f2]
        via-[#ece7de]
        to-[#e3ded5]
        px-4
      "
    >
      <div
        className="
          w-full max-w-md
          bg-white
          shadow-xl
          rounded-2xl
          p-8
          space-y-6
        "
      >
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className={`${inter.className} text-3xl`}>
            Admin Login
          </h1>

          <p className={`${poppins.className} text-gray-500 text-sm`}>
            Secure dashboard access
          </p>
        </div>

        {/* INPUTS */}
        <div className="space-y-4">
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={`
              ${poppins.className}
              w-full px-4 py-3
              border rounded-lg
              focus:outline-none
              focus:ring-2 focus:ring-black/20
            `}
          />

          <input
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className={`
              ${poppins.className}
              w-full px-4 py-3
              border rounded-lg
              focus:outline-none
              focus:ring-2 focus:ring-black/20
            `}
          />
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="
              text-red-600
              text-sm
              text-center
              bg-red-50
              border border-red-200
              p-3
              rounded-lg
            "
          >
            {error}
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={login}
          disabled={loading}
          className={`
            ${poppins.className}
            w-full py-3
            bg-black text-white
            rounded-lg
            hover:opacity-90
            transition-opacity
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default memo(LoginPage);