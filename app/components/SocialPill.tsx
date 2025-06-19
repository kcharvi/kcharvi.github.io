import { siteMetadata } from "app/data/siteMetadata";

export function SocialPill() {
  return (
    <div className="z-30 flex place-items-center space-x-1 rounded-full bg-dark-primary px-3 py-1.5">
      <a
        href={siteMetadata.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="h-5 w-5 text-gray-400 hover:text-gray-300"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4M7.65 13.979H5.706V7.723H7.65zm-.984-7.024c-.614 0-1.011-.435-1.011-.973c0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973m8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355c-.537 0-.856.371-.997.728c-.052.127-.065.307-.065.486v3.607H8.814v-4.26c0-.781-.025-1.434-.051-1.996h1.689l.089.869h.039c.256-.408.883-1.01 1.932-1.01c1.279 0 2.238.857 2.238 2.699z"
          ></path>
        </svg>
        <span className="sr-only">LinkedIn</span>
      </a>
      <a
        href={siteMetadata.social.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="h-5 w-5 text-gray-400 hover:text-gray-300"
          viewBox="-0.5 -0.5 13 13"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M6 0C2.687 0 0 2.754 0 6.152c0 2.718 1.719 5.024 4.103 5.837c.3.057.41-.133.41-.296c0-.146-.005-.533-.008-1.046c-1.669.371-2.021-.825-2.021-.825c-.273-.711-.666-.9-.666-.9c-.545-.382.04-.374.04-.374c.603.044.92.634.92.634c.535.94 1.404.668 1.746.511c.055-.397.21-.669.381-.822c-1.332-.155-2.733-.683-2.733-3.04c0-.672.234-1.221.618-1.651c-.062-.156-.268-.781.058-1.629c0 0 .504-.165 1.65.631A5.6 5.6 0 0 1 6 2.975a5.6 5.6 0 0 1 1.502.207c1.146-.796 1.649-.63 1.649-.63c.327.847.121 1.472.06 1.628c.384.43.616.979.616 1.65c0 2.364-1.403 2.884-2.74 3.036c.216.19.408.565.408 1.14c0 .821-.007 1.485-.007 1.687c0 .164.108.356.412.296c2.382-.816 4.1-3.12 4.1-5.837C12 2.754 9.313 0 6 0"
          ></path>
        </svg>
        <span className="sr-only">GitHub</span>
      </a>
      <a
        href={siteMetadata.social.leetcode}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="h-5 w-5 text-gray-400 hover:text-gray-300"
          viewBox="1 1 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-8.512-5.554a.75.75 0 0 1 .53.918l-2.588 9.66a.75.75 0 0 1-1.449-.389l2.589-9.659a.75.75 0 0 1 .918-.53M14.97 8.47a.75.75 0 0 1 1.06 0l.209.208c.635.635 1.165 1.165 1.529 1.642c.384.504.654 1.036.654 1.68s-.27 1.176-.654 1.68c-.364.477-.894 1.007-1.53 1.642l-.208.208a.75.75 0 1 1-1.06-1.06l.171-.172c.682-.682 1.139-1.14 1.434-1.528c.283-.37.347-.586.347-.77s-.064-.4-.347-.77c-.295-.387-.752-.846-1.434-1.528l-.171-.172a.75.75 0 0 1 0-1.06m-7 0a.75.75 0 0 1 1.06 1.06l-.171.172c-.682.682-1.138 1.14-1.434 1.528c-.283.37-.346.586-.346.77s.063.4.346.77c.296.387.752.846 1.434 1.528l.172.172a.75.75 0 1 1-1.061 1.06l-.208-.208c-.636-.635-1.166-1.165-1.53-1.642c-.384-.504-.653-1.036-.653-1.68s.27-1.176.653-1.68c.364-.477.894-1.007 1.53-1.642z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">LeetCode</span>
      </a>
      <a
        href={siteMetadata.social.google_scholar}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          className="h-5 w-5 text-gray-400 hover:text-gray-300"
          viewBox="-32 -32 574 574"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M390.9 298.5s0 .1.1.1c9.2 19.4 14.4 41.1 14.4 64C405.3 445.1 338.5 512 256 512s-149.3-66.9-149.3-149.3c0-22.9 5.2-44.6 14.4-64c1.7-3.6 3.6-7.2 5.6-10.7q6.6-11.4 15-21.3c27.4-32.6 68.5-53.3 114.4-53.3c33.6 0 64.6 11.1 89.6 29.9c9.1 6.9 17.4 14.7 24.8 23.5c5.6 6.6 10.6 13.8 15 21.3c2 3.4 3.8 7 5.5 10.5zm26.4-18.8c-30.1-58.4-91-98.4-161.3-98.4s-131.2 40-161.3 98.4L0 202.7L256 0l256 202.7l-94.7 77.1z"
          ></path>
        </svg>
        <span className="sr-only">Google Scholar</span>
      </a>
    </div>
  );
}
