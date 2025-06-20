// app/projects/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { GridWrapper } from "@/app/components/GridWrapper";
import { ProjectCategorySelect } from "@/app/components/ProjectCategorySelect";
import { projects, categories } from "@/app/data/projects";
import { Photo } from "../components/Photo";

export default function ProjectPage() {
  const [category, setCategory] = useState("");

  const displayedProjects = category
    ? projects.filter((project) =>
        project.categories.some((cat) => cat.toLowerCase() === category),
      )
    : projects;

  return (
    <div className="relative space-y-16">
      <title>Projects | Charvi Kusuma</title>
      {/* Title */}
      <div className="relative space-y-8 md:space-y-10"></div>
      <GridWrapper className="relative space-y-10 md:space-y-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-around lg:px-24">
          <div className="order-1 my-12 flex-shrink-0 lg:order-2 lg:my-0">
            <div className="relative mx-auto w-full max-w-[400px]">
              <div className="relative grid grid-cols-3">
                <div className="relative z-20 -translate-y-2">
                  <Photo
                    width={200}
                    height={160}
                    src="/projects/me_building.jpg"
                    alt="Charvi Kusuma"
                    direction="left"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="order-2 mx-auto max-w-lg lg:order-1 lg:m-0 lg:max-w-3xl lg:pr-12">
            <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-5xl lg:text-left lg:leading-[64px]">
              Collection of my favorite works.
            </h1>
          </div>
        </div>
      </GridWrapper>

      <div className="relative space-y-8 text-center">
        <GridWrapper>
          <div className="text-sm font-medium text-indigo-600">
            <span>Projects</span>
          </div>
        </GridWrapper>
        <GridWrapper>
          <h2 className="mx-auto max-w-xl text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
            Learning is constant and it happens faster when you code, break and
            build stuff
          </h2>
        </GridWrapper>
        <ProjectCategorySelect
          categories={categories}
          currentCategory={category}
          onCategoryChange={setCategory}
        />
      </div>

      <GridWrapper>
        <ul className="z-50 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, index) => (
            <li key={`${project.title}-${index}`}>
              <Link
                href={project.url}
                className="group block h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-primary transition-colors hover:bg-white">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h2 className="mb-3 text-base font-medium leading-6 tracking-tight text-slate-900 md:leading-none">
                        {project.title}
                      </h2>
                      <div className="mb-2 flex flex-wrap gap-2">
                        {project.categories.map((cat) => (
                          <span
                            key={cat}
                            className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div className="mb-2 text-sm text-text-tertiary">
                        {project.startDate} - {project.endDate || "Present"}
                      </div>
                      <p className="mb-3 flex-grow leading-6 text-text-secondary">
                        {project.description}
                      </p>
                      <p className="mb-3 flex-grow leading-6 text-text-secondary">
                        <span className="font-bold">Key Skills:</span>{" "}
                        {project.keyskills}
                      </p>
                    </div>
                    <div className="flex items-center text-sm font-medium text-indigo-600/50 group-hover:text-indigo-600">
                      <span className="text-sm leading-6">Learn more</span>
                      <svg
                        className="relative ml-2.5 mt-px overflow-visible"
                        width="3"
                        height="6"
                        viewBox="0 0 3 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M0 0L3 3L0 6"></path>
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </GridWrapper>
    </div>
  );
}
