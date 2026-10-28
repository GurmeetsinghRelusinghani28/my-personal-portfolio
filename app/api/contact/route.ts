import { NextResponse } from "next/server";
import { z } from "zod";
import { profile } from "@/content/profile";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your input and try again." },
      { status: 400 },
    );
  }

  const { name, email, message, website } = parsed.data;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  if (!resendKey) {
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const bodyText = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    return NextResponse.json({
      ok: false,
      mode: "mailto",
      mailto: `mailto:${profile.email}?subject=${subject}&body=${bodyText}`,
    });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio contact · ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error", detail);
      return NextResponse.json(
        { error: "Email service failed. Try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, mode: "resend" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to send email at this time." },
      { status: 500 },
    );
  }
}
