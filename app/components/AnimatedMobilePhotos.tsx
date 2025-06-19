"use client";

import { motion } from "framer-motion";
import { ShadowBox } from "./ShadowBox";
import Image from "next/image";

interface AnimatedMobilePhotosProps {
  delay: number;
}

export function AnimatedMobilePhotos({ delay }: AnimatedMobilePhotosProps) {
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
            <ShadowBox width={170} height={252}></ShadowBox>
            <Image
              className="absolute left-0 top-2 h-[245px] w-[163px] rotate-[-5deg] rounded-lg object-cover"
              width={163}
              height={245}
              src="/charvi_headshot_1.png"
              alt="A headshot"
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
            <ShadowBox width={188} height={278}></ShadowBox>
            <Image
              className="absolute left-0 top-0 h-[280px] w-[190px] rotate-[-8deg] rounded-lg object-cover shadow-lg shadow-black/20"
              src="/charvi_speaking_photo.jpeg"
              alt="A headshot"
              width={190}
              height={280}
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
            <ShadowBox width={170} height={252}></ShadowBox>
            <Image
              className="absolute left-0 top-0 h-[245px] w-[163px] rotate-[10deg] rounded-lg object-cover shadow-lg shadow-black/20"
              src="/charvi_headshot_4.jpg"
              alt="A headshot"
              width={163}
              height={245}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
