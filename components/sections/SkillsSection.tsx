import { projectTechnologies, skillGroups } from "@/content/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 border-b border-border py-20 sm:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="Tools I reach for—and why"
            description="Core stack plus technologies proven in project work. No arbitrary percentages—just what I use regularly."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.04}>
              <div className="rounded-sm border border-border p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent-blue">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-border bg-surface-raised/60 px-3 py-1.5 text-sm text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="rounded-sm border border-dashed border-border p-6">
            <h3
              id="skills-heading"
              className="font-mono text-xs uppercase tracking-wider text-muted"
            >
              Also used in projects
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {projectTechnologies.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-xs text-muted"
                >
                  <span className="text-accent-lime">▸</span> {tech}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
