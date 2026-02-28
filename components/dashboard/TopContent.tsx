import { memo } from "react";
import TopBlogs from "./TopBlogs";
import TopCases from "./TopCases";

interface TopContentProps {
  topBlogs?: [string, number][];
  topCases?: [string, number][];
}

function TopContent({
  topBlogs = [],
  topCases = [],
}: TopContentProps) {
  return (
    <section className="grid lg:grid-cols-2 gap-8">
      <TopBlogs data={topBlogs} />
      <TopCases data={topCases} />
    </section>
  );
}

export default memo(TopContent);