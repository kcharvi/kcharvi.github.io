// app/components/FeaturedBlogCard.tsx

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

type FeaturedBlogCardProps = {
  slug: string;
  imageName: string;
  title: string;
  summary: string;
  link: string;
  className?: string;
};

export function FeaturedBlogCard({
  slug,
  imageName,
  title,
  summary,
  link,
  className,
}: FeaturedBlogCardProps) {
  const isExternalLink = link?.startsWith("http");
  const finalLink = link || `/blog/${slug}`;

  const linkContent = (
    <>
      <Image
        src={
          `/blog/${imageName}` || 
          "/blog/charvikusuma_overlay.png"
        }
        alt="Blog Image"
        className="h-[280px] rounded-2xl object-cover md:h-[225px]"
        width={400}
        height={280}
      />
      <div className="my-4 flex w-full flex-grow flex-col space-y-4 text-balance px-4">
        <h2 className="text-lg font-medium leading-7 tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="flex-grow leading-7 text-text-secondary">{summary}</p>
      </div>
    </>
  );

  return (
    <li
      className={clsx(
        "z-50 flex h-full flex-col rounded-3xl border border-border-primary bg-bg-primary p-2",
        className,
      )}
    >
      {isExternalLink ? (
        <a
          className="flex h-full flex-col rounded-2xl"
          href={finalLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkContent}
        </a>
      ) : (
        <Link
          className="flex h-full flex-col rounded-2xl"
          href={finalLink}
          prefetch={true}
        >
          {linkContent}
        </Link>
      )}
    </li>
  );
}
