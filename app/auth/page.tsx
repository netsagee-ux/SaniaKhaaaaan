"use client";

import { useSearchParams, useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { useEffect, useMemo } from "react";

export default function Auth() {
  const router = useRouter();
  const params = useSearchParams();

  /* ---------- STABLE PARAMS ---------- */

  const redirect = useMemo(() => {
    const value = params.get("redirect");
    return value && value.startsWith("/") ? value : "/";
  }, [params]);

  const action = useMemo(() => {
    return params.get("action") || "";
  }, [params]);

  /* ---------- REDIRECT LOGIC ---------- */

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (!mounted) return;

        if (data?.session) {
          router.replace(
            `${redirect}?action=${action}&done=true`
          );
          return;
        }

        router.replace(
          `/login?redirect=${encodeURIComponent(
            redirect
          )}&action=${action}`
        );
      } catch {
        if (mounted) {
          router.replace("/login");
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [router, redirect, action]);

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-sm">
        Redirecting...
      </p>
    </div>
  );
}