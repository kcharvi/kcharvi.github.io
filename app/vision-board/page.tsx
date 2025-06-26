// app/vision-board/page.tsx

import { VisionBoardAnimatedCircle } from "@/app/components/VisionBoardAnimatedCircle";
import { VisionBoardCard } from "@/app/components/VisionBoardCard";
import { fetchAndSortVisionProjects } from "@/app/lib/utils";
import { GridWrapper } from "../components/GridWrapper";

export default function Page() {
  const visionProjects = fetchAndSortVisionProjects();

  return (
    <>
      <title>Vision Board | Charvi Kusuma</title>
      <div className="absolute inset-0 top-0 bg-[radial-gradient(#e5e7eb_1px,transparent_2px)] [background-size:16px_16px]"></div>

      <div className="relative min-h-screen pb-32 pt-20">
        <div className="mx-auto max-w-7xl px-8">
          {/* Header Section */}
          <div className="mb-16">
            <div className="relative space-y-8 text-center">
              <GridWrapper>
                <div className="order-2 mx-auto max-w-lg lg:order-1 lg:m-0 lg:max-w-3xl lg:pr-12">
                  <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-5xl lg:text-left lg:leading-[64px]">
                    Things I am working on.
                  </h1>
                </div>
                <div className="text-sm font-medium text-indigo-600">
                  <span>Vision Board</span>
                </div>
              </GridWrapper>
              <GridWrapper>
                <h2 className="mx-auto max-w-xl text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  Learning is constant and it happens faster when you code,
                  break and build stuff
                </h2>
              </GridWrapper>
            </div>
          </div>

          {/* Vision Cards Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visionProjects.map((project, index) => (
              <div
                key={project.slug}
                className="vision-card-fade-in vision-card-float vision-card-hover my-8"
                style={
                  {
                    animationDelay: `${index * 0.2}s`,
                    "--rotation": `${project.rotation}deg`,
                  } as React.CSSProperties
                }
              >
                <VisionBoardCard
                  patternIndex={project.patternIndex}
                  title={project.title}
                  ideaDescription={project.ideaDescription}
                  techStack={project.techStack}
                  rotation={project.rotation}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Circle at Bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-full flex-col items-center justify-end bg-gradient-to-b from-transparent pb-8">
        <VisionBoardAnimatedCircle />
      </div>
    </>
  );
}
