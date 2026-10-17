import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact — Deepanshi Agarwal",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <Reveal>
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="mt-2 text-black/70 dark:text-white/70">
          Have a question or want to collaborate? Send a message below.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </Reveal>
    </div>
  );
}
