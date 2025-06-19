"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { GridWrapper } from "./GridWrapper";

interface NewsletterSignUpProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

interface FormState {
  email: string;
  message: string;
  isSuccess: boolean;
  isLoading: boolean;
}

export function NewsletterSignUp({
  title = "Connect with me now!",
  description = "I'm always looking for new opportunities to connect with people. Share your email and I will ping you back asap.",
  buttonText = "Connect",
}: NewsletterSignUpProps) {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    message: "",
    isSuccess: false,
    isLoading: false,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.email) {
      setFormState((prev) => ({
        ...prev,
        message: "Please provide an email address.",
        isLoading: false,
      }));
      return;
    }

    setFormState((prev) => ({
      ...prev,
      isLoading: true,
      message: "",
    }));

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const response = await fetch("https://formspree.io/f/xldnjkwg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormState((prev) => ({
          ...prev,
          isSuccess: true,
          message: "Perfect! I'll ping you back as soon as I see it!",
          email: "",
        }));
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        message: "Something went wrong. Please try again later.",
        isSuccess: false,
      }));
    } finally {
      setFormState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="relative pb-16">
      <GridWrapper>
        <div className="relative overflow-x-clip">
          <div className="drama-shadow rounded-2xl bg-dark-primary p-14 md:p-[100px]">
            {/* Lines */}
            <div className="absolute left-0 right-0 top-[34px] z-10 h-px w-full bg-zinc-600 md:top-[48px]"></div>
            <div className="absolute bottom-0 right-[34px] top-0 z-10 h-full w-px bg-zinc-600 md:right-[48px]"></div>
            <div className="absolute bottom-[34px] left-0 right-0 z-10 h-px w-full bg-zinc-600 md:bottom-[48px]"></div>
            <div className="absolute bottom-0 left-[34px] top-0 z-10 h-full w-px bg-zinc-600 md:left-[48px]"></div>

            {/* Top Right Cross */}
            <div className="absolute right-[44.5px] top-[48px] z-20 hidden h-px w-2 bg-zinc-300 md:block"></div>
            <div className="absolute right-[48px] top-[44.5px] z-20 hidden h-2 w-px bg-zinc-300 md:block"></div>
            {/* Top Left Cross */}
            <div className="absolute left-[44.5px] right-0 top-[48px] z-20 hidden h-px w-2 bg-zinc-300 md:block"></div>
            <div className="absolute left-[48px] right-0 top-[44.5px] z-20 hidden h-2 w-px bg-zinc-300 md:block"></div>
            {/* Bottom Left Cross */}
            <div className="absolute bottom-[48px] left-[44.5px] right-0 z-20 hidden h-px w-2 bg-zinc-300 md:block"></div>
            <div className="absolute bottom-[44.5px] left-[48px] right-0 z-20 hidden h-2 w-px bg-zinc-300 md:block"></div>
            {/* Bottom Right Cross */}
            <div className="absolute bottom-[48px] right-[44.5px] z-20 hidden h-px w-2 bg-zinc-300 md:block"></div>
            <div className="absolute bottom-[44.5px] right-[48px] z-20 hidden h-2 w-px bg-zinc-300 md:block"></div>

            <h2 className="mb-4 text-3xl font-medium text-slate-50">{title}</h2>
            <p className="z-50 mb-8 max-w-[336px] text-base leading-8 text-gray-300 md:mb-12">
              {description}
            </p>
            <div className="z-50 mb-4 space-y-4">
              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/xldnjkwg"
                method="POST"
                className="relative md:inline-block"
              >
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full rounded-full border border-gray-400 bg-transparent px-5 py-3 pr-[120px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:ring-offset-2 focus:ring-offset-dark-primary md:w-[425px]"
                  style={{
                    textOverflow: "ellipsis",
                  }}
                  disabled={formState.isLoading}
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 z-50 inline-flex h-[42px] min-w-[100px] items-center justify-center rounded-full bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-lg ring-1 ring-white transition-all duration-300 hover:bg-slate-200 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={formState.isLoading}
                >
                  {formState.isLoading ? "Sending..." : buttonText}
                </button>
              </form>
              {/* Set minimum height to prevent layout shift */}
              <div className="min-h-[15px] md:min-h-[30px]">
                {formState.message && (
                  <p
                    className={`text-sm ${
                      formState.isSuccess ? "text-indigo-300" : "text-rose-400"
                    }`}
                  >
                    {formState.message}
                  </p>
                )}
              </div>
            </div>
            <p className="text-base text-gray-300">
              <span className="font-bold text-white">
                Don&apos;t forget to connect on LinkedIn!
              </span>
            </p>
            <svg
              className="absolute -top-10 right-0 z-10 hidden lg:block"
              width="775"
              height="500"
              viewBox="0 0 150 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_i_185_3161)">
                <path
                  d=" M68.526520,161.735367   C32.704624,150.827805 15.320831,125.234161 12.000687,89.949768   C8.975158,57.796352 28.334606,14.635164 74.439186,6.610081   C80.119919,5.621278 86.052124,5.931013 91.869194,5.899926   C107.686539,5.815397 123.504631,5.870898 139.574478,5.870898   C139.170410,6.563613 138.656189,7.671822 137.943497,8.632848   C128.129272,21.867022 118.215271,35.028183 108.516823,48.346394   C106.679985,50.868809 104.857597,51.592911 101.881531,51.022842   C93.720596,49.459614 85.573875,49.859810 77.765015,52.744041   C63.671516,57.949528 54.226105,73.587471 56.208801,87.950928   C58.686432,105.899895 70.411263,117.692787 87.457100,118.887611   C92.559631,119.245277 97.736122,118.411102 102.874413,118.474228   C104.528824,118.494553 106.810532,119.152214 107.718605,120.345345   C118.572311,134.606094 129.221039,149.022842 139.904236,163.373016   C139.593170,163.713974 139.396072,164.115524 139.205673,164.112381   C118.075073,163.762131 96.944290,163.413406 75.815826,162.957520   C73.511749,162.907806 71.221199,162.230774 68.526520,161.735367  z"
                  fill="url(#paint0_linear_185_3161)"
                />
                <path
                  d=" M150.167740,17.176170   C155.009933,6.832542 162.719193,4.010007 173.605774,4.918252   C186.478348,5.992184 199.509079,5.170447 213.636810,5.170447   C193.739227,31.692249 174.358475,57.525169 154.923462,83.430412   C174.381134,109.841446 193.686157,136.045303 213.562866,163.025131   C199.419754,163.025131 186.128159,162.252502 172.975021,163.269958   C162.481567,164.081696 156.289062,160.554611 150.357666,151.843384   C134.742554,128.910065 117.929047,106.792694 101.466591,84.176903   C117.701759,61.836433 133.826111,39.648460 150.167740,17.176170  z"
                  fill="url(#paint1_linear_185_3161)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_i_185_3161"
                  x="0"
                  y="0"
                  width="501"
                  height="503"
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
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_185_3161"
                  />
                </filter>
                <motion.linearGradient
                  id="paint0_linear_185_3161"
                  x1="250.5"
                  y1="119.845"
                  x2="250.5"
                  y2="501"
                  gradientUnits="userSpaceOnUse"
                >
                  <motion.stop
                    animate={{
                      stopColor: formState.isSuccess ? "#4f46e5" : "#4B4B4F",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.stop
                    offset="1"
                    animate={{
                      stopColor: formState.isSuccess ? "#818cf8" : "#3C3C3F",
                      stopOpacity: formState.isSuccess ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.linearGradient>
                <motion.linearGradient
                  id="paint1_linear_185_3161"
                  x1="236.758"
                  y1="59.688"
                  x2="236.758"
                  y2="418.249"
                  gradientUnits="userSpaceOnUse"
                >
                  <motion.stop
                    animate={{
                      stopColor: formState.isSuccess ? "#4f46e5" : "#4B4B4F",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.stop
                    offset="1"
                    animate={{
                      stopColor: formState.isSuccess ? "#818cf8" : "#3C3C3F",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </GridWrapper>
      <span className="absolute bottom-6 left-8">
        <svg
          width="24"
          height="14"
          viewBox="0 0 24 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.24"
            d="M0.827592 6.88352V6.01349C1.39104 6.01349 1.7838 5.89915 2.00586 5.67045C2.23124 5.43845 2.34393 5.06226 2.34393 4.5419V3.27415C2.34393 2.71401 2.41353 2.25497 2.55273 1.89702C2.69525 1.53906 2.9024 1.26065 3.17418 1.06179C3.44596 0.862926 3.7774 0.725378 4.1685 0.649147C4.5596 0.569602 5.00373 0.52983 5.50089 0.52983V1.91193C5.10979 1.91193 4.80984 1.96662 4.60103 2.07599C4.39222 2.18205 4.24805 2.34612 4.1685 2.56818C4.09227 2.79025 4.05415 3.07363 4.05415 3.41832V5.04901C4.05415 5.30421 4.01107 5.54285 3.92489 5.76491C3.83872 5.98698 3.68129 6.18253 3.45259 6.35156C3.2239 6.51728 2.89743 6.6482 2.47319 6.74432C2.05226 6.83712 1.50373 6.88352 0.827592 6.88352ZM5.50089 13.1626C5.00373 13.1626 4.5596 13.1229 4.1685 13.0433C3.7774 12.9671 3.44596 12.8295 3.17418 12.6307C2.9024 12.4318 2.69525 12.1534 2.55273 11.7955C2.41353 11.4375 2.34393 10.9785 2.34393 10.4183V9.15554C2.34393 8.63518 2.23124 8.26065 2.00586 8.03196C1.7838 7.79995 1.39104 7.68395 0.827592 7.68395V6.81392C1.50373 6.81392 2.05226 6.86198 2.47319 6.9581C2.89743 7.0509 3.2239 7.18182 3.45259 7.35085C3.68129 7.51657 3.83872 7.71046 3.92489 7.93253C4.01107 8.15459 4.05415 8.39157 4.05415 8.64347V10.2741C4.05415 10.6188 4.09227 10.9022 4.1685 11.1243C4.24805 11.3464 4.39222 11.5121 4.60103 11.6214C4.80984 11.7308 5.10979 11.7855 5.50089 11.7855V13.1626ZM0.827592 7.68395V6.01349H2.40359V7.68395H0.827592ZM14.4286 0.340908L11.1474 12.5312H9.57138L12.8526 0.340908H14.4286ZM23.1712 6.81392V7.68395C22.6077 7.68395 22.2133 7.79995 21.9879 8.03196C21.7659 8.26065 21.6548 8.63518 21.6548 9.15554V10.4183C21.6548 10.9785 21.5836 11.4375 21.4411 11.7955C21.3018 12.1534 21.0964 12.4318 20.8246 12.6307C20.5528 12.8295 20.2214 12.9671 19.8303 13.0433C19.4392 13.1229 18.995 13.1626 18.4979 13.1626V11.7855C18.889 11.7855 19.1889 11.7308 19.3977 11.6214C19.6065 11.5121 19.7491 11.3464 19.8253 11.1243C19.9048 10.9022 19.9446 10.6188 19.9446 10.2741V8.64347C19.9446 8.39157 19.9877 8.15459 20.0739 7.93253C20.16 7.71046 20.3175 7.51657 20.5462 7.35085C20.7749 7.18182 21.0997 7.0509 21.5206 6.9581C21.9448 6.86198 22.495 6.81392 23.1712 6.81392ZM18.4979 0.52983C18.995 0.52983 19.4392 0.569602 19.8303 0.649147C20.2214 0.725378 20.5528 0.862926 20.8246 1.06179C21.0964 1.26065 21.3018 1.53906 21.4411 1.89702C21.5836 2.25497 21.6548 2.71401 21.6548 3.27415V4.5419C21.6548 5.06226 21.7659 5.43845 21.9879 5.67045C22.2133 5.89915 22.6077 6.01349 23.1712 6.01349V6.88352C22.495 6.88352 21.9448 6.83712 21.5206 6.74432C21.0997 6.6482 20.7749 6.51728 20.5462 6.35156C20.3175 6.18253 20.16 5.98698 20.0739 5.76491C19.9877 5.54285 19.9446 5.30421 19.9446 5.04901V3.41832C19.9446 3.07363 19.9048 2.79025 19.8253 2.56818C19.7491 2.34612 19.6065 2.18205 19.3977 2.07599C19.1889 1.96662 18.889 1.91193 18.4979 1.91193V0.52983ZM23.1712 6.01349V7.68395H21.5952V6.01349H23.1712Z"
            fill="#A5AEB8"
          />
        </svg>
      </span>
      <span className="absolute bottom-6 right-8">
        <svg
          width="24"
          height="8"
          viewBox="0 0 24 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_i_185_3210)">
            <rect width="24" height="8" rx="1" fill="#EDEEF2" />
          </g>
          <defs>
            <filter
              id="filter0_i_185_3210"
              x="0"
              y="0"
              width="24"
              height="9.5"
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
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.647059 0 0 0 0 0.682353 0 0 0 0 0.721569 0 0 0 0.32 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_185_3210"
              />
            </filter>
          </defs>
        </svg>
      </span>
    </div>
  );
}
