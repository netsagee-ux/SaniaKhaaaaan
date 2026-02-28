"use client";

import { useEffect, useState, useCallback } from "react";
import { socialService } from "@/lib/socialService";

export function useComments(caseId) {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadComments = useCallback(async () => {
    const data = await socialService.getComments(caseId);
    setComments(data);
  }, [caseId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const addComment = async (text, userId) => {
    if (!text.trim()) return;

    setLoading(true);

    await socialService.addComment({
      case_study_id: caseId,
      user_id: userId,
      comment_text: text.trim(),
    });

    await loadComments(); // refresh UI
    setLoading(false);
  };

  const updateComment = async (id, text) => {
    await socialService.updateComment(id, text);
    loadComments();
  };

  const deleteComment = async (id) => {
    await socialService.deleteComment(id);
    loadComments();
  };

  return {
    comments,
    addComment,
    updateComment,
    deleteComment,
    loading,
  };
}