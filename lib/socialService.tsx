import supabase from "@/lib/supabase";

export const socialService = {

  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getLikesCount(caseId) {
    const { count } = await supabase
      .from("case_study_likes")
      .select("*", { count: "exact", head: true })
      .eq("case_study_id", caseId);

    return count || 0;
  },

  async checkIfLiked(caseId, userId) {
    const { data } = await supabase
      .from("case_study_likes")
      .select("id")
      .eq("case_study_id", caseId)
      .eq("user_id", userId)
      .single();

    return !!data;
  },

  async addLike(caseId, userId) {
    return await supabase
      .from("case_study_likes")
      .insert([{ case_study_id: caseId, user_id: userId }]);
  },

  async removeLike(caseId, userId) {
    return await supabase
      .from("case_study_likes")
      .delete()
      .eq("case_study_id", caseId)
      .eq("user_id", userId);
  },

  async getComments(caseId) {
    const { data } = await supabase
      .from("case_study_comments")
      .select(`
        id,
        comment_text,
        user_id,
        created_at,
        profiles:user_id (
          name,
          avatar_url,
          country
        )
      `)
      .eq("case_study_id", caseId)
      .order("created_at", { ascending: false });

    return data || [];
  },

  async addComment(data) {
    return await supabase
      .from("case_study_comments")
      .insert([data]);
  },

  async updateComment(id, text) {
    return await supabase
      .from("case_study_comments")
      .update({ comment_text: text })
      .eq("id", id);
  },

  async deleteComment(id) {
    return await supabase
      .from("case_study_comments")
      .delete()
      .eq("id", id);
  }
};