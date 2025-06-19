import Link from "next/link";
import { CommunityWallModal } from "@/app/components/CommunityWallModal";
import createSupabaseServerClient from "@/app/lib/supabase/server";
import { CommunityWallCard } from "@/app/components/CommunityWallCard";
import { motion } from "framer-motion";
import { BuildCircle } from "@/app/components/BuildCircle";
import { CommunityWallAnimatedCircle } from "@/app/components/CommunityWallAnimatedCircle";

type SearchParamProps = {
  searchParams: Promise<{ show: string }>;
};

export default async function Page({ searchParams }: SearchParamProps) {
  const supabase = await createSupabaseServerClient();

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  console.log(messages);

  const show = (await searchParams).show === "true";

  return (
    <>
      <title>Community Wall | Charvi Kusuma</title>
      {show ? <CommunityWallModal /> : null}
      <div className="absolute inset-0 top-0 bg-[radial-gradient(#e5e7eb_1px,transparent_2px)] [background-size:16px_16px]"></div>
      <div className="flex flex-wrap justify-center gap-24 p-12">
        {messages?.map((message) => (
          <CommunityWallCard
            key={message.id}
            message={message.message}
            patternIndex={message.patternindex}
            author={message.creator_name}
            profilePicture={message.creator_avatar_url}
            rotation={message.rotation}
            className="h-[300px] w-[250px] shadow-[12px_12px_0px_0px_rgba(214,218,222,0.3)]"
          />
        ))}
      </div>
      {/* TODO: Add a button to add a new item */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-full flex-col items-center justify-end bg-gradient-to-b from-transparent to-zinc-300 pb-8">
        <CommunityWallAnimatedCircle />
      </div>
    </>
  );
}
