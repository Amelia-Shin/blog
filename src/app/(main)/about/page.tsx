import type { Metadata } from "next";
import { Mail, ExternalLink } from "lucide-react";
import { Container } from "@/components/common/container";
import { Card } from "@/components/common/card";
import { Badge } from "@/components/common/badge";
import { Divider } from "@/components/common/divider";
import { aboutConfig } from "@/config/about";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <Container className="py-16">
      <section className="flex flex-col gap-3">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{aboutConfig.role}</p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {aboutConfig.name}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          {aboutConfig.bio}
        </p>
      </section>

      <Divider className="my-12" />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">기술 스택</h2>
        <div className="flex flex-wrap gap-2">
          {aboutConfig.skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      </section>

      <Divider className="my-12" />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">경력</h2>
        <div className="flex flex-col gap-3">
          {aboutConfig.career.map((item) => (
            <Card key={item.period} className="p-5">
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">{item.period}</p>
              <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">{item.role}</p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <Divider className="my-12" />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">연락처</h2>
        <div className="flex flex-wrap gap-3">
          {aboutConfig.contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-50"
            >
              {contact.label === "Email" ? (
                <Mail className="h-4 w-4" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
              {contact.label}
            </a>
          ))}
        </div>
      </section>
    </Container>
  );
}
