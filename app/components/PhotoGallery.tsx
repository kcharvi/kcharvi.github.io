// app/components/PhotoGallery.tsx

"use client";

import { motion } from "framer-motion";
import { Photo } from "./Photo";
import { useEffect, useState } from "react";

type Direction = "left" | "right";

export const PhotoGallery = ({
  animationDelay = 0.5,
}: {
  animationDelay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.4) * 1000,
    ); 

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1, 
      },
    },
  };

  const photoVariants = {
    hidden: (custom) => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    }),
    visible: (custom) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15, 
      },
    }),
  };

  const photos = [
    {
      id: 1,
      order: 0,
      x: "-320px",
      y: "15px",
      zIndex: 50, 
      direction: "left" as Direction,
      src: "/charvi_4.JPG",
    },
    {
      id: 2,
      order: 1,
      x: "-160px",
      y: "32px",
      zIndex: 40,
      direction: "left" as Direction,
      src: "/charvi_11.jpg",
    },
    {
      id: 3,
      order: 2,
      x: "0px",
      y: "8px",
      zIndex: 30,
      direction: "right" as Direction,
      src: "/charvi_7.jpg",
    },
    {
      id: 4,
      order: 3,
      x: "160px",
      y: "22px",
      zIndex: 20,
      direction: "right" as Direction,
      src: "/charvi_6.jpg",
    },
    {
      id: 5,
      order: 4,
      x: "320px",
      y: "44px",
      zIndex: 10, 
      direction: "left" as Direction,
      src: "/charvi_5.jpg",
    },
  ];

  return (
    <div className="relative mb-8 hidden h-[350px] w-full items-center justify-center lg:flex">
      <motion.div
        className="relative mx-auto flex w-full max-w-6xl justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="relative flex w-full justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <div className="relative h-[220px] w-[220px]">
            {[...photos].reverse().map((photo) => (
              <motion.div
                key={photo.id}
                className="absolute left-0 top-0"
                style={{ zIndex: photo.zIndex }} 
                variants={photoVariants}
                custom={{
                  x: photo.x,
                  y: photo.y,
                  order: photo.order,
                }}
              >
                <Photo
                  width={220}
                  height={220}
                  src={photo.src}
                  alt="Charvi Kusuma Photo"
                  direction={photo.direction}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
