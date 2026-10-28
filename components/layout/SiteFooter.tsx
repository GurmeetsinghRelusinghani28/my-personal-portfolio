import { profile } from "@/content/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {year} {profile.name}. Built with Next.js & attention to detail.
        </p>
        <p className="font-mono text-xs">
          VIT Pune · Graduating {profile.graduation}
        </p>
      </div>
    </footer>
  );
}
