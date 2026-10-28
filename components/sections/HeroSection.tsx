import { ArrowDown } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import { profile } from "@/content/profile";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { HeroGrid } from "@/components/hero/HeroGrid";
import { RotatingText } from "@/components/hero/RotatingText";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative border-b border-border pb-16 pt-10 sm:pt-14 lg:pt-20"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
              <span
                className="h-2 w-2 rounded-full bg-accent-lime shadow-[0_0_12px_rgba(163,230,53,0.8)]"
                aria-hidden
              />
              <span className="font-mono text-xs text-muted">
                {profile.availability}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
            >
              {profile.headline}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.intro}
            </p>

            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
              <span>Focus:</span>
              <RotatingText items={profile.rotatingFocus} />
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#projects">Explore My Work</ButtonLink>
              <ButtonLink href={profile.resumePath} download variant="secondary">
                Download Resume
              </ButtonLink>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-5 text-sm">
              <li>
                <a
                  href={profile.social.github}
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon size={16} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.social.linkedin}
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon size={16} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.social.leetcode}
                  className="inline-flex items-center gap-2 font-mono text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LeetCode
                </a>
              </li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[min(100%,28rem)]">
            <HeroGrid />
          </div>
        </div>

        <a
          href="#about"
          className="mt-12 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
        >
          <ArrowDown size={16} aria-hidden className="animate-bounce motion-reduce:animate-none" />
          Scroll to explore
        </a>
      </Container>
    </section>
  );
}
