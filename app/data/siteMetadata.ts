// app/data/siteMetadata.ts

export const siteMetadata = {
  title: "Charvi Kusuma",
  description: "AI/ML Engineer and Researcher. Wander around my digital space!",
  author: "Charvi Kusuma",
  language: "en-US",
  locale: "en_US",
  email: "kcharvi01@gmail.com",

  // Social Links
  social: {
    linkedin: "https://www.linkedin.com/in/k-charvi/",
    github: "https://github.com/kcharvi",
    leetcode: "https://leetcode.com/u/Charvi_K/",
    leetcodeUsername: "Charvi_K",
    google_scholar:
      "https://scholar.google.com/citations?hl=en&user=Mijjb_gAAAAJ",
    podcast: "https://creators.spotify.com/pod/profile/k-charvi/",
  },

  // Professional Links
  professional: {
    calendly: "https://cal.com/charvi-kusuma/30min",
    resume: "/resume.pdf",
    portfolio: "https://charvi-kusuma.vercel.app",
  },

  // Site URLs
  siteUrl: "https://charvi-kusuma.vercel.app",
  siteRepo: "https://github.com/charvi-kusuma/charvi-kusuma",
  socialBanner: "/charvikusuma_overlay.png",
  logo: "/ck_color_black_no_bg.svg",
};

export type SiteMetadata = typeof siteMetadata;
