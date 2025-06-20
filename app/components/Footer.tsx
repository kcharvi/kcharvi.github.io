// app/components/Footer.tsx

import Image from "next/image";
import Link from "next/link";

import { GridWrapper } from "./GridWrapper";
import { SocialPill } from "./SocialPill";
import { siteMetadata } from "@/app/data/siteMetadata";

interface FooterLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "General",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Specifics",
    links: [
      { href: "/achievements", label: "Achievements" },
      { href: "/toolbox", label: "Toolbox" },
      {
        href: siteMetadata.social.podcast,
        label: "Podcasts",
        isExternal: true,
      },
      { href: "/links", label: "Links" },
    ],
  },
];

export function Footer(): JSX.Element {
  const renderFooterLink = (link: FooterLink): JSX.Element => {
    if (link.isExternal) {
      return (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      );
    }
    return <Link href={link.href}>{link.label}</Link>;
  };

  return (
    <>
      <div className="relative max-w-7xl border-border-primary/50">
        <GridWrapper>
          <div className="max-w-6xl divide-y px-4 lg:mx-auto lg:flex lg:divide-x lg:px-4 xl:px-0">
            
            {/* Left Section - Description */}
            <div className="flex w-full flex-col py-6 text-sm lg:w-1/3">
              <div className="flex-grow space-y-6">
                <Link className="inline-block" href="/">
                  <Image
                    className="h-10 w-10"
                    src="/ck_color_black_no_bg.svg"
                    alt="Charvi's Logo"
                    width={40}
                    height={40}
                  />
                </Link>
                <p className="w-96 leading-5 text-gray-500">
                  I&apos;m an AI/ML engineer and researcher constantly exploring
                  what AI can do. Thanks for checking out my portfolio!
                </p>
              </div>
              <p className="mt-6 text-gray-500">
                © {new Date().getFullYear()} {siteMetadata.author}
              </p>
            </div>

            {/* Center Section - Social Pills */}
            <div className="flex w-full flex-col justify-end py-6 lg:w-1/3">
              <div className="flex justify-center">
                <SocialPill />
              </div>
            </div>

            {/* Right Section - Links */}
            <div className="flex w-full flex-col py-6 text-xs lg:w-1/3">
              <div className="flex w-full justify-between md:justify-start md:space-x-36 lg:justify-between">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <span className="mb-4 inline-block text-base font-medium text-text-primary">
                      {section.title}
                    </span>
                    <ul className="space-y-2 text-sm text-gray-500">
                      {section.links.map((link) => (
                        <li className="hover:text-text-primary" key={link.href}>
                          {renderFooterLink(link)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GridWrapper>
      </div>
      <div className="relative h-8 w-full [background-image:linear-gradient(45deg,theme(colors.border-primary)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-primary)_50%,theme(colors.border-primary)_62.50%,transparent_62.50%,transparent_100%)] [background-size:5px_5px]"></div>
    </>
  );
}
