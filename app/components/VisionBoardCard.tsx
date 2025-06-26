// app/components/VisionBoardCard.tsx

import { patterns } from "@/app/lib/visionBoard/types";

type VisionBoardCardProps = {
  patternIndex: number;
  title: string;
  ideaDescription: string;
  techStack: string[];
  rotation?: number;
  className?: string;
};

export function VisionBoardCard({
  patternIndex,
  title,
  ideaDescription,
  techStack,
  rotation = 0,
  className = "",
}: VisionBoardCardProps) {
  const pattern = patterns[patternIndex % patterns.length];

  return (
    <div
      className={`flex flex-col items-start justify-between gap-3 rounded-xl border-2 border-[#A5AEB8/12] bg-[#F7F7F8] p-3 shadow-lg transition-shadow duration-300 hover:shadow-lg ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className={`h-full w-full rounded-md bg-gradient-to-b ${pattern.gradient} relative flex flex-col items-center justify-start text-balance p-4 text-center`}
      >
        {pattern.svg}
        <div className="z-10 flex h-full flex-col items-center justify-center space-y-3">
          <h3 className="line-clamp-2 text-lg font-bold text-black drop-shadow-lg">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-black/80 drop-shadow-md">
            {ideaDescription}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-1">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="inline-block rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
