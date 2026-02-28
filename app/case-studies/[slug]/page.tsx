import { notFound } from "next/navigation";
import { cache } from "react";
import supabase from "@/lib/supabase";

import Hero from "@/app/case-studies/Components/Case/Hero";
import InfoBar from "@/app/case-studies/Components/Case/InfoBar";
import ContentSections from "@/app/case-studies/Components/Case/ContentSections";
import Gallery from "@/app/case-studies/Components/Case/Gallery";

import TrackView from "@/components/TrackView";
import SocialBar from "@/components/social/SocialBar";

export const revalidate = 300;

export async function generateStaticParams() {
  const { data } = await supabase
    .from("case_studies")
    .select("slug");

  if (!data) return [];

  return data.map((item) => ({
    slug: item.slug,
  }));
}

const getCaseStudy = cache(async (slug: string) => {
  const { data } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  return data;
});

export default async function DetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  const decodedSlug = decodeURIComponent(slug);

  const data = await getCaseStudy(decodedSlug);

  if (!data) {
    notFound();
  }

  const galleryImages =
    typeof data.gallery === "string" && data.gallery.length > 0
      ? data.gallery
          .split(",")
          .map((i: string) => i.trim())
          .filter(
            (i: string) => i.startsWith("http") || i.startsWith("/")
          )
      : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <TrackView type="case" slug={decodedSlug} />

      <p className="text-sm text-gray-500 mb-6">
        👁 {(data.views ?? 0).toLocaleString()} views
      </p>

      <Hero data={data} />

      <div className="mt-8 space-y-8 border-b pb-10">
        <SocialBar caseId={data.id} slug={decodedSlug} />
      </div>

      <div className="mt-16 space-y-16">
        <InfoBar data={data} />
        <ContentSections data={data} />
        <Gallery images={galleryImages} />
      </div>
    </div>
  );
}