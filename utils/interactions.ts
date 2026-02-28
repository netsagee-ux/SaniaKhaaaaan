import supabase from "@/lib/supabase";

export const likeCase = async(caseId:string,userId:string)=>{
  return supabase
    .from("case_study_likes")
    .insert({
      case_study_id: caseId,
      user_id: userId,
    });
};

export const commentCase =
async(caseId:string,userId:string,text:string)=>{
  return supabase
    .from("case_study_comments")
    .insert({
      case_study_id: caseId,
      user_id: userId,
      comment_text: text,
    });
};

export const shareCase =
async(caseId:string)=>{
  return supabase
    .from("case_study_shares")
    .insert({
      case_study_id: caseId,
      platform:"link",
    });
};
