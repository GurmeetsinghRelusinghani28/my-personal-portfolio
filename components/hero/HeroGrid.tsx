import Image from "next/image";

export function HeroGrid() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-border bg-surface-raised">
      <Image
        src="/images/profile-photo.jpg"
        alt="Portrait of Gurmeetsingh Relusinghani"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover"
      />
    </div>
  );
}
