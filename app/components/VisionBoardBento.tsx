"use client";

import { BentoCard } from "./BentoCard";
import { CirclePattern } from "./SpeakingBento";
import { motion } from "framer-motion";
import { BuildCircle } from "./BuildCircle";

export function VisionBoardBento({ linkTo }: { linkTo?: string }) {
  return (
    <BentoCard height="h-[300px]" linkTo={linkTo}>
      <div className="flex flex-col">
        <div className="z-10 h-full">
          <div className="flex h-full flex-col justify-between">
            <h3 className="mb-2 text-base font-medium">Vision Board</h3>
            <p className="max-h-[150px] overflow-hidden text-base text-text-secondary">
              Some things I would love to build in future.
            </p>
          </div>
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
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2"></div>
        </div>
        <span className="absolute -bottom-32 left-1/2 -translate-x-1/2">
          <CirclePattern />
        </span>
      </div>
    </BentoCard>
  );
}
