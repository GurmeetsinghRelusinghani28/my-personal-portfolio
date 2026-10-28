import Image from "next/image";
import { cn } from "@/lib/cn";

type Visual = "chattermind" | "rozgarsetu" | "dermscan";

const labels: Record<Visual, string> = {
  chattermind: "ChatterMind collaborative coding platform screenshot",
  rozgarsetu: "RozgarSetu worker job listings mobile app screenshot",
  dermscan: "DermScan skin disease prediction app screenshot",
};

const imagePaths: Record<Visual, string> = {
  chattermind: "/projects/chattermind.png",
  rozgarsetu: "/projects/rozgarsetu.png",
  dermscan: "/projects/dermscan.png",
};

type Props = {
  visual: Visual;
  className?: string;
};

export function ProjectVisual({ visual, className }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-surface-raised",
        className,
      )}
      role="img"
      aria-label={labels[visual]}
    >
      <Image
        src={imagePaths[visual]}
        alt={labels[visual]}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}
