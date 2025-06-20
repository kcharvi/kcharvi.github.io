// app/components/VisionBoardAnimatedCircle.tsx

"use client";
import { motion } from "framer-motion";
import { BuildCircle } from "./BuildCircle";

export function VisionBoardAnimatedCircle() {
  return (
    <div className="user-select-none pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 group-hover:-bottom-1">
      <motion.div
        animate={{
          x: ["-100%", "0%", "0%", "100%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          times: [0, 0.25, 0.75, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <BuildCircle ImageUrl="/about/me_working.svg" />
      </motion.div>
    </div>
  );
}
