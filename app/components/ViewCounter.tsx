import clsx from "clsx";

export async function ViewCounter({
  slug,
  increment = true,
  className = "text-xs text-slate-200",
}: {
  slug: string;
  increment?: boolean;
  className?: string;
}) {
  const viewCount = 0;

  return (
    <span className={clsx(className)}>
      View Count: {viewCount}
    </span>
  );
}

// Helper function to just get the count without incrementing
async function getViewCount(slug: string) {
  return 0;
}
