"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export const ToolboxPhotoGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // First make the container visible with a fade-in
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 0.5 * 1000);

    // Then start the photo animations after a short delay
    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (0.5 + 0.4) * 1000,
    );

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  // Animation variants for the container
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

  // Animation variants for each photo
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

  // Photo positions - horizontal layout with random y offsets
  const photos = [
    {
      id: 1,
      order: 0,
      x: "-240px",
      y: "15px",
      zIndex: 50,
      src: "/toolbox/studious_courses.svg",
      alt: "Courses",
    },
    {
      id: 2,
      order: 1,
      x: "-80px",
      y: "32px",
      zIndex: 40,
      src: "/toolbox/coder_programming.svg",
      alt: "Programming",
    },
    {
      id: 3,
      order: 2,
      x: "80px",
      y: "8px",
      zIndex: 30,
      src: "/toolbox/developer_mode.svg",
      alt: "Development",
    },
    {
      id: 4,
      order: 3,
      x: "240px",
      y: "22px",
      zIndex: 20,
      src: "/toolbox/robot_aiml.svg",
      alt: "AI/ML",
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
            {/* Render photos in reverse order so that higher z-index photos are rendered later in the DOM */}
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
                <div className="relative h-[180px] w-[180px] overflow-hidden rounded-lg shadow-lg shadow-slate-900/30">
                  <Image
                    className="rounded-lg object-cover"
                    fill
                    src={photo.src}
                    alt={photo.alt}
                    draggable={false}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
