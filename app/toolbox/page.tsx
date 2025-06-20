// app/toolbox/page.tsx

import Image from "next/image";

import { BorderCard } from "@/app/components/BorderCard";
import { NewsletterSignUp } from "@/app/components/NewsletterSignUp";
import { skillsData, softwareData } from "app/data/toolbox";
import { HorizontalLine } from "@/app/components/HorizontalLine";
import { GridWrapper } from "@/app/components/GridWrapper";
import { ToolboxPhotoGallery } from "@/app/components/ToolboxPhotoGallery";
import { ToolboxMobilePhotos } from "@/app/components/ToolboxMobilePhotos";

export default function ToolboxPage() {
  return (
    <div className="relative">
      <title>Toolbox | Charvi Kusuma</title>
      <span className="absolute left-1/2 top-20 -translate-y-1/2 translate-x-1/2">
        <HorizontalLine />
      </span>
      <div className="relative space-y-10 md:space-y-16">
        <div className="mx-auto text-balance pt-14 md:pt-16">
          <GridWrapper>
            <h1 className="mx-auto max-w-2xl text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
              Tech I speak fluently and tools I keep in my arsenal.
            </h1>
          </GridWrapper>
        </div>

        {/* Tech Icons Section */}
        <div className="relative">
          <div>
            {/* Desktop Photos */}
            <div className="relative hidden h-fit w-full items-center justify-center lg:flex">
              <ToolboxPhotoGallery />
            </div>

            {/* Mobile Photos */}
            <ToolboxMobilePhotos />
          </div>
        </div>

        <span className="absolute left-1/2 top-40 -translate-y-1/2 translate-x-1/2">
          <HorizontalLine />
        </span>

        {/* Hardware */}
        <div className="relative">
          <GridWrapper>
            <div className="text-center text-sm font-medium text-indigo-600">
              <span>Skills</span>
            </div>
          </GridWrapper>
        </div>

        <div>
          <GridWrapper>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              {skillsData.map((item) => (
                <div key={item.title} className="h-full">
                  <BorderCard>
                    <div className="flex h-full flex-col space-y-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={item.icon}
                          alt={`${item.title} icon`}
                          width={24}
                          height={24}
                          className="h-6 w-6"
                        />
                        <p className="text-base font-semibold leading-5 text-text-primary">
                          {item.title}
                        </p>
                      </div>
                      <p className="leading-6 text-gray-500">
                        {item.description}
                      </p>
                      <ul className="space-y-2">
                        {item.skills.map((skill) => (
                          <li
                            key={skill}
                            className="flex items-center text-sm text-indigo-600"
                          >
                            <svg
                              className="mr-2 h-4 w-4 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </BorderCard>
                </div>
              ))}
            </div>
          </GridWrapper>
        </div>

        {/* Applications */}
        <div className="relative">
          <GridWrapper>
            <div className="text-center text-sm font-medium text-indigo-600">
              <span>Applications</span>
            </div>
          </GridWrapper>
        </div>

        {/* List */}
        <GridWrapper>
          <div className="relative grid grid-cols-3 place-items-center md:grid-cols-4 lg:grid-cols-8 lg:gap-6">
            {softwareData.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group no-underline transition-all duration-500 group-hover:-translate-y-3"
              >
                <div className="group inline-block text-center">
                  <div className="h-28 w-28 rounded-[20px] border border-border-primary bg-bg-primary p-2 transition-all duration-300 group-hover:-translate-y-3 group-hover:border-indigo-400">
                    <div
                      className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0]"
                      style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
                    >
                      <Image
                        className="h-10 w-10"
                        alt={item.title}
                        src={item.imgSrc}
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  {item.title ? (
                    <p className="mt-3 text-sm text-gray-500">{item.title}</p>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </GridWrapper>

        {/* Newsletter */}
        <NewsletterSignUp />
      </div>
    </div>
  );
}
