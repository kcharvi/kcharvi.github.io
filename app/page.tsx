// app/page.tsx

import clsx from "clsx";

import { AboutMeBento } from "./components/AboutMeBento";
import { AnimatedMobilePhotos } from "./components/AnimatedMobilePhotos";
import { AnimatedProfilePicture } from "./components/AnimatedProfilePicture";
import { AnimatedText } from "./components/AnimatedText";
import { BgGradient } from "./components/BgGradient";
import { CalendarBento } from "./components/CalendarBento";
import { ChangelogBento } from "./components/ChangelogBento";
import { FeaturedBlogCard } from "./components/FeaturedBlogCard";
import { fetchAndSortBlogPosts } from "./lib/utils";
import { GridWrapper } from "./components/GridWrapper";
import { NewsletterSignUp } from "./components/NewsletterSignUp";
import { PhotoGallery } from "./components/PhotoGallery";
import { ProjectsBento } from "./components/ProjectsBento";
import { SpeakingBento } from "./components/SpeakingBento";
import { ToolboxBento } from "./components/ToolboxBento";
import { VisionBoardHomeBento } from "./components/VisionBoardHomeBento";


export const metadata = {
  title: "Charvi Kusuma | AI Engineer & Researcher",
  description: "Portfolio, blog, and projects of Charvi Kusuma.",
  openGraph: {
    title: "Charvi Kusuma | AI Engineer & Researcher",
    description: "Portfolio, blog, and projects of Charvi Kusuma.",
    url: "https://kcharvi.github.io/",
    images: [
      {
        url: "/charvi_headshot.png",
        width: 800,
        height: 800,
        alt: "Charvi Kusuma",
      },
    ],
  },
};

export default async function Home() {
  const allPublishedBlogPosts = await fetchAndSortBlogPosts();
  const featuredArticles = allPublishedBlogPosts.slice(0, 4);

  const PROFILE_DELAY = 0;
  const HEADING_DELAY = PROFILE_DELAY + 0.2;
  const PARAGRAPH_DELAY = HEADING_DELAY + 0.1;
  const PHOTOS_DELAY = PARAGRAPH_DELAY + 0.1;

  return (
    <section>
      <AnimatedProfilePicture delay={PROFILE_DELAY} />
      <div className="mt-6 space-y-10 md:mt-0 md:space-y-16">
        <section>
          <div className="relative text-balance">
            <GridWrapper>
              <AnimatedText
                as="h1"
                delay={HEADING_DELAY}
                className="mx-auto max-w-2xl text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-4xl md:leading-[64px]"
              >
                Hey there, I&apos;m Charvi!
                <br />
              </AnimatedText>
              <AnimatedText
                as="h3"
                delay={HEADING_DELAY}
                className="mx-auto max-w-2xl text-center text-lg font-medium tracking-tighter text-text-primary md:text-xl md:leading-[32px]"
              >
                Wander around my digital space, maybe it&apos;ll inspire
                something we can build together.
              </AnimatedText>
            </GridWrapper>
            <GridWrapper>
              <div className="mt-4 text-center md:mt-8">
                <AnimatedText
                  as="p"
                  delay={PARAGRAPH_DELAY}
                  className="leading-8 text-text-secondary"
                >
                  I&apos;m an AI engineer & researcher always curious, and
                  strategic to bring ideas to life and explore what&apos;s next
                  in AI. I am adept at both software development and research
                  aspects of AI, ensuring AI models are accurate, scalable, and
                  integrated into real-world applications. This site is my
                  little exhibit where I&apos;ve curated the projects, ideas,
                  and effort that reflect my journey, interests, and learnings.
                </AnimatedText>
              </div>
            </GridWrapper>
          </div>
          <div>
            {/* Desktop Photos */}
            <div className="relative hidden h-fit w-full items-center justify-center lg:flex">
              <PhotoGallery animationDelay={PHOTOS_DELAY} />
            </div>

            {/* Mobile Photos */}
            <AnimatedMobilePhotos delay={PHOTOS_DELAY} />
          </div>
        </section>

        {/* About Section */}
        <section className="relative space-y-10 md:space-y-16">
          {/* <AboutPattern /> */}
          <div className="space-y-4">
            <GridWrapper>
              <div className="text-center text-sm font-medium text-indigo-600">
                <span>About</span>
              </div>
            </GridWrapper>
            <GridWrapper>
              <h2 className="mx-auto max-w-lg text-balance text-center text-3xl font-medium leading-10 tracking-tight text-text-primary md:text-4xl">
                Here&apos;s what sets me apart and makes me unique
              </h2>
            </GridWrapper>
          </div>

          <GridWrapper>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-12 lg:grid-rows-[14]">
              <div className="col-span-1 md:col-span-5 lg:col-span-5 lg:row-span-6">
                <AboutMeBento linkTo="/about" />
              </div>

              <div className="md:col-span-12 lg:col-span-7 lg:row-span-8">
                <ProjectsBento linkTo="/projects" />
              </div>

              <div className="md:col-span-7 md:row-start-1 lg:col-span-5 lg:row-span-7">
                <ChangelogBento linkTo="/achievements" />
              </div>

              <div className="md:col-span-12 lg:col-span-7 lg:row-span-5">
                <CalendarBento />
              </div>
            </div>
          </GridWrapper>
        </section>

        {/* Blog Section */}
        <section className="relative space-y-10 md:space-y-16">
          {/* <BlogPattern /> */}
          <div className="relative space-y-4 text-balance">
            <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
              <BgGradient />
            </span>
            <GridWrapper>
              <div className="text-center text-sm font-medium text-indigo-600">
                <span>Blog</span>
              </div>
            </GridWrapper>
            <GridWrapper>
              <h2 className="mx-auto max-w-lg text-center text-3xl font-medium leading-10 tracking-tighter text-text-primary md:text-4xl">
                I like sharing my experiments && knowledge with others
              </h2>
            </GridWrapper>
          </div>

          <div className="z-10">
            <GridWrapper>
              <ul className="z-50 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {featuredArticles.length > 0 ? (
                  <>
                    {featuredArticles.slice(0, 4).map((post, index) => (
                      <FeaturedBlogCard
                        key={post.slug}
                        slug={post.slug}
                        imageName={post.imageName}
                        title={post.title}
                        summary={post.summary}
                        link={post.link || `/blog/${post.slug}`}
                        className={clsx(
                          index === 3 && "hidden md:block lg:hidden",
                        )}
                      />
                    ))}
                  </>
                ) : (
                  <p>Nothing to see here yet...</p>
                )}
              </ul>
            </GridWrapper>
          </div>
        </section>

        {/* My Site Section */}
        <section className="relative space-y-10 md:space-y-16">
          {/* <MySitePattern /> */}
          <div className="space-y-4 text-balance">
            <GridWrapper>
              <div className="text-center text-sm font-medium text-indigo-600">
                <span>My Site</span>
              </div>
            </GridWrapper>
            <GridWrapper>
              <h2 className="text-center text-3xl font-medium leading-10 tracking-tighter text-text-primary md:mx-auto md:max-w-lg md:text-4xl">
                Explore, experiment, && say hello
              </h2>
            </GridWrapper>
          </div>

          <GridWrapper>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <span className="col-span-1 h-[276px] sm:block md:hidden lg:block">
                <ToolboxBento linkTo="/toolbox" />
              </span>
              <SpeakingBento />
              <VisionBoardHomeBento />
            </div>
          </GridWrapper>
        </section>

        {/* Newsletter Section */}
        <section>
          <NewsletterSignUp />
        </section>
      </div>
    </section>
  );
}
