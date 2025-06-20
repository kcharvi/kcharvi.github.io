// app/components/ToolboxMobilePhotos.tsx

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ShadowBox } from "./ShadowBox";

const images = [
  {
    src: "/toolbox/studious_courses.svg",
    width: 163,
    height: 163,
    shadowWidth: 170,
    shadowHeight: 170,
    className:
      "absolute left-0 top-2 h-[163px] w-[163px] rotate-[-5deg] rounded-lg object-cover",
    alt: "Courses",
  },
  {
    src: "/toolbox/coder_programming.svg",
    width: 180,
    height: 180,
    shadowWidth: 188,
    shadowHeight: 188,
    className:
      "absolute left-0 top-0 h-[180px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow-lg shadow-black/20",
    alt: "Programming",
  },
  {
    src: "/toolbox/developer_mode.svg",
    width: 163,
    height: 163,
    shadowWidth: 170,
    shadowHeight: 170,
    className:
      "absolute left-0 top-0 h-[163px] w-[163px] rotate-[10deg] rounded-lg object-cover shadow-lg shadow-black/20",
    alt: "Development",
  },
  {
    src: "/toolbox/robot_aiml.svg",
    width: 163,
    height: 163,
    shadowWidth: 170,
    shadowHeight: 170,
    className:
      "absolute left-0 top-0 h-[163px] w-[163px] rotate-[-3deg] rounded-lg object-cover shadow-lg shadow-black/20",
    alt: "AI/ML",
  },
];

export function ToolboxMobilePhotos() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const centerMiddleImage = () => {
      if (scrollContainerRef.current && window.innerWidth < 1024) {
        // Only center on mobile
        const container = scrollContainerRef.current;
        const middleImageIndex = 1; // Center the second image
        const middleImage = container.children[middleImageIndex];

        if (middleImage) {
          const containerWidth = window.innerWidth;
          const scrollPosition = (container.scrollWidth - containerWidth) / 2;

          container.scrollTo({
            left: scrollPosition,
            behavior: "instant",
          });
        }
      }
    };

    centerMiddleImage();
    window.addEventListener("resize", centerMiddleImage);

    return () => window.removeEventListener("resize", centerMiddleImage);
  }, []);

  return (
    <div className="relative -mx-12 py-12 lg:hidden">
      <div className="mx-auto max-w-[800px]">
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex items-center justify-start overflow-x-auto scroll-smooth px-[50%] pb-4 pt-4 lg:justify-center lg:overflow-x-hidden lg:px-0"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            gap: "3.5rem", // 14 -> 3.5rem
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative w-fit shrink-0 snap-center ${
                i === 1 ? "z-10" : "z-0"
              }`}
              style={{ scrollSnapAlign: "center" }}
            >
              <ShadowBox width={img.shadowWidth} height={img.shadowHeight} />
              <Image
                className={img.className}
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                priority={i === 1}
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
