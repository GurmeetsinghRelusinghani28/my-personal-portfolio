import { fallbackRepositories } from "@/content/github-fallback";
import { profile } from "@/content/profile";

export type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
};

const CACHE_TTL_MS = 1000 * 60 * 15;

let cache: { at: number; data: GitHubRepo[] } | null = null;

const EXCLUDED = new Set([
  "GurmeetsinghRelusinghani28",
  "first-contributions",
  "lingo.dev",
  "ToolJet",
]);

export async function fetchGitHubRepos(): Promise<{
  repos: GitHubRepo[];
  fromCache: boolean;
  fromFallback: boolean;
}> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return { repos: cache.data, fromCache: true, fromFallback: false };
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "gurmeetsingh-portfolio",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUsername}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 900 } },
    );

    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}`);
    }

    const raw = (await res.json()) as GitHubRepo[];
    const filtered = raw
      .filter((r) => !r.fork && !EXCLUDED.has(r.name))
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )
      .slice(0, 8);

    cache = { at: Date.now(), data: filtered };
    return { repos: filtered, fromCache: false, fromFallback: false };
  } catch {
    const fallback: GitHubRepo[] = fallbackRepositories.map((r) => ({
      name: r.name,
      html_url: r.html_url,
      description: r.description,
      language: r.language,
      stargazers_count: r.stargazers_count ?? 0,
      fork: false,
      updated_at: new Date(0).toISOString(),
    }));
    return { repos: fallback, fromCache: false, fromFallback: true };
  }
}
