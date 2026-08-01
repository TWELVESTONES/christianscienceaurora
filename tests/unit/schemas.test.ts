import { describe, expect, it } from "vitest";
import { contactFormSchema, eventSchema } from "@/lib/schemas";
import { events } from "@/content/data";

describe("content schemas", () => {
  it("validates seeded events", () => {
    for (const event of events) expect(eventSchema.safeParse(event).success).toBe(true);
  });
  it("rejects a short contact message", () => {
    const result = contactFormSchema.safeParse({ name: "James", email: "james@example.com", topic: "Other", message: "Hi", website: "" });
    expect(result.success).toBe(false);
  });
  it("accepts a valid contact inquiry", () => {
    const result = contactFormSchema.safeParse({ name: "James", email: "james@example.com", topic: "Planning a Visit", message: "I have a question about visiting this Sunday.", website: "" });
    expect(result.success).toBe(true);
  });
});
