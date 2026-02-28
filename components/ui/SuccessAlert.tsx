"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= Animation Config ================= */

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 20 },
  visible: { scale: 1, opacity: 1, y: 0 },
};

const modalTransition = {
  duration: 0.3,
  ease: "easeOut",
};

interface SuccessAlertProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

function SuccessAlert({
  open,
  onClose,
  title = "Published Successfully",
  message = "Your blog is now live and visible to everyone.",
}: SuccessAlertProps) {

  // Early return prevents unnecessary tree building
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/40 backdrop-blur-sm
          will-change-opacity
        "
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={modalTransition}
          className="
            bg-white
            rounded-3xl
            shadow-2xl
            w-[90%] max-w-md
            p-8
            text-center
            will-change-transform
          "
        >
          {/* ICON */}
          <div
            className="
              w-14 h-14 mx-auto mb-5
              rounded-full
              bg-emerald-100
              flex items-center justify-center
              text-emerald-600
              text-2xl
            "
          >
            ✓
          </div>

          {/* TITLE */}
          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
            {title}
          </h2>

          {/* MESSAGE */}
          <p className="text-neutral-500 mb-6">
            {message}
          </p>

          {/* BUTTON */}
          <button
            onClick={onClose}
            className="
              w-full
              rounded-xl
              bg-black
              text-white
              py-3
              font-medium
              hover:opacity-90
              transition-opacity duration-200
            "
          >
            Continue
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(SuccessAlert);