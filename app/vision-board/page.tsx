import { VisionBoardAnimatedCircle } from "@/app/components/VisionBoardAnimatedCircle";

export default function Page() {
  return (
    <>
      <title>Vision Board | Charvi Kusuma</title>
      <div className="absolute inset-0 top-0 bg-[radial-gradient(#e5e7eb_1px,transparent_2px)] [background-size:16px_16px]"></div>
      <div className="flex flex-wrap justify-center gap-24 p-12">
        {/* TODO: Add a button to add a new item */}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-full flex-col items-center justify-end bg-gradient-to-b from-transparent to-zinc-300 pb-8">
        <VisionBoardAnimatedCircle />
      </div>
    </>
  );
}
