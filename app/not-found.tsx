import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-6xl flex-col items-start justify-center px-5 py-20">
      <p className="font-mono text-xs uppercase tracking-wider text-accent-lime">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold">Page not found</h1>
      <Link
        href="/"
        className="mt-6 text-accent-blue underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
      >
        Return home
      </Link>
    </div>
  );
}
