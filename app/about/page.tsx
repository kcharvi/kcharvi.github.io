import { NewsletterSignUp } from "@/app/components/NewsletterSignUp";
import { HorizontalLine } from "@/app/components/HorizontalLine";
import { getTimeOfDayGreeting } from "app/lib/utils";
import React from "react";
import { VisionBoardBento } from "@/app/components/VisionBoardBento";
import { ConnectionsBento } from "@/app/components/ConnectionsBento";
import { ScrapbookBento } from "@/app/components/ScrapbookBento";
import { ShadowBox } from "@/app/components/ShadowBox";
import { Resume } from "app/components/Resume";
import { StatsBento } from "@/app/components/StatsBento";
import { CurrentlyReadingBento } from "@/app/components/CurrentlyReadingBento";
import { GridWrapper } from "@/app/components/GridWrapper";
import { AboutTrackPattern } from "@/app/components/AboutTrackPattern";
import { Photo } from "@/app/components/Photo";
import { Button } from "@/app/components/Button";
import { AnimatedImage } from "@/app/components/AnimatedImage";
import Image from "next/image";

export default function AboutPage() {
  const timeOfDayGreeting = getTimeOfDayGreeting();

  return (
    <div className="relative mt-14">
      <title>About | Charvi Kusuma</title>
      <div className="relative space-y-10 md:space-y-16">
        {/* Title */}
        <GridWrapper className="space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-around lg:px-24">
            <div className="order-2 mx-auto max-w-lg lg:order-1 lg:m-0 lg:max-w-3xl lg:pr-12">
              <div className="text-center text-sm font-medium text-indigo-600 lg:text-left">
                <span>{timeOfDayGreeting}</span>
              </div>
              <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-5xl lg:text-left lg:text-6xl lg:leading-[64px]">
                I&apos;m Charvi, an AI/ML Engineer and Researcher.
              </h1>
            </div>
            <div className="order-1 my-12 flex-shrink-0 lg:order-2 lg:my-0">
              <div className="relative mx-auto w-full max-w-[400px]">
                <div className="relative grid grid-cols-3">
                  <div className="relative z-20 -translate-y-2">
                    <Photo
                      width={140}
                      height={140}
                      src="/about/me_at_desk.svg"
                      alt="Charvi Kusuma"
                      direction="left"
                    />
                  </div>
                  <div className="relative z-30">
                    <Photo
                      width={140}
                      height={140}
                      src="/about/me_with_book.svg"
                      alt="Charvi Kusuma"
                      direction="right"
                    />
                  </div>
                  <div className="relative z-20 translate-y-4">
                    <Photo
                      width={140}
                      height={140}
                      src="/about/me_nod.svg"
                      alt="Charvi Kusuma"
                      direction="left"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GridWrapper>

        <span className="absolute left-1/2 top-40 -translate-y-1/2 translate-x-1/2">
          <HorizontalLine />
        </span>

        {/* About */}
        <div className="relative space-y-8 text-center">
          <div className="space-y-4">
            <GridWrapper>
              <div className="text-center text-sm font-medium text-indigo-600">
                <span>About</span>
              </div>
            </GridWrapper>
            <GridWrapper>
              <h2 className="mx-auto max-w-xl text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                Here&apos;s a quick intro about me and what I love to do
              </h2>
            </GridWrapper>
          </div>
          <div className="relative h-fit w-full overflow-hidden">
            <div className="absolute left-0 top-0 w-full md:left-4 lg:left-[355px] xl:left-[455px]">
              <AboutTrackPattern />
            </div>

            {/* Section 1 */}
            <div className="grid grid-cols-1 gap-8 py-12 pr-12 lg:grid-cols-2 lg:items-center lg:justify-between lg:py-32 lg:pb-20 xl:py-32">
              <div className="flex flex-col items-center text-left lg:order-2 lg:items-start">
                <div className="mb-8 lg:hidden">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <Image
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                      src="/about/me_way.svg"
                      alt="Finding My Way into AI/ML"
                      width={180}
                      height={270}
                    />
                  </div>
                </div>
                <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  Finding My Way into AI/ML
                </h2>
                <p className="mb-6 text-base leading-8 text-text-secondary">
                  The fact that a bunch of tweaked numbers could learn patterns
                  and make smart decisions absolutely fascinated me. I started
                  where most people do, playing around with ML models, CNNs,
                  RNNs, and building things like recommender systems. I
                  compounded my knowledge with research papers, a few patents,
                  and lots of side projects. But it didn&apos;t stop there. LLMs
                  blew up AND so did my curiosity! Masters studies gave me the
                  space to dig deeper. I&apos;m here to grow with GenAI-apply
                  improve, and build what&apos;s next.
                </p>
              </div>
              <div className="hidden lg:order-1 lg:block">
                <div className="relative mx-auto w-fit">
                  <ShadowBox width={188} height={278}></ShadowBox>
                  <Image
                    className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                    src="/about/me_way.svg"
                    alt="Finding My Way into AI/ML"
                    width={180}
                    height={270}
                  />
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="grid grid-cols-1 gap-8 py-24 lg:grid-cols-2 lg:items-center lg:justify-between lg:pl-12">
              <div className="flex flex-col items-center text-left lg:items-start">
                <div className="mb-8 lg:hidden">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <Image
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                      src="/about/these_days.gif"
                      alt="These Days"
                      width={180}
                      height={270}
                    />
                  </div>
                </div>
                <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  These Days
                </h2>
                <p className="mb-6 text-base leading-8 text-text-secondary">
                  I&apos;m immersed in the possibilites of language models. Let
                  the big tech handle huge computes while I build end-to-end
                  apps with LLMs, RAG pipelines, and exploring agentic workflows
                  with LangChain, CrewAI and bunch of other tools. I&apos;m also
                  diving deep into post-training techniques like RLHF, PPO, DPO,
                  PEFT and much more. I&apos;m making sure my fundamental
                  concepts are clear.
                </p>
                <p className="mb-6 text-base leading-8 text-text-secondary">
                  It&apos;s not just about building smarter systems, it&apos;s
                  more about making them useful and human-centered.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="relative mx-auto w-fit">
                  <ShadowBox width={188} height={278}></ShadowBox>
                  <Image
                    className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                    src="/about/these_days.gif"
                    alt="These Days"
                    width={180}
                    height={270}
                  />
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="grid grid-cols-1 gap-8 pr-12 lg:grid-cols-2 lg:items-center lg:justify-between xl:py-24">
              <div className="flex flex-col items-center text-left lg:order-2 lg:items-start">
                <div className="mb-8 lg:hidden">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <Image
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                      src="/about/me_coffee.svg"
                      alt="Achievements I'm Proud of"
                      width={180}
                      height={270}
                    />
                  </div>
                </div>
                <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  Achievements I&apos;m Proud of
                </h2>
                <p className="mb-6 text-base leading-8 text-text-secondary">
                  I&apos;ve been fortunate to celebrate milestones that shaped
                  me. Being honored with the Chancellor&apos;s Gold Medal as the
                  best outgoing undergrad, and winning the Best Research Project
                  Award during my Master&apos;s. I&apos;ve completed impactful
                  internships at Amazon and JP Morgan, authored research papers,
                  contributed to 8+ publications and patents, and built a
                  portfolio of over 10 AI/ML + Full-Stack projects.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="relative mx-auto w-fit">
                  <ShadowBox width={188} height={278}></ShadowBox>
                  <Image
                    className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                    src="/about/me_coffee.svg"
                    alt="Achievements I'm Proud of"
                    width={180}
                    height={270}
                  />
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:justify-between lg:py-32 lg:pl-12 xl:py-24">
              <div className="flex flex-col items-center text-left lg:items-start">
                <div className="mb-8 lg:hidden">
                  <AnimatedImage
                    images={[
                      "/about/about_me_kayaking.jpg",
                      "/about/about_me_beach_view.jpg",
                      "/about/about_me_hiking_view.jpeg",
                      "/about/about_me_biking_view.jpeg",
                    ]}
                    width={180}
                    height={270}
                    alt="Life Beyond Code"
                    rotation={8}
                  />
                </div>
                <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  Life Beyond Code
                </h2>
                <p className="mb-6 text-base leading-8 text-text-secondary">
                  I&apos;m always up for a scenic bike ride, and there&apos;s
                  something about the ocean breeze and shoreline walks that
                  instantly clears my head. Weekends often mean fresh bakes from
                  the kitchen and the thrill of Formula 1, I love trying out new
                  dessert recipes while cheering on my favorite drivers. Now and
                  then, you&apos;ll find me rallying on a badminton court,
                  spinning a foosball table, or kayaking through calm waters.
                </p>
              </div>
              <div className="hidden lg:block">
                <AnimatedImage
                  images={[
                    "/about/about_me_kayaking.jpg",
                    "/about/about_me_beach_view.jpg",
                    "/about/about_me_hiking_view.jpeg",
                    "/about/about_me_biking_view.jpeg",
                  ]}
                  width={180}
                  height={270}
                  alt="Life Beyond Code"
                  rotation={8}
                />
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="relative space-y-8 text-center">
          <div className="space-y-4">
            <GridWrapper>
              <div className="text-center text-sm font-medium text-indigo-600">
                <span>Experience</span>
              </div>
            </GridWrapper>
            <GridWrapper>
              <h2 className="mx-auto max-w-lg text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                My work history and internship timeline.
              </h2>
            </GridWrapper>
          </div>
        </div>
        <div className="space-y-16">
          <GridWrapper>
            <Resume />
          </GridWrapper>
          <div className="flex justify-center">
            <Button
              variant="secondary"
              href="/static/charvikusuma_cv.pdf"
              target="_blank"
            >
              View CV
            </Button>
          </div>
        </div>

        <section className="relative space-y-16">
          <div className="space-y-4">
            <GridWrapper>
              <div className="text-center text-sm font-medium text-indigo-600">
                <span>More</span>
              </div>
            </GridWrapper>

            <GridWrapper>
              <h2 className="mx-auto max-w-lg text-balance text-center text-3xl font-medium leading-10 tracking-tight text-text-primary">
                Here&apos;s what sets me apart and makes me unique
              </h2>
            </GridWrapper>
          </div>

          {/* About Grid */}
          <GridWrapper>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
              <div className="lg:col-span-3 lg:row-span-6">
                <VisionBoardBento linkTo="/community-wall" />
              </div>
              <div className="hidden lg:col-span-7 lg:row-span-5 lg:block">
                <ScrapbookBento />
              </div>
              <div className="hidden lg:col-span-2 lg:col-start-11 lg:row-span-10 lg:block lg:min-h-[50px]">
                <CurrentlyReadingBento />
              </div>
              <div className="lg:col-span-7 lg:row-span-8">
                <ConnectionsBento linkTo="/projects" />
              </div>

              <div className="lg:col-span-3 lg:row-span-4">
                <StatsBento />
              </div>
            </div>
          </GridWrapper>
        </section>

        {/* Newsletter */}
        <NewsletterSignUp />
      </div>
    </div>
  );
}
