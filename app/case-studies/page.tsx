export const dynamic = "force-static";
export const revalidate = 60;

import CaseStudiesGrid from "./Components/CaseStudiesGrid";
import CaseStudyHero from "./Components/CaseStudiesHero";

export default function CaseStudy() {
  return (
    <main>
      <CaseStudyHero />
      <CaseStudiesGrid />
    </main>
  );
}