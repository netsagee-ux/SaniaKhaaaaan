
"use client";

export function useShare() {

  const share = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: "Check this case study",
        url
      });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return { share };
}