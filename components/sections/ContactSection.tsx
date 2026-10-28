"use client";

import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import { FormEvent, useState } from "react";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

type FormState = "idle" | "submitting" | "success" | "error" | "mailto";

export function ContactSection() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (honeypot) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: honeypot,
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill in all fields.");
      return;
    }

    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        mode?: string;
        error?: string;
        mailto?: string;
      };

      if (json.mode === "mailto" && json.mailto) {
        window.location.href = json.mailto;
        setState("mailto");
        return;
      }

      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Unable to send message.");
      }

      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-20 sm:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Have an interesting problem to solve? Let's talk."
              description="Reach out for internships, collaborations, or thoughtful feedback on my work."
            />
            <ul className="mt-8 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-11 items-center gap-2 text-foreground hover:text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  <Mail size={16} aria-hidden />
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  <GitHubIcon size={16} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  <LinkedInIcon size={16} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={onSubmit}
              className="rounded-sm border border-border bg-surface-raised/40 p-6 sm:p-7"
              noValidate
            >
              <h3 id="contact-heading" className="sr-only">
                Contact form
              </h3>

              <div className="hidden" aria-hidden>
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm text-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm text-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-1.5 w-full resize-y rounded-sm border border-border bg-background px-3 py-2.5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  />
                </div>
              </div>

              {error ? (
                <p className="mt-4 text-sm text-red-400" role="alert">
                  {error}
                </p>
              ) : null}

              {state === "success" ? (
                <p className="mt-4 text-sm text-accent-lime" role="status">
                  Message sent—thank you. I&apos;ll get back to you soon.
                </p>
              ) : null}

              {state === "mailto" ? (
                <p className="mt-4 text-sm text-muted" role="status">
                  Email service is not configured—your mail app should open with a
                  draft. To enable direct delivery, set RESEND_API_KEY in your
                  environment.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={state === "submitting"}
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-accent-blue/40 bg-accent-blue/10 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent-blue/20 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue sm:w-auto"
              >
                {state === "submitting" ? "Sending…" : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
