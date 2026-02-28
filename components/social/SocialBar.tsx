"use client";

import { useRouter } from "next/navigation";
import { socialService } from "@/lib/socialService";
import { useComments } from "@/hooks/useComments";
import { useShare } from "@/hooks/useShare";
import { useLikes } from "@/hooks/useLikes";
import CommentItem from "./CommentItem";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import {
  Heart,
  MessageCircle,
  Share2,
  X,
} from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function SocialBar({ caseId, slug }) {
  const router = useRouter();

  const { likes, hasLiked, toggleLike } = useLikes(caseId);

  const {
    comments,
    addComment,
    updateComment,
    deleteComment,
  } = useComments(caseId);

  const { share } = useShare();

  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [openAllComments, setOpenAllComments] = useState(false);

  useEffect(() => {
    socialService.getUser().then(setUser);
  }, []);

  const requireLogin = (action) => {
    router.push(`/auth?redirect=/case-studies/${slug}&action=${action}`);
  };

  const handleLike = async () => {
    const currentUser = await socialService.getUser();
    if (!currentUser) {
      requireLogin("like");
      return;
    }
    await toggleLike();
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const currentUser = await socialService.getUser();
    if (!currentUser) {
      requireLogin("comment");
      return;
    }

    setPosting(true);
    await addComment(newComment, currentUser.id);
    setNewComment("");
    setPosting(false);
  };

  const firstFourComments = comments.slice(0, 4);

  return (
    <>
      <div className={`mt-20 space-y-12 w-full ${inter.className}`}>

        {/* ================= PREMIUM INTERACTION BAR ================= */}
        <div className="flex gap-6 md:gap-12 items-center text-base sm:text-lg font-medium -mt-10">

          {/* LIKE */}
          <button
            onClick={handleLike}
            className="group flex items-center gap-6 transition-all duration-300 hover:scale-105 mx-4 md:mx-10"
          >
            <div className={`p-3 rounded-full transition-all duration-300 
              ${hasLiked 
                ? "bg-red-100 text-red-600" 
                : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
              }`}
            >
              <Heart
                size={20}
                className={`transition-all duration-300 ${
                  hasLiked ? "fill-red-600" : ""
                }`}
              />
            </div>
            <span className="text-gray-800">{likes}</span>
          </button>

          {/* COMMENTS */}
          <button
            onClick={() => setOpenAllComments(true)}
            className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
          >
            <div className="p-3 rounded-full bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition">
              <MessageCircle size={20} />
            </div>
            <span className="text-gray-800">{comments.length}</span>
          </button>

          {/* SHARE */}
          <button
            onClick={share}
            className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
          >
            <div className="p-3 rounded-full bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition">
              <Share2 size={20} />
            </div>
            <span className="text-gray-800">Share</span>
          </button>

        </div>

        {/* ================= COMMENT INPUT ================= */}
        <div className="bg-[#F5F3EF] rounded-3xl shadow-xl border border-gray-200 p-8 transition-all duration-300">

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="
              w-full
              min-h-[120px]
              p-5
              rounded-2xl
              text-sm sm:text-base
              resize-none
              bg-white
              border
              border-gray-200
              focus:outline-none
              focus:border-black
              focus:ring-4
              focus:ring-black/5
              transition-all
            "
          />

          <div className="flex justify-end mt-6">
            <button
              onClick={handleAddComment}
              disabled={posting}
              className="
                px-7 py-3
                rounded-xl
                bg-black
                text-white
                text-sm sm:text-base
                font-semibold
                transition-all
                hover:opacity-90
                active:scale-95
                disabled:opacity-50
                shadow-lg
              "
            >
              {posting ? "Posting..." : "Post Comment"}
            </button>
          </div>

        </div>

        {/* ================= COMMENTS LIST ================= */}
        <div className="space-y-8">

          <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
            Comments ({comments.length})
          </h3>

          {firstFourComments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              user={user}
              updateComment={updateComment}
              deleteComment={deleteComment}
            />
          ))}

          {comments.length > 4 && (
            <button
              onClick={() => setOpenAllComments(true)}
              className="
                w-full
                py-4
                rounded-2xl
                bg-gray-100
                border
                border-gray-200
                font-medium
                text-sm sm:text-base
                hover:bg-gray-200
                transition
              "
            >
              View All Comments ({comments.length})
            </button>
          )}

        </div>
      </div>

      {/* ================= PREMIUM MODAL ================= */}
      {openAllComments && (
        <div className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center px-4 ${inter.className}`}>

          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn">

            <div className="flex justify-between items-center px-8 py-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                All Comments ({comments.length})
              </h2>
              <button
                onClick={() => setOpenAllComments(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-8 space-y-6 bg-[#F9F8F6]">

              {comments.map((c) => (
                <CommentItem
                  key={c.id}
                  comment={c}
                  user={user}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                />
              ))}

            </div>

          </div>
        </div>
      )}
    </>
  );
}