"use client";

import { useEffect, useState, memo } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

/* ---------- STATIC CONSTANT ---------- */

const ADMIN_EMAILS = new Set([
  "shahzadbaloch0370783@gmail.com",
]);

/* ---------- COMPONENT ---------- */

function AdminClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkAdmin = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          router.replace("/admin-login");
          return;
        }

        const email = data.session?.user?.email;

        if (!email || !ADMIN_EMAILS.has(email)) {
          setAuthorized(false);
          router.replace("/admin-login");
        } else {
          setAuthorized(true);
        }

      } catch {
        if (mounted) {
          router.replace("/admin-login");
        }
      }
    };

    checkAdmin();

    return () => {
      mounted = false;
    };
  }, [router]);

  /* ---------- RENDER ---------- */

  if (authorized === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}

export default memo(AdminClient);