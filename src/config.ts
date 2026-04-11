export const SITE = {
  website: "https://www.mothcode.com", // replace this with your deployed domain
  author: "Konrad",
  profile: "https://www.mothcode.com/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Astro-PaperMod",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
