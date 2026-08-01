"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json() as { message?: string; errors?: string[] };
      if (!response.ok) throw new Error(data.errors?.join(" ") || data.message || "Unable to send message.");
      setStatus("success");
      setMessage(data.message || "Thank you. Your message has been received.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not send your message.");
    }
  }

  return (
    <form className="form-grid" onSubmit={submit} noValidate aria-describedby="contact-privacy">
      <div className="error-summary" style={{ display: status === "error" ? "block" : "none" }} role="alert"><strong>There is a problem.</strong><div>{message}</div></div>
      {status === "success" ? <div className="direct-answer" role="status">{message}</div> : null}
      <div className="form-row">
        <div className="form-field"><label htmlFor="name">Name <span aria-hidden="true">*</span></label><input className="form-control" id="name" name="name" autoComplete="name" required /></div>
        <div className="form-field"><label htmlFor="email">Email <span aria-hidden="true">*</span></label><input className="form-control" id="email" name="email" type="email" autoComplete="email" required /></div>
      </div>
      <div className="form-row">
        <div className="form-field"><label htmlFor="phone">Phone <span>(optional)</span></label><input className="form-control" id="phone" name="phone" type="tel" autoComplete="tel" /></div>
        <div className="form-field"><label htmlFor="topic">Topic <span aria-hidden="true">*</span></label><select className="form-control" id="topic" name="topic" required defaultValue="Planning a Visit"><option>Planning a Visit</option><option>Sunday Service</option><option>Wednesday Meeting</option><option>Sunday School</option><option>Reading Room</option><option>Events</option><option>Giving</option><option>Accessibility</option><option>Other</option></select></div>
      </div>
      <div className="form-field"><label htmlFor="message">Message <span aria-hidden="true">*</span></label><textarea className="form-control" id="message" name="message" required minLength={10} /></div>
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <p id="contact-privacy" className="card-meta">By submitting this form, you agree that Christian Science Aurora may use the information you provide to respond. Do not include confidential medical, financial, or payment information.</p>
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send Message"}</button>
    </form>
  );
}
