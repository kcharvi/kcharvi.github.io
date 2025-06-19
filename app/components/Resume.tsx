import { ResumeData } from "../lib/resume/types";
import { Timeline } from "./Timeline";
import { FiExternalLink } from "react-icons/fi";
import { ExperienceImage } from "./ExperienceImage";
import { Photo } from "./Photo";

const resumeData: ResumeData = {
  experiences: [
    {
      company: "University at Buffalo",
      period: "Jan 2024 - Present",
      certificates: [
        {
          name: "Best MS Research Project Award",
          url: "https://drive.google.com/file/d/1atfdn5RjaK_Gi45G-PtYJl1IN6zMB85Y/view",
        },
      ],
      images: ["/about/university_at_buffalo.jpeg"],
      positions: [
        {
          title: "Research Assistant",
          description: [
            "Currently, with Dr. Shamsad Parvin as the advisor, I have been working on Adaptive Driver Assistance System, that not only detects pedestrians but identfies their intent and behaviour with the help of Low-Rank Adapter modules with Vision Transformer that acts like a plug and play approach.",
            "I led other research projects which are now published like Mapping Crime Dynamics of LA, with an aim to predict crime patterns and areas of concern using Machine Learning algorithms, temporal analysis for number of crimes, and NLP based topic modelling on crime description.",
            "I experimented with 21 different classification and clustering algorithms (XGBoot, Random Forest, DBSCAN, Mini Batch, KMeans, BIRCH etc, name it and you have it!), LSTM for time-series and Latent-Dirichlet Allocation for topic modelling.",
          ],
        },
        {
          title: "Graduate Student Assistant",
          description: [
            "Collaborated with 200+ students, providing resources and mentorship in Data Intensive Computing projects on machine learning and big data frameworks (Hadoop, MapReduce, Spark) for Fall 2024.",
          ],
        },
      ],
    },
    {
      company: "Amazon",
      period: "Jan 2023 - June 2023",
      certificates: [
        {
          name: "Internship Certificate",
          url: "https://drive.google.com/file/d/1OdlkHLO_3yCOOnBdFt_hNjFIrBBMPbwe/view?usp=drive_link",
        },
      ],
      images: ["/about/amazon.jpeg"],
      positions: [
        {
          title: "Software Development and Operations Intern",
          description: [
            "As part of Amazon Pay Core DevOps Engineering Team, I led initiatives to enhance code integrity and operational workflows by rectifying 120+ integration test cases. I worked closely with cross-functional teams which depended  extensively on the pipeline, ensuring CI/CD substantially reducing 12 hours of manual efforts per week.",
            "Mitigated 20+ important security risks like breach of confidential data, lack of encryption standards, and automated the process with Python and Java skills for any future instances. This was a major contribution to the team's yearly goal, reducing 10+ different pending actions items.",
            "I tackled the complex task of onboarding a legacy material set for access permissions onto AWS Secrets Manager with S3, IAM, EC2 instances, and Lambda functions. Given the scale of the Amazon Pay application, completely eliminating the dependency on the prior permission handler posed significant challenges, but I successfully managed the transition.",
          ],
        },
      ],
    },
    {
      company: "JP Morgan Chase & Co.",
      period: "June 2022 - July 2022",
      certificates: [
        {
          name: "Internship Certificate",
          url: "https://drive.google.com/file/d/1hXBwIBgref_c_QkXSPamL0CPPjbHenjR/view",
        },
      ],
      images: ["/about/jpmc.jpg"],
      positions: [
        {
          title: "Software Engineering Intern",
          description: [
            "As part of Consumer & Community Banking (CCB), contributed the team with seamless POC for migration from Splunk to Grafana dashboards, showcasing a 90% effective remodelling strategy. On the frontend, illustrated 5 different data visualizations on Grafana and successfully validated the migration.",
            "I worked backened with an established core JAVA application based on Spring Framework that handles all bank account opening requests for CCB. Redirected requests from Splunk leveraging SoapUI web services, Apache ActiveMQ message requests, Elastic Search configured logs, and Prometheus metric data.",
          ],
        },
      ],
    },
    {
      company: "Nanyang Technological University",
      period: "Jan 2022 - June 2022",
      certificates: [
        {
          name: "NTU India Connect Internship Certificate",
          url: "https://drive.google.com/file/d/1s80B2vytJ-8rlv5dqFp0UW2s6IXNWE8t/view",
        },
      ],
      positions: [
        {
          title: "Research Intern",
          description: [
            "Under the Guidance of Prof. Erik Cambria leading SenticNet Computing Team at NTU, I conducted an extensive research to analyze the errors of sentiment analysis APIs for the company.",
            "With the topic Immigration Reforms Sentiment and Error Analysis and using the SenticNet framework, I analyzed 25K+ tweets for trends and identifying areas for API policy improvements.",
            "Enhanced the performance of 5 different SenticNet APIs, including concept parsing, polarity classification, and subject detection, by comparing against established tools such as Gensim, Vader, and TextBlob.",
          ],
        },
      ],
    },
  ],
  avatarUrl: "/charvi_headshot_1.png",
};

export function Resume() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative">
          <div className="divide-y divide-gray-100">
            {resumeData.experiences.map((experience) => (
              <div
                key={experience.company}
                className="grid grid-cols-[1fr,5fr] gap-6 py-12 first:pt-0 last:pb-0 md:grid-cols-[2fr,1fr,4fr]"
              >
                <div className="hidden md:block">
                  <h3 className="text-xl font-bold">{experience.company}</h3>
                  <p className="text-sm text-gray-600">{experience.period}</p>
                  {experience.certificates && (
                    <div className="mt-2 space-y-1">
                      {experience.certificates.map((cert, i) => (
                        <a
                          key={i}
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-indigo-600 hover:text-blue-800"
                        >
                          {cert.name}
                          <FiExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  )}
                  {experience.images && (
                    <ExperienceImage
                      width={180}
                      height={180}
                      src={experience.images[0]}
                      alt={`${experience.company}`}
                    />
                  )}
                </div>

                <div />

                <div className="space-y-6">
                  <div className="mb-6 md:hidden">
                    <h3 className="text-xl font-bold">{experience.company}</h3>
                    <p className="text-sm text-gray-600">{experience.period}</p>
                    {experience.certificates && (
                      <div className="mt-2 space-y-1">
                        {experience.certificates.map((cert, i) => (
                          <a
                            key={i}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-blue-800"
                          >
                            {cert.name}
                            <FiExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    )}
                    {experience.images && (
                      <ExperienceImage
                        width={180}
                        height={180}
                        src={experience.images[0]}
                        alt={`${experience.company}`}
                      />
                    )}
                  </div>
                  {experience.positions.map((position, index) => (
                    <div
                      key={`${experience.company}-${index}`}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-semibold">
                        {position.title}
                      </h4>
                      <div className="space-y-3">
                        {position.description.map((desc, i) => (
                          <p key={i} className="text-gray-600">
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-0 h-full w-8 md:left-[calc(28%_-_1rem)]">
            <Timeline avatarUrl={resumeData.avatarUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
