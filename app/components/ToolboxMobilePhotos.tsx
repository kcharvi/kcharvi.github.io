"use client";

import { motion } from "framer-motion";
import { ShadowBox } from "./ShadowBox";
import Image from "next/image";

interface ToolboxMobilePhotosProps {
  delay?: number;
}

export function ToolboxMobilePhotos({ delay = 0.5 }: ToolboxMobilePhotosProps) {
  return (
    <div className="relative -mx-12 lg:hidden">
      <div className="relative w-full overflow-hidden py-12">
        <div className="flex items-center justify-center space-x-14">
          <motion.div
            className="relative w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: delay,
            }}
          >
            <ShadowBox width={170} height={170}></ShadowBox>
            <Image
              className="absolute left-0 top-2 h-[163px] w-[163px] rotate-[-5deg] rounded-lg object-cover"
              width={163}
              height={163}
              src="/toolbox/studious_courses.svg"
              alt="Courses"
            />
          </motion.div>
          <motion.div
            className="relative w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: delay + 0.1,
            }}
          >
            <ShadowBox width={188} height={188}></ShadowBox>
            <Image
              className="absolute left-0 top-0 h-[180px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow-lg shadow-black/20"
              src="/toolbox/coder_programming.svg"
              alt="Programming"
              width={180}
              height={180}
            />
          </motion.div>
          <motion.div
            className="relative w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: delay + 0.2,
            }}
          >
            <ShadowBox width={170} height={170}></ShadowBox>
            <Image
              className="absolute left-0 top-0 h-[163px] w-[163px] rotate-[10deg] rounded-lg object-cover shadow-lg shadow-black/20"
              src="/toolbox/developer_mode.svg"
              alt="Development"
              width={163}
              height={163}
            />
          </motion.div>
          <motion.div
            className="relative w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: delay + 0.3,
            }}
          >
            <ShadowBox width={170} height={170}></ShadowBox>
            <Image
              className="absolute left-0 top-0 h-[163px] w-[163px] rotate-[-3deg] rounded-lg object-cover shadow-lg shadow-black/20"
              src="/toolbox/robot_aiml.svg"
              alt="AI/ML"
              width={163}
              height={163}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
