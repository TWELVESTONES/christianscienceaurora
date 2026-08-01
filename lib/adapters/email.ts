import type { z } from "zod";
import type { contactFormSchema } from "@/lib/schemas";

type ContactData = z.infer<typeof contactFormSchema>;

export interface EmailAdapter {
  sendContactInquiry(data: ContactData): Promise<void>;
}

function plainTextBody(data: ContactData): string {
  return [
    `Topic: ${data.topic}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    "",
    data.message,
  ].join("\n");
}

class ConsoleEmailAdapter implements EmailAdapter {
  async sendContactInquiry(data: ContactData) {
    console.info("[contact-inquiry]", {
      topic: data.topic,
      name: data.name,
      email: data.email,
      phoneProvided: Boolean(data.phone),
      messageLength: data.message.length,
    });
  }
}

class ResendEmailAdapter implements EmailAdapter {
  constructor(
    private readonly apiKey: string,
    private readonly from: string,
    private readonly to: string,
  ) {}

  async sendContactInquiry(data: ContactData) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.from,
        to: [this.to],
        reply_to: data.email,
        subject: `Christian Science Aurora website inquiry: ${data.topic}`,
        text: plainTextBody(data),
      }),
    });
    if (!response.ok) throw new Error(`Email provider rejected the inquiry (${response.status}).`);
  }
}

class WebhookEmailAdapter implements EmailAdapter {
  constructor(private readonly webhookUrl: string, private readonly secret?: string) {}

  async sendContactInquiry(data: ContactData) {
    const response = await fetch(this.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.secret ? { Authorization: `Bearer ${this.secret}` } : {}),
      },
      body: JSON.stringify({ type: "contact-inquiry", data }),
    });
    if (!response.ok) throw new Error(`Email webhook rejected the inquiry (${response.status}).`);
  }
}

function createEmailAdapter(): EmailAdapter {
  const provider = process.env.EMAIL_PROVIDER ?? "console";
  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;
    const to = process.env.EMAIL_TO;
    if (!apiKey || !from || !to) throw new Error("RESEND_API_KEY, EMAIL_FROM, and EMAIL_TO are required for Resend.");
    return new ResendEmailAdapter(apiKey, from, to);
  }
  if (provider === "webhook") {
    const url = process.env.EMAIL_WEBHOOK_URL;
    if (!url) throw new Error("EMAIL_WEBHOOK_URL is required when EMAIL_PROVIDER=webhook.");
    return new WebhookEmailAdapter(url, process.env.EMAIL_WEBHOOK_SECRET);
  }
  return new ConsoleEmailAdapter();
}

export const emailAdapter: EmailAdapter = createEmailAdapter();
