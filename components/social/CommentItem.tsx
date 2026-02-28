"use client";

import { useState, useEffect, useRef } from "react";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function CommentItem({
  comment,
  user,
  updateComment,
  deleteComment,
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.comment_text);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isOwner = user && user.id === comment.user_id;

  // Determine display name properly
  const getDisplayName = () => {
    const name = comment.profiles?.name?.trim();
    if (name && !name.includes("@")) return name; // Use name if not email
    if (comment.profiles?.email) {
      return comment.profiles.email.split("@")[0]; // Email before @
    }
    return "User"; // Fallback
  };

  useEffect(() => {
    const outside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, []);

  const saveEdit = async () => {
    if (!text.trim()) return;
    await updateComment(comment.id, text.trim());
    setEditing(false);
  };

  const confirmDelete = async () => {
    if (!confirm("Delete this comment?")) return;
    await deleteComment(comment.id);
  };

  return (
    <div className={`w-full ${inter.className} ${poppins.className}`}>
      <div className="
        relative
        bg-[#E3DED6]
        border border-gray-300
        rounded-2xl
        p-4 sm:p-6
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
      ">

        {/* Header */}
        <div className="flex justify-between items-start gap-4">

          {/* User Info */}
          <div className="flex gap-3 items-start">
            <img
              src={
                comment.profiles?.avatar_url ||
                `https://ui-avatars.com/api/?name=${getDisplayName()}`
              }
              alt="avatar"
              className="
                w-9 h-9 sm:w-11 sm:h-11
                rounded-full
                object-cover
                border border-gray-300
                shadow-sm
              "
            />

            <div className="leading-tight">
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                {getDisplayName()}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                {comment.profiles?.country || "Unknown"}
              </p>
            </div>
          </div>

          {/* Menu */}
          {isOwner && !editing && (
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-600 hover:text-gray-900 text-xl transition"
              >
                ⋯
              </button>

              {menuOpen && (
                <div className="
                  absolute right-0 mt-2 w-36
                  bg-white
                  border border-gray-200
                  rounded-xl
                  shadow-lg
                  overflow-hidden
                  z-20
                ">
                  <button
                    onClick={() => {
                      setEditing(true);
                      setMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={confirmDelete}
                    className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Comment Text */}
        <div className="mt-4">
          {editing ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="
                w-full
                p-3
                border border-gray-400
                rounded-xl
                text-sm sm:text-base
                focus:ring-2
                focus:ring-gray-300
                focus:outline-none
                resize-none
                bg-white
                transition
              "
            />
          ) : (
            <p className="
              text-sm sm:text-base
              text-gray-800
              leading-relaxed
              break-words
            ">
              {comment.comment_text}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {editing && (
          <div className="mt-4 flex gap-3 text-xs sm:text-sm">
            <button
              onClick={saveEdit}
              className="
                px-4 py-1.5
                rounded-lg
                bg-black
                text-white
                hover:scale-[1.03]
                active:scale-[0.97]
                transition
              "
            >
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              className="
                px-4 py-1.5
                rounded-lg
                bg-gray-200
                text-gray-700
                hover:bg-gray-300
                transition
              "
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}