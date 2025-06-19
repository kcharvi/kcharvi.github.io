"use client";

import { ShadowBox } from "./ShadowBox";
import Image from "next/image";
import { useEffect, useRef } from "react";

const images = [
  {
    src: "/charvi_6.jpg",
    width: 163,
    height: 245,
    className: "h-[245px] w-[163px] rotate-[-5deg]",
  },
  {
    src: "/charvi_7.jpg",
    width: 190,
    height: 280,
    className: "h-[280px] w-[190px] rotate-[-8deg]",
  },
  {
    src: "/charvi_4.JPG",
    width: 163,
    height: 245,
    className: "h-[245px] w-[163px] rotate-[5deg]",
  },
];

export function AnimatedMobilePhotos({ delay }: { delay: number }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const centerMiddleImage = () => {
      if (scrollContainerRef.current && window.innerWidth < 1024) {
        // Only center on mobile
        const container = scrollContainerRef.current;
        const middleImageIndex = 1;
        const middleImage = container.children[middleImageIndex];

        if (middleImage) {
          const containerWidth = window.innerWidth;
          const imageWidth = middleImage.getBoundingClientRect().width;

          // Calculate scroll position to center middle image
          const scrollPosition = (container.scrollWidth - containerWidth) / 2;

          // Apply scroll position
          container.scrollTo({
            left: scrollPosition,
            behavior: "instant",
          });
        }
      }
    };

    // Center on mount and after resize
    centerMiddleImage();
    window.addEventListener("resize", centerMiddleImage);

    // Cleanup
    return () => window.removeEventListener("resize", centerMiddleImage);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-20 lg:hidden">
      <div className="mx-auto max-w-[800px]">
        {" "}
        {/* Container for large screens */}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex items-center justify-start overflow-x-auto scroll-smooth px-[50%] pb-4 pt-4 lg:justify-center lg:overflow-x-hidden lg:px-0"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            gap: "2rem",
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
              <ShadowBox width={img.width} height={img.height} />
              <Image
                className={`absolute left-0 top-0 rounded-lg object-cover shadow-lg shadow-black/20 ${img.className}`}
                src={img.src}
                alt={`Photo ${i + 1}`}
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
