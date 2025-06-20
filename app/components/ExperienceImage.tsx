// app/components/ExperienceImage.tsx

"use client";

import Image, { ImageProps } from "next/image";

import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import { Ref, forwardRef } from "react";

const MotionImage = motion(
  forwardRef(function MotionImage(
    props: ImageProps,
    ref: Ref<HTMLImageElement>,
  ) {
    const { alt = "", ...rest } = props;
    return <Image ref={ref} alt={alt} {...rest} />;
  }),
);

export const ExperienceImage = ({
  src,
  alt,
  className,
  width,
  height,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.1, zIndex: 9999 }}
      whileHover={{
        scale: 1.05,
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.05,
        zIndex: 9999,
      }}
      style={{
        width,
        height,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mt-6 shrink-0 cursor-grab active:cursor-grabbing",
      )}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg shadow-slate-900/30">
        <MotionImage
          className={cn("rounded-lg object-cover")}
          fill
          src={src}
          alt={alt}
          {...props}
          draggable={false}
        />
      </div>
    </motion.div>
  );
};
