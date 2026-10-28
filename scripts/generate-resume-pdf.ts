import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";
import { profile } from "../content/profile";
import { featuredProjects } from "../content/projects";
import { skillGroups } from "../content/skills";

const margin = 54;
const lineHeight = 14;
const pageWidth = 612;
const pageHeight = 792;
const maxWidth = pageWidth - margin * 2;

async function main() {
  const pdf = await PDFDocument.create();
  let page = pdf.addPage([pageWidth, pageHeight]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let y = pageHeight - margin;

  const draw = (text: string, opts?: { bold?: boolean; size?: number }) => {
    const size = opts?.size ?? 11;
    const usedFont = opts?.bold ? fontBold : font;
    const safe = sanitizePdfText(text);
    const lines = wrap(safe, usedFont, size, maxWidth);
    for (const line of lines) {
      if (y < margin + size) {
        page = pdf.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
      page.drawText(line, {
        x: margin,
        y,
        size,
        font: usedFont,
        color: rgb(0.1, 0.1, 0.1),
      });
      y -= lineHeight;
    }
  };

  draw(profile.name, { bold: true, size: 18 });
  y -= 4;
  draw(
    `${profile.email} · ${profile.social.github.replace("https://github.com/", "github.com/")} · LinkedIn`,
    { size: 10 },
  );
  y -= 8;

  section("Education");
  draw(
    `${profile.education.degree}, ${profile.education.institution} (Expected ${profile.graduation})`,
  );
  draw(`CGPA: ${profile.education.cgpa}`);

  section("Technical Skills");
  for (const group of skillGroups) {
    draw(`${group.title}: ${group.items.join(", ")}`);
  }

  section("Featured Projects");
  for (const project of featuredProjects) {
    draw(`${project.title} — ${project.subtitle}`, { bold: true });
    draw(project.description);
    draw(`Stack: ${project.stack.join(", ")}`, { size: 10 });
    for (const h of project.highlights.slice(0, 4)) {
      draw(`• ${h}`, { size: 10 });
    }
    y -= 4;
  }

  section("Achievements & Leadership");
  draw(`LeetCode rating ${profile.coding.leetcodeRating}.`);
  draw(`Codeforces rating ${profile.coding.codeforcesRating}.`);
  draw(
    `CodeChef ${profile.coding.codechef.stars} (${profile.coding.codechef.rating}).`,
  );
  draw("Runner-up at AISF and MIT hackathons.");
  draw("Technical Head, Abhivriddhi Committee — website development & technical initiatives.");

  const outDir = path.join(process.cwd(), "public", "resume");
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, "gurmeetsingh-relusinghani-resume.pdf");
  const bytes = await pdf.save();
  await fs.writeFile(outPath, bytes);
  console.log(`Wrote ${outPath}`);

  function section(title: string) {
    y -= 10;
    draw(title.toUpperCase(), { bold: true, size: 12 });
    y -= 2;
  }
}

function sanitizePdfText(text: string) {
  return text
    .replace(/→/g, "->")
    .replace(/•/g, "-")
    .replace(/—/g, "-")
    .replace(/–/g, "-")
    .replace(/[^\x00-\xFF]/g, "?");
}

function wrap(
  text: string,
  font: Awaited<ReturnType<PDFDocument["embedFont"]>>,
  size: number,
  width: number,
) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) <= width) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
