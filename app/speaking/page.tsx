// app/speaking/page.tsx

import { ShadowBox } from "@/app/components/ShadowBox";
import { NewsletterSignUp } from "@/app/components/NewsletterSignUp";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@/app/components/Tabs";
import { GridWrapper } from "@/app/components/GridWrapper";
import { PageSection } from "../components/PageSection";
import { ContentLink } from "../components/ContentLink";
import Image from "next/image";
interface Talk {
  title: string;
  description: string;
  event: string;
  url?: string;
}

const talksAndPresentations: Talk[] = [
];

export default function SpeakingPage() {
  return (
    <div className="relative">
      <title>Speaking | Charvi Kusuma</title>
      <div className="relative space-y-16">
        <GridWrapper>
          <h1 className="max-w-3/5 mx-auto mt-16 text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
            My conference talks, podcast && video appearances.
          </h1>
        </GridWrapper>

        <div className="relative space-y-32">
          <div className="space-y-16">
            <PageSection title={<h2>Talks && Presentations</h2>}>
              <p className="text-sm/8 text-text-primary">
                An arrangement of live and virtual conference and meetup
                presentations.
              </p>
              <div className="mt-8 max-w-2xl space-y-10 text-balance">
                {talksAndPresentations.map((talk) => (
                  <ContentLink
                    key={talk.title}
                    title={talk.title}
                    description={talk.description}
                    href={talk.url}
                  />
                ))}
              </div>
            </PageSection>

            <PageSection title={<h2>Videos && Podcasts</h2>}>
              <p className="text-sm/8 text-text-primary">
                A combination of podcast recordings and educational videos.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              </div>
            </PageSection>
          </div>

          {/* Biography */}
          <GridWrapper>
            <section className="relative px-4">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="relative col-span-7 flex flex-col space-y-8">
                  {/* Title */}
                  <div className="col-span-5 flex w-3/4 flex-col items-start space-y-3 text-balance">
                    <div className="text-left text-sm font-medium text-indigo-600">
                      <span>Biography</span>
                    </div>
                    <h2 className="text-3xl font-semibold text-text-primary">
                      Here are a few options for speaker bios
                    </h2>
                  </div>

                  <Tabs defaultTab="first-person">
                    <TabList>
                      <Tab id="first-person" label="First person" />
                      <Tab id="third-person" label="Third person" />
                    </TabList>
                    <TabPanels className="mt-8">
                      <TabPanel id="first-person">
                        <p className="text-base leading-7 text-text-secondary">
                          I am Charvi Kusuma, as an AI/ML enthusiast, developer, blogger, and
                          researcher, I enjoy tinkering and sharing my projects
                          with the public.
                        </p>
                      </TabPanel>
                      <TabPanel id="third-person">
                        <p className="text-base leading-7 text-text-secondary">
                          Charvi Kusuma is an AI/ML enthusiast, developer, blogger, and
                          researcher. She enjoys tinkering and sharing her projects
                          with the public.
                        </p>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </div>
                <div className="col-span-5 flex flex-col items-start space-y-8">
                  <div className="flex flex-col items-start space-y-4">
                    <div className="text-left text-sm font-medium text-indigo-600">
                      <span>Headshots</span>
                    </div>
                    <h2 className="text-3xl font-semibold text-text-primary">
                      A variety of photos great for speaker headshots
                    </h2>
                  </div>
                  <div className="mt-12 flex w-full space-x-4">
                    <div className="relative">
                      <ShadowBox width={200} height={200}></ShadowBox>
                      <Image
                        className="absolute left-1 top-2 h-[186px] w-[186px] rotate-[9deg] rounded-lg object-cover shadow"
                        src="/charvi_9.jpg"
                        alt="Charvi Kusuma"
                        width={200}
                        height={200}
                      />
                    </div>

                    <div className="relative">
                      <ShadowBox width={200} height={200}></ShadowBox>
                      <Image
                        className="absolute left-1 top-2 h-[186px] w-[186px] rotate-[-8deg] rounded-lg object-cover shadow"
                        src="/charvi_8.jpg"
                        alt="Charvi Kusuma"
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </GridWrapper>
        </div>

        {/* Newsletter */}
        <NewsletterSignUp />
      </div>
    </div>
  );
}
