import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import Link from "next/link";
import type { ProjectCaseStudy } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "@/components/projects/ProjectVisual";

type Props = {
  project: ProjectCaseStudy;
  className?: string;
};

export function ProjectCard({ project, className }: Props) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-sm border border-border bg-surface-raised/40 transition-colors hover:border-accent-blue/40 focus-within:border-accent-blue/50",
        project.primary && "md:col-span-2 md:grid md:grid-cols-2 md:gap-0",
        className,
      )}
    >
      <ProjectVisual
        visual={project.visual}
        className={cn(
          "rounded-none border-0 border-b border-border md:border-b-0",
          project.primary && "md:border-r md:border-border",
        )}
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-xs uppercase tracking-wider text-accent-lime">
          {project.subtitle}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {project.stack.slice(0, 6).map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-border px-2 py-1 font-mono text-[11px] text-muted"
            >
              {tech}
            </li>
          ))}
          {project.stack.length > 6 ? (
            <li className="px-1 py-1 font-mono text-[11px] text-muted">
              +{project.stack.length - 6}
            </li>
          ) : null}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-accent-blue/40 bg-accent-blue/10 px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent-blue/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
            >
              Live Demo
              <ArrowUpRight size={16} aria-hidden />
            </a>
          ) : null}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-accent-blue/40 bg-accent-blue/10 px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent-blue/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
          >
            View Project
            <ArrowUpRight size={16} aria-hidden />
          </Link>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border px-4 text-sm text-muted transition-colors hover:border-accent-blue/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
          >
            <GitHubIcon size={16} />
            View Source
          </a>
        </div>
      </div>
    </article>
  );
}
