import { ArrowLeft } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} · Case Study`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="border-b border-border py-12 sm:py-16">
      <Container>
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
        >
          <ArrowLeft size={16} aria-hidden />
          Back to projects
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent-lime">
              {project.subtitle}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <ButtonLink href={project.liveUrl} external>
                  Live demo
                </ButtonLink>
              ) : null}
              <ButtonLink href={project.repoUrl} external variant="secondary">
                <GitHubIcon size={16} />
                View Source
              </ButtonLink>
            </div>

            {project.disclaimer ? (
              <p className="mt-6 rounded-sm border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-100/90">
                {project.disclaimer}
              </p>
            ) : null}
          </div>
          <ProjectVisual visual={project.visual} />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="problem">
            <h2 id="problem" className="font-display text-xl font-semibold">
              Problem
            </h2>
            <p className="mt-3 text-muted leading-relaxed">{project.problem}</p>
          </section>
          <section aria-labelledby="approach">
            <h2 id="approach" className="font-display text-xl font-semibold">
              Approach
            </h2>
            <p className="mt-3 text-muted leading-relaxed">{project.approach}</p>
          </section>
          <section aria-labelledby="architecture">
            <h2 id="architecture" className="font-display text-xl font-semibold">
              Architecture
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              {project.architecture}
            </p>
          </section>
          <section aria-labelledby="challenges">
            <h2 id="challenges" className="font-display text-xl font-semibold">
              Challenges
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              {project.challenges}
            </p>
          </section>
        </div>

        <section className="mt-12" aria-labelledby="results">
          <h2 id="results" className="font-display text-xl font-semibold">
            Results
          </h2>
          <p className="mt-3 max-w-3xl text-muted leading-relaxed">
            {project.results}
          </p>
          <ul className="mt-6 space-y-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-muted">
                <span className="text-accent-lime" aria-hidden>
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="stack">
          <h2 id="stack" className="font-mono text-xs uppercase tracking-wider text-accent-blue">
            Technology stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-sm border border-border px-3 py-1.5 text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </article>
  );
}
