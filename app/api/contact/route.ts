import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas";
import { emailAdapter } from "@/lib/adapters/email";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;
  try { return new URL(origin).host === host; } catch { return false; }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ message: "Request origin was not accepted." }, { status: 403 });
  if (isRateLimited(clientKey(request))) return NextResponse.json({ message: "Too many messages were submitted. Please wait and try again, or call (303) 766-0620." }, { status: 429 });

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (body?.website) return NextResponse.json({ message: "Thank you. Your message has been received." });

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.issues.map((issue) => issue.message) }, { status: 400 });
  }

  try {
    await emailAdapter.sendContactInquiry(parsed.data);
    return NextResponse.json({ message: "Thank you. Your message has been sent. Someone from Christian Science Aurora will respond as soon as reasonably possible." });
  } catch (error) {
    console.error("[contact-delivery-error]", error instanceof Error ? error.message : "Unknown delivery error");
    return NextResponse.json({ message: "We could not send your message. Please try again or call (303) 766-0620." }, { status: 503 });
  }
}
