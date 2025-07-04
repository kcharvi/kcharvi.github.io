// app/components/CreateVisionNoteBuilder.tsx

"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { patterns } from "../lib/visionBoard/types";
import { VisionBoardCard } from "./VisionBoardCard";

export function CreateVisionNoteBuilder({
  onSubmit,
}: {
  onSubmit: (formData: FormData) => Promise<void>;
}) {
  const [message, setMessage] = useState("");
  const [patternIndex, setPatternIndex] = useState(() =>
    Math.floor(Math.random() * patterns.length),
  );
  const [rotation, setRotation] = useState(0);

  const handlePrevPattern = () => {
    setPatternIndex((prev) => (prev - 1 + patterns.length) % patterns.length);
  };

  const handleNextPattern = () => {
    setPatternIndex((prev) => (prev + 1) % patterns.length);
  };

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <form
      action={onSubmit}
      className="flex h-full flex-col items-center justify-center gap-6"
    >
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={handlePrevPattern}
          className="stroke group hidden rounded-full bg-bg-primary stroke-[#A5AEB8] p-4 md:block"
          aria-label="Previous pattern"
        >
          <svg
            className="h-8 w-8 stroke-[#A5AEB8] group-hover:stroke-slate-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="relative mb-6">
          <div style={{ transform: `rotate(${rotation}deg)` }}>
            <VisionBoardCard
              patternIndex={patternIndex}
              title="Vision Note"
              ideaDescription={message}
              techStack={[]}
              rotation={rotation}
              className="h-[450px] w-[375px]"
            />
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="absolute left-1/2 top-1/2 z-20 h-[120px] w-[80%] -translate-x-1/2 -translate-y-1/2 resize-none overflow-hidden bg-transparent text-center text-2xl font-bold leading-tight placeholder-slate-900 focus:outline-none"
              placeholder="Type here to leave a message"
              maxLength={200}
              rows={4}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
              }}
            />
          </div>
          <input type="hidden" name="patternIndex" value={patternIndex} />
          <input type="hidden" name="rotation" value={rotation} />
        </div>

        <button
          type="button"
          onClick={handleNextPattern}
          className="stroke group hidden rounded-full bg-bg-primary stroke-[#A5AEB8] p-4 md:block"
          aria-label="Next pattern"
        >
          <svg
            className="h-8 w-8 stroke-[#A5AEB8] group-hover:stroke-slate-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="flex w-[375px] justify-around">
        <div className="flex h-9 w-24 items-center justify-center gap-2 rounded-full bg-dark-primary px-4">
          <input
            type="range"
            id="rotation"
            min="-15"
            max="15"
            step="0.1"
            value={rotation}
            onChange={(e) => setRotation(parseFloat(e.target.value))}
            className="w-full accent-indigo-400"
          />
        </div>

        <div className="flex h-9 items-center justify-center gap-2 rounded-full bg-dark-primary px-4">
          {patterns.map((pattern, index) => (
            <button
              key={index}
              onClick={() => setPatternIndex(index)}
              type="button"
              className={`h-3 w-3 rounded-full bg-gradient-to-b transition-all ${
                pattern.gradient
              } ${
                patternIndex === index ? "outline outline-2 outline-white" : ""
              }`}
            />
          ))}
        </div>
        <div className="flex h-9 items-center gap-2 divide-x-2 divide-text-secondary rounded-full bg-dark-primary px-4">
          <Link className="h-6 w-6" href="/vision-board">
            <button
              type="button"
              className="group bg-dark-primary text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="h-6 w-6 text-rose-500" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M17.25 6.75L6.75 17.25"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6.75 6.75L17.25 17.25"
                ></path>
              </svg>
            </button>
          </Link>
          <button
            type="submit"
            disabled={!message.trim()}
            className="group text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              className="ml-2 h-7 w-7 text-indigo-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.25 16.25L9.6397 16.6859C9.80873 16.9226 10.0993 17.0402 10.3854 16.9877C10.6714 16.9352 10.9013 16.7221 10.9753 16.4409L10.25 16.25ZM16.7147 8.33866C17.0398 8.082 17.0953 7.61038 16.8387 7.28527C16.582 6.96016 16.1104 6.90467 15.7853 7.16134L16.7147 8.33866ZM8.3603 12.3141C8.11954 11.977 7.65113 11.8989 7.31407 12.1397C6.97701 12.3805 6.89894 12.8489 7.1397 13.1859L8.3603 12.3141ZM10.9753 16.4409C11.5574 14.2291 12.971 12.2079 14.2825 10.7134C14.9328 9.97242 15.5456 9.37472 15.9949 8.96321C16.2192 8.7577 16.4021 8.59926 16.5275 8.49327C16.5902 8.44029 16.6385 8.40046 16.6704 8.37446C16.6863 8.36146 16.6982 8.35192 16.7056 8.34593C16.7094 8.34293 16.712 8.34082 16.7136 8.3396C16.7143 8.339 16.7148 8.33861 16.715 8.33846C16.7151 8.33838 16.7151 8.33835 16.7151 8.33839C16.7151 8.33841 16.715 8.33847 16.715 8.33848C16.7149 8.33857 16.7147 8.33866 16.25 7.75C15.7853 7.16134 15.7851 7.16146 15.7849 7.1616C15.7848 7.16167 15.7847 7.16182 15.7845 7.16195C15.7842 7.16222 15.7838 7.16254 15.7833 7.16292C15.7823 7.16367 15.7811 7.16466 15.7796 7.16587C15.7765 7.1683 15.7723 7.17164 15.767 7.17588C15.7565 7.18436 15.7415 7.19646 15.7223 7.21209C15.684 7.24333 15.629 7.28871 15.5594 7.34755C15.4202 7.46519 15.2222 7.63683 14.9817 7.8571C14.5013 8.29716 13.8485 8.93383 13.155 9.72406C11.779 11.2921 10.1926 13.5209 9.52469 16.0591L10.9753 16.4409ZM7.1397 13.1859L9.6397 16.6859L10.8603 15.8141L8.3603 12.3141L7.1397 13.1859Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
