import supabase from "@/lib/supabase";
import BlogGridClient from "./BlogGridClient";

export const revalidate = 60;

export default async function BlogGrid() {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select(
        "id,title,slug,cover_image,author,created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return <BlogGridClient posts={[]} />;
    }

    // Ensure stable empty fallback
    const posts = data ?? [];

    return <BlogGridClient posts={posts} />;

  } catch (err) {
    console.error("Unexpected error:", err);
    return <BlogGridClient posts={[]} />;
  }
}