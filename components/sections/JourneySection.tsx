import { journeyStages } from "@/content/journey";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function JourneySection() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="scroll-mt-24 border-b border-border py-20 sm:py-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Journey"
            title="How I got here"
            description="A scroll-friendly narrative—from engineering interests to leadership and what's next."
          />
        </Reveal>

        <ol className="relative mt-12 space-y-8 border-l border-border pl-6 sm:pl-8">
          {journeyStages.map((stage, i) => (
            <Reveal key={stage.id} delay={i * 0.04}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[calc(1.5rem+1px)] top-1.5 h-3 w-3 rounded-full border border-accent-blue bg-background sm:-left-[calc(2rem+1px)]"
                />
                <p className="font-mono text-xs uppercase tracking-wider text-accent-lime">
                  {stage.label}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  {stage.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {stage.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p id="journey-heading" className="sr-only">
          Career journey timeline
        </p>
      </Container>
    </section>
  );
}
