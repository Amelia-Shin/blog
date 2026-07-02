import type { Author } from "@/types/post";

type SiteConfig = {
  name: string;
  description: string;
  url: string;
  author: Author;
};

export const siteConfig: SiteConfig = {
  name: "블로그",
  description: "Notion으로 작성하는 개인 블로그",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: {
    name: "Author",
  },
};
