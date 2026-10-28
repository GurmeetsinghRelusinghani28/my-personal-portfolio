import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { profile } from "@/content/profile";
import { fetchGitHubRepos } from "@/lib/github";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export async function GitHubSection() {
  const { repos, fromFallback } = await fetchGitHubRepos();

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="scroll-mt-24 border-b border-border py-20 sm:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Code"
            title="GitHub & competitive profiles"
            description="Public repositories and verified coding profiles. Stats appear only when fetched successfully—never fabricated."
          />
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border px-4 text-sm hover:border-accent-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
          >
            <GitHubIcon size={16} />
            GitHub profile
          </a>
          <a
            href={profile.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border px-4 font-mono text-sm hover:border-accent-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
          >
            LeetCode · {profile.coding.leetcodeRating}
          </a>
          {profile.coding.codechef.profileUrl ? (
            <a
              href={profile.coding.codechef.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border px-4 font-mono text-sm hover:border-accent-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
            >
              CodeChef · {profile.coding.codechef.stars} ({profile.coding.codechef.rating})
            </a>
          ) : (
            <p className="inline-flex min-h-11 items-center rounded-sm border border-dashed border-border px-4 font-mono text-xs text-muted">
              CodeChef · {profile.coding.codechef.stars} ({profile.coding.codechef.rating}) — profile URL pending
            </p>
          )}
        </div>

        {fromFallback ? (
          <p className="mt-4 text-sm text-muted" role="status">
            Showing curated repository list—live GitHub data is temporarily unavailable.
          </p>
        ) : null}

        <ul className="mt-10 divide-y divide-border rounded-sm border border-border">
          {repos.map((repo) => (
            <li key={repo.html_url} className="p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-display text-lg font-medium text-foreground hover:text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  >
                    {repo.name}
                    <ExternalLink size={14} aria-hidden className="text-muted" />
                  </a>
                  {repo.description ? (
                    <p className="mt-2 max-w-2xl text-sm text-muted">
                      {repo.description}
                    </p>
                  ) : null}
                  <p className="mt-2 font-mono text-xs text-muted">
                    {repo.language ?? "—"}
                    {repo.stargazers_count > 0
                      ? ` · ★ ${repo.stargazers_count}`
                      : ""}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p id="github-heading" className="sr-only">
          GitHub repositories
        </p>
      </Container>
    </section>
  );
}
