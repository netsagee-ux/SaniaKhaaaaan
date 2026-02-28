import dynamic from "next/dynamic";
import WhoWeAre from "./Components/WhoWeAre";

/* ---------- Lazy Load Below Fold Sections ---------- */

const MissionSection = dynamic(
  () => import("@/components/MissionSection"),
  { ssr: true }
);

const CaseStudy = dynamic(
  () => import("@/components/ClientsResults2"),
  { ssr: true }
);

const RecognitionSection = dynamic(
  () => import("@/components/About/RecognitionSection"),
  { ssr: true }
);

const CallToAction = dynamic(
  () => import("@/components/CallToAction"),
  { ssr: true }
);

export default function AboutPage() {
  return (
    <>
      <WhoWeAre />
      <MissionSection />
      <CaseStudy />
      <RecognitionSection />
      <CallToAction />
    </>
  );
}