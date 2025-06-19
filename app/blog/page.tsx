import {
  extractUniqueBlogCategories,
  fetchAndSortBlogPosts,
} from "app/lib/utils";
import { NewsletterSignUp } from "@/app/components/NewsletterSignUp";
import { BlogPostList } from "@/app/components/BlogPostList";
import { CategorySelect } from "@/app/components/CategorySelect";
import { FeaturedBlogCard } from "@/app/components/FeaturedBlogCard";
import { GridWrapper } from "@/app/components/GridWrapper";
import clsx from "clsx";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const allPublishedBlogPosts = fetchAndSortBlogPosts();
  const categories = Array.from(
    extractUniqueBlogCategories(allPublishedBlogPosts),
  );
  const category = (await searchParams).category?.toLowerCase() || "";

  const displayedPosts = category
    ? allPublishedBlogPosts.filter((post) =>
        post.categories?.map((cat) => cat.toLowerCase()).includes(category),
      )
    : allPublishedBlogPosts;

  const featuredPosts = !category && (
    <GridWrapper>
      <ul className="z-50 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {allPublishedBlogPosts.length > 0 ? (
          <>
            {allPublishedBlogPosts.slice(0, 4).map((post, index) => (
              <FeaturedBlogCard
                key={post.slug}
                slug={post.slug}
                imageName={post.imageName}
                title={post.title}
                summary={post.summary}
                link={post.link || `/blog/${post.slug}`}
                className={clsx(
                  // Hide the fourth article on mobile and desktop
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
  );

  return (
    <div className="mt-14 space-y-16 md:mt-16">
      <title>Blog | Charvi Kusuma</title>
      <GridWrapper>
        <h1 className="mx-auto max-w-2xl text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
          {category
            ? `Articles about ${category}`
            : "Insightful && helpful content curated for you."}
        </h1>
      </GridWrapper>

      {featuredPosts}

      <div className="relative space-y-8 text-center">
        <div className="space-y-4">
          <GridWrapper>
            <div className="text-center text-sm font-medium text-indigo-600">
              <span>Blogs</span>
            </div>
          </GridWrapper>
          <GridWrapper>
            <h3 className="mx-auto max-w-lg text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
              Content written in collaboration with{" "}
              <a
                href="https://medium.com/@teendifferent"
                className="text-indigo-400 hover:text-indigo-600 hover:underline"
              >
                Teen Different
              </a>
            </h3>
          </GridWrapper>
        </div>
      </div>

      <div>
        <CategorySelect categories={categories} currentCategory={category} />
        <BlogPostList posts={displayedPosts} />
      </div>

      <NewsletterSignUp
        title={
          category ? `Stay updated on ${category} articles` : "Stay updated"
        }
        description="Sign up to receive notifications about new blog posts, insights, and exclusive content directly in your inbox."
        buttonText="Get Notified"
      />
    </div>
  );
}
