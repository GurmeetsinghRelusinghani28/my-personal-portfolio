import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "border border-accent-blue/40 bg-accent-blue/10 text-foreground hover:bg-accent-blue/20 focus-visible:ring-accent-blue",
  secondary:
    "border border-border bg-surface-raised text-foreground hover:border-accent-blue/50 hover:bg-surface-overlay focus-visible:ring-accent-blue",
  ghost:
    "border border-transparent text-muted hover:text-foreground focus-visible:ring-accent-blue",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  download?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
  download,
}: Props) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variants[variant],
    className,
  );

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        download={download || undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
