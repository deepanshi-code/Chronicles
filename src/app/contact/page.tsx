import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact — Deepanshi Agarwal",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          03 — Contact
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Contact
        </h1>
        <p className="mt-4 text-muted">
          Have a question or want to collaborate? Send a message below.
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </Reveal>
    </div>
  );
}
