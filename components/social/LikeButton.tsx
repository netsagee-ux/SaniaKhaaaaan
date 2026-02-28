"use client";

import { useLikes } from "@/hooks/useLikes";

export default function LikeButton({
  caseId,
  requireLogin,
  vertical = false
}) {
  const { likes, toggleLike } = useLikes(caseId);

  if (vertical) {
    return (
      <button
        onClick={() => toggleLike(requireLogin)}
        className="flex flex-col items-center text-sm text-gray-600 hover:text-black transition"
      >
        👍
        <span className="text-xs">{likes}</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => toggleLike(requireLogin)}
      className="px-4 py-2 rounded-lg text-sm"
    >
      👍 {likes}
    </button>
  );
}