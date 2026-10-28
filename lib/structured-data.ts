import { profile } from "@/content/profile";
import { getSiteUrl } from "@/lib/site-url";

export function personJsonLd() {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    email: profile.email,
    url: site,
    jobTitle: profile.role,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.institution,
    },
    sameAs: [
      profile.social.github,
      profile.social.linkedin,
      profile.social.leetcode,
    ],
  };
}
