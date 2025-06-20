// app/components/AnimatedImage.tsx

"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShadowBox } from "./ShadowBox";

interface AnimatedImageProps {
  images: string[];
  width: number;
  height: number;
  alt: string;
  rotation: number;
}

export function AnimatedImage({
  images,
  width,
  height,
  alt,
  rotation,
}: AnimatedImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const changeImage = useCallback(() => {
    setIsChanging(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  return (
    <div className="relative mx-auto w-fit">
      <ShadowBox width={width + 8} height={height + 8} />
      <motion.div
        animate={isChanging ? { scale: 0.95 } : { scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 10,
          duration: 0.4,
        }}
        onAnimationComplete={() => setIsChanging(false)}
        style={{ rotate: rotation }}
        className="absolute left-0 top-0 cursor-pointer"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            onClick={changeImage}
          >
            <Image
              className="h-[270px] w-[180px] rounded-lg object-cover shadow transition-opacity hover:opacity-90"
              src={images[currentIndex]}
              alt={alt}
              width={width}
              height={height}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
