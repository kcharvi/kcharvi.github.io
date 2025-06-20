// app/components/CurrentlyReadingBento.tsx

import { BentoCard } from "./BentoCard";
import Image from "next/image";

export function CurrentlyReadingBento() {
  return (
    <BentoCard height="h-full" className="group">
      <h2 className="mb-2 font-medium">Currently Reading</h2>
      <div className="relative h-full">
        <div className="left- absolute top-6 h-full origin-bottom-left transition-transform duration-300 ease-in-out group-hover:-rotate-3">
          <BookCover />
        </div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-white via-transparent to-transparent"></div>
    </BentoCard>
  );
}

function BookCover() {
  return (
    <div className="relative aspect-[3/4] h-[400px] w-[300px] overflow-hidden rounded bg-red-500">
      <div className="absolute left-5 h-full w-2 bg-slate-900/20 blur-sm"></div>
      <Image
        src="/about/current_reading.jpg"
        alt="Applied AI"
        width={300}
        height={400}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  );
}
