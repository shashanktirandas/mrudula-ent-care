"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Container from "../ui/Container";

const faqs = [
  {
    question: "What conditions does an ENT specialist treat?",
    answer:
      "ENT specialists evaluate conditions involving the ear, nose, throat, balance system and related head and neck structures.",
  },
  {
    question: "When should I see an ENT specialist?",
    answer:
      "Persistent or recurring symptoms involving hearing, breathing, dizziness, swallowing, voice or other ENT concerns may warrant specialist evaluation.",
  },
  {
    question: "What happens during an ENT consultation?",
    answer:
      "A consultation generally begins with your symptoms and medical history, followed by an appropriate clinical examination and discussion of next steps.",
  },
  {
    question: "Is ENT endoscopy painful?",
    answer:
      "The experience varies depending on the type of examination. Your clinician can explain the procedure, preparation and what you can expect before it is performed.",
  },
  {
    question: "Do you provide care for children?",
    answer:
      "The clinic provides ENT care for both adults and children. Specific concerns can be discussed when requesting an appointment.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-[var(--ivory)] py-24 sm:py-32 lg:py-40"
    >
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Introduction */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[var(--gold)]"
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Questions
              </p>
            </div>

            <h2
              id="faq-title"
              className="text-balance text-5xl leading-[0.94] tracking-[-0.045em] text-[var(--midnight)] sm:text-6xl lg:text-[4.5rem]"
            >
              Before your
              <br />
              visit.
            </h2>

            <p className="mt-7 max-w-sm text-base leading-7 text-[var(--muted)]">
              A few practical answers to help you feel more prepared before
              contacting the clinic.
            </p>
          </div>

          {/* Questions */}
          <div className="border-t border-[var(--border)]">
            {faqs.map((faq, index) => {
              const isOpen = active === index;
              const answerId = `faq-answer-${index}`;
              const buttonId = `faq-question-${index}`;

              return (
                <div
                  key={faq.question}
                  className="border-b border-[var(--border)]"
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setActive(isOpen ? null : index)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] sm:py-7"
                  >
                    <span className="text-base font-medium leading-6 tracking-[-0.01em] text-[var(--midnight)] transition-colors group-hover:text-[var(--deep-teal)] sm:text-lg">
                      {faq.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--border)] transition-all duration-300 group-hover:border-[var(--gold)]/50"
                    >
                      <Plus
                        size={17}
                        strokeWidth={1.5}
                        className={`text-[var(--muted)] transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pr-12 text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}