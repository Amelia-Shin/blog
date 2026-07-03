export type CareerItem = {
  period: string;
  role: string;
  description: string;
};

export type ContactLink = {
  label: string;
  href: string;
};

type AboutConfig = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  career: CareerItem[];
  contacts: ContactLink[];
};

export const aboutConfig: AboutConfig = {
  name: "Heewon Shin",
  role: "",
  bio: "배운 것을 기록하고 공유하는 걸 좋아합니다.",
  skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"],
  career: [
    {
      period: "2026",
      role: "",
      description: "",
    },
  ],
  contacts: [
    { label: "Email", href: "mailto:gmldnjs0402@gmail.com" },
    { label: "GitHub", href: "https://github.com/Amelia-Shin" },
  ],
};
