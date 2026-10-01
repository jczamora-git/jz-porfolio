"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [data, setData] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.message) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-64 flex-col items-start justify-center gap-4 border border-blood/40 bg-blood/5 p-10">
        <span className="font-display text-5xl leading-none text-blood">✓</span>
        <p className="font-display text-2xl font-bold uppercase tracking-tight">
          Message sent.
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ash">
          I&apos;ll get back to you within 48 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border-b border-bone/15 bg-transparent pb-3 font-display text-lg text-bone placeholder-ash/40 outline-none transition-colors focus:border-blood";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
            Name
          </span>
          <input
            type="text"
            name="name"
            required
            value={data.name}
            onChange={handleChange}
            placeholder="Ada Lovelace"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            value={data.email}
            onChange={handleChange}
            placeholder="ada@studio.com"
            className={inputClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
          Project details
        </span>
        <textarea
          name="message"
          required
          rows={4}
          value={data.message}
          onChange={handleChange}
          placeholder="Tell me about the brief, timeline, and budget…"
          className={`${inputClass} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="group inline-flex w-fit items-center justify-center gap-3 bg-blood px-8 py-4 font-mono text-xs tracking-[0.25em] text-ink transition-colors hover:bg-bone"
      >
        SEND MESSAGE
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}
