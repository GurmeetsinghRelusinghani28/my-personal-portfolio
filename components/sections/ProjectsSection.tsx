import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 border-b border-border py-20 sm:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Featured work"
            title="Projects that show how I think"
            description="Three builds spanning real-time collaboration, cross-platform products, and machine learning—each with a dedicated case study."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06} className="contents">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <p id="projects-heading" className="sr-only">
          Featured projects
        </p>
      </Container>
    </section>
  );
}
