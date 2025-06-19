import React from "react";

export function BuildCircle({ ImageUrl }: { ImageUrl: string }) {
  return (
    <svg
      width="210"
      height="210"
      viewBox="0 0 179 171"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[210px] w-[210px]"
    >
      <g className="" style={{ transformOrigin: "89.5001px 104.5px" }}>
        <circle
          cx="89.5001"
          cy="104.5"
          r="1.13"
          fill="#4D4E52"
          stroke="#4D4E52"
          strokeWidth="0.5"
        />
        <clipPath id="albumClip">
          <circle cx="89.5001" cy="104.5" r="35" />
        </clipPath>
        <image
          href={ImageUrl}
          x="54.5001"
          y="69.5"
          width="70"
          height="70"
          clipPath="url(#albumClip)"
        />
      </g>
      <circle cx="89.5009" cy="104.5" r="3.58" fill="#4D4E52" />
      <circle
        cx="89.5009"
        cy="104.5"
        r="3.33"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="0.5"
      />
      <g filter="url(#filter0_f_161_134)">
        <path
          d="M88.5 97L46 26C84.8 5.60003 121.833 18.5 135.5 27.5L88.5 97Z"
          fill="white"
          fillOpacity="0.15"
          style={{ mixBlendMode: "soft-light" }}
        />
      </g>
      <path
        d="M60 22.5C69.6667 18.6667 95.1 13.3 119.5 22.5"
        stroke="url(#paint0_linear_161_134)"
      />
      <path
        d="M59 46C73.5 38.5 96 34 118.5 45.5"
        stroke="url(#paint1_linear_161_134)"
        strokeOpacity="0.3"
      />
      <defs>
        <filter
          id="filter0_f_161_134"
          x="31"
          y="0.119873"
          width="119.5"
          height="111.88"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="7.5"
            result="effect1_foregroundBlur_161_134"
          />
        </filter>
        <linearGradient
          id="paint0_linear_161_134"
          x1="60"
          y1="19.9601"
          x2="119.5"
          y2="19.9601"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.51" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_161_134"
          x1="60"
          y1="40.9601"
          x2="119.5"
          y2="40.9601"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.51" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
