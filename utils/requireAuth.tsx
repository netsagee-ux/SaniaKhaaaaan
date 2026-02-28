import supabase from "@/lib/supabase";

export const requireAuth = async () => {
  const { data:{user} } =
    await supabase.auth.getUser();

  return user;
};
