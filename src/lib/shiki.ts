import { createHighlighter, type Highlighter } from "shiki";

// Notion's language list uses names/aliases Shiki mostly understands directly
// (e.g. "javascript", "typescript", "plain text"); this maps the handful that
// diverge to a Shiki-known grammar.
const LANGUAGE_ALIASES: Record<string, string> = {
  "plain text": "text",
  "c#": "csharp",
  "c++": "cpp",
  "objective-c": "objective-c",
  shell: "shellscript",
  docker: "dockerfile",
};

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: [],
    });
  }
  return highlighterPromise;
}

export function resolveShikiLanguage(language: string): string {
  const normalized = language.trim().toLowerCase();
  return LANGUAGE_ALIASES[normalized] ?? normalized;
}

export async function highlightCode(code: string, language: string): Promise<string> {
  const highlighter = await getHighlighter();
  const lang = resolveShikiLanguage(language);

  if (!highlighter.getLoadedLanguages().includes(lang)) {
    try {
      await highlighter.loadLanguage(lang as Parameters<Highlighter["loadLanguage"]>[0]);
    } catch {
      return highlightCode(code, "text");
    }
  }

  return highlighter.codeToHtml(code, {
    lang: highlighter.getLoadedLanguages().includes(lang) ? lang : "text",
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
