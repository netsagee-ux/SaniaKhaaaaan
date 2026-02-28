"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import supabase from "@/lib/supabase";

export default function TrackView({ type = "site", slug = "" }) {

  const pathname = usePathname();
  const tracked = useRef(false);

  useEffect(() => {

    if (tracked.current) return;
    tracked.current = true;

    track(); // ✅ run immediately (no delay)

    async function track() {
      try {

        const pageKey = slug || pathname;
        if (!pageKey) return;

        // Visitor ID
        let visitorId = localStorage.getItem("visitor_id");

        if (!visitorId) {
          visitorId = crypto.randomUUID();
          localStorage.setItem("visitor_id", visitorId);
        }

        // Country
        let country = "Unknown";

        try {
          const res = await fetch("https://ipapi.co/json/");
          const geo = await res.json();
          country = geo.country_name || "Unknown";
        } catch {}

        // ✅ INSERT ANALYTICS
        const { error: insertError } = await supabase
          .from("analytics")
          .insert([{
            page_type: type,
            slug: pageKey,
            visitor_id: visitorId,
            country
          }]);

        if (insertError) {
          console.log("Analytics insert error:", insertError);
        }

        // ✅ INCREMENT VIEWS
        if (type === "blog" && slug) {
          const { error } = await supabase.rpc("increment_views", {
            table_name: "blogs",
            slug_value: slug
          });

          if (error) console.log("Blog views RPC error:", error);
        }

        if (type === "case" && slug) {
          const { error } = await supabase.rpc("increment_views", {
            table_name: "case_studies",
            slug_value: slug
          });

          if (error) console.log("Case views RPC error:", error);
        }

      } catch (err) {
        console.log("Tracking error:", err);
      }
    }

  }, [slug, pathname, type]);

  return null;
}
