const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  const { build } = await import("velite");
  await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/archives/v1",
        destination: "https://wizardly-payne-b3707b.netlify.app/",
        permanent: true,
      },
      {
        source: "/archives/v2",
        destination: "https://charvikusuma-2hvriu779-charvi-kusuma.vercel.app/",
        permanent: true,
      },
      {
        source: "/archives/v3",
        destination:
          "https://charvikusuma-dev-git-v3-charvi-kusuma.vercel.app/",
        permanent: true,
      },
      {
        source: "/archives/v4",
        destination: "https://charvikusuma.framer.website/",
        permanent: true,
      },
    ];
  },
};

export default config;
