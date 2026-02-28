"use client";

import { useEffect, useState, useCallback } from "react";
import { socialService } from "@/lib/socialService";

export function useLikes(caseId) {

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const loadLikes = useCallback(async () => {

    const currentUser = await socialService.getUser();
    setUser(currentUser);

    const count = await socialService.getLikesCount(caseId);
    setLikes(count);

    if (currentUser) {
      const isLiked = await socialService.checkIfLiked(caseId, currentUser.id);
      setLiked(isLiked);
    }

  }, [caseId]);

  useEffect(() => {
    loadLikes();
  }, [loadLikes]);

  const toggleLike = async (requireLogin) => {

    if (loading) return;

    const currentUser = await socialService.getUser();

    if (!currentUser) {
      requireLogin("like");
      return;
    }

    setLoading(true);

    if (!liked) {
      const { error } = await socialService.addLike(caseId, currentUser.id);
      if (!error) {
        setLiked(true);
        setLikes(p => p + 1);
      }
    } else {
      const { error } = await socialService.removeLike(caseId, currentUser.id);
      if (!error) {
        setLiked(false);
        setLikes(p => (p > 0 ? p - 1 : 0));
      }
    }

    setLoading(false);
  };

  return { likes, liked, toggleLike };
}