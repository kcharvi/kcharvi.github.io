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

  // Center the first (middle) image on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Force a reflow to ensure correct measurements
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const firstItem = container.children[0];
          const containerWidth = container.clientWidth;
          const itemWidth = firstItem.clientWidth;

          // Calculate position to center the first item
          const scrollPosition = (containerWidth - itemWidth) / 2;
          container.scrollLeft = 0; // Reset scroll position
          container.scrollTo({
            left: scrollPosition,
            behavior: "instant",
          });
        }
      });
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-20 lg:hidden">
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex snap-x snap-mandatory items-center gap-x-8 overflow-x-auto px-[calc(50vw-95px)] pb-8 pt-8"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: "calc(50% - 95px)",
          scrollPaddingRight: "calc(50% - 95px)",
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative w-fit flex-shrink-0 snap-center"
            style={{ scrollSnapAlign: "center" }}
          >
            <ShadowBox width={img.width} height={img.height} />
            <Image
              className={`absolute left-0 top-0 rounded-lg object-cover shadow-lg shadow-black/20 ${img.className}`}
              src={img.src}
              alt="Photo"
              width={img.width}
              height={img.height}
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      {/* Optional: Hide scrollbar */}
      <style jsx global>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
