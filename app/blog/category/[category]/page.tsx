"use client";
import { useState } from "react";
import {
  extractUniqueBlogCategories,
  fetchAndSortBlogPosts,
} from "app/lib/utils";
import { NewsletterSignUp } from "@/app/components/NewsletterSignUp";
import { BlogPostList } from "@/app/components/BlogPostList";
import { CategorySelect } from "@/app/components/CategorySelect";

export default function CategoryPage() {
  const allPublishedBlogPosts = fetchAndSortBlogPosts();
  const categories = Array.from(
    extractUniqueBlogCategories(allPublishedBlogPosts),
  );
  const [category, setCategory] = useState("");

  const categoryPosts = category
    ? allPublishedBlogPosts.filter(
        (post) =>
          Array.isArray(post.categories) &&
          post.categories.some(
            (cat) => typeof cat === "string" && cat.toLowerCase() === category,
          ),
      )
    : allPublishedBlogPosts;

  return (
    <div className="mt-[100px] w-full space-y-[80px]">
      <title>{category ? `${category} Articles` : "Articles"}</title>
      <h1 className="mx-auto max-w-2xl text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
        {`Articles about ${category || "All"}`}
      </h1>

      <CategorySelect
        categories={categories}
        currentCategory={category}
        onCategoryChange={setCategory}
      />

      <BlogPostList posts={categoryPosts} />
      <NewsletterSignUp
        title={`Stay updated on ${category || "all"} articles`}
        description={`Sign up to receive notifications about new blog posts, insights, and exclusive content directly in your inbox.`}
        buttonText="Get Notified"
      />
    </div>
  );
}
