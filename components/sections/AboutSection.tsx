import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-b border-border py-20 sm:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="Building with fundamentals and curiosity"
            description="I am pursuing Computer Engineering at VIT Pune. I enjoy solving technical problems and shipping full-stack and AI-powered applications—learning continuously through collaboration and implementation."
          />
          <h2 id="about-heading" className="sr-only">
            About Gurmeetsingh Relusinghani
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {profile.highlights.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.05}>
              <div className="h-full rounded-sm border border-border bg-surface-raised/50 p-5">
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-lg font-medium text-foreground">
                  {item.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-3xl">
          <p className="text-base leading-relaxed text-muted">
            I care about engineering fundamentals—clean architecture, readable
            code, and measurable outcomes—not hype. As Technical Head of the
            Abhivriddhi Committee, I help drive website development and
            technical initiatives while staying hands-on with implementation.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
