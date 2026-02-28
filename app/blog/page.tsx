import BlogGrid from "./Components/BlogGrid";
import BlogHero from "./Components/BlogHero";

export const dynamic = "force-static";
export const revalidate = 60;

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
      <BlogGrid />
    </main>
  );
}