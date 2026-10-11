"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
} from "lucide-react";
import { useEffect, useState } from "react";
import Container from "../ui/Container";

const reviews = [
  {
    quote:
      "Review content will be connected to the clinic's authorized review source before launch.",
    name: "Review placeholder",
    source: "Review source pending",
  },
  {
    quote:
      "Patient experiences will appear here exactly as sourced and authorized.",
    name: "Review placeholder",
    source: "Review source pending",
  },
  {
    quote:
      "This space is reserved for a genuine patient experience from the clinic's verified source.",
    name: "Review placeholder",
    source: "Review source pending",
  },
];

const AUTOPLAY_DELAY = 6000;

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeReview = reviews[activeIndex];

  const goTo = (index: number) => {
    setActiveIndex((index + reviews.length) % reviews.length);
  };

  const next = () => {
    goTo(activeIndex + 1);
  };

  const previous = () => {
    goTo(activeIndex - 1);
  };

  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [isPaused, reduceMotion]);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="bg-[var(--ivory)] py-24 sm:py-32 lg:py-40"
    >
      <Container size="wide">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[var(--gold)]"
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Patient experiences
              </p>
            </div>

            <h2
              id="reviews-title"
              className="text-balance text-5xl leading-[0.94] tracking-[-0.045em] text-[var(--midnight)] sm:text-6xl lg:text-[4.5rem]"
            >
              Trust is built
              <br />
              visit by visit.
            </h2>
          </div>

          <div className="max-w-xs sm:text-right">
            <p className="text-sm leading-6 text-[var(--muted)]">
              Genuine patient experiences will be displayed from the clinic&apos;s
              authorized review source.
            </p>
          </div>
        </div>

        {/* Review carousel */}
        <div
          className="relative mt-16 overflow-hidden border-y border-[var(--border)] sm:mt-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          <div className="grid min-h-[390px] lg:grid-cols-[0.18fr_1fr_0.18fr]">
            {/* Left navigation */}
            <div className="hidden items-center border-r border-[var(--border)] lg:flex">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous patient experience"
                className="mx-auto flex h-12 w-12 items-center justify-center border border-[var(--border)] text-[var(--midnight)] transition-colors hover:border-[var(--gold)] hover:text-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              >
                <ArrowLeft size={17} strokeWidth={1.6} />
              </button>
            </div>

            {/* Main review */}
            <div className="relative flex items-center justify-center px-6 py-14 sm:px-12 sm:py-16 lg:px-20">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={activeIndex}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 24,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          x: -24,
                        }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    ease: "easeOut",
                  }}
                  className="w-full max-w-3xl"
                  aria-live="polite"
                >
                  <Quote
                    size={34}
                    strokeWidth={1}
                    className="text-[var(--gold)]"
                    aria-hidden="true"
                  />

                  <blockquote className="mt-7 text-2xl leading-[1.4] tracking-[-0.025em] text-[var(--midnight)] sm:text-3xl lg:text-[2.15rem] lg:leading-[1.35]">
                    “{activeReview.quote}”
                  </blockquote>

                  <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--midnight)]">
                      {activeReview.name}
                    </p>

                    <span
                      aria-hidden="true"
                      className="hidden h-px w-5 bg-[var(--border)] sm:block"
                    />

                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      {activeReview.source}
                    </p>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* Right navigation */}
            <div className="hidden items-center border-l border-[var(--border)] lg:flex">
              <button
                type="button"
                onClick={next}
                aria-label="Next patient experience"
                className="mx-auto flex h-12 w-12 items-center justify-center border border-[var(--border)] text-[var(--midnight)] transition-colors hover:border-[var(--gold)] hover:text-[var(--deep-teal)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              >
                <ArrowRight size={17} strokeWidth={1.6} />
              </button>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center justify-between border-t border-[var(--border)] px-6 py-5 lg:hidden">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous patient experience"
              className="flex h-10 w-10 items-center justify-center border border-[var(--border)] text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              <ArrowLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {reviews.map((review, index) => (
                <button
                  key={review.name + index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show patient experience ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className="group flex h-8 w-8 items-center justify-center"
                >
                  <span
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-6 bg-[var(--gold)]"
                        : "w-2 bg-[var(--border)] group-hover:bg-[var(--muted)]"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next patient experience"
              className="flex h-10 w-10 items-center justify-center border border-[var(--border)] text-[var(--midnight)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Desktop indicators */}
        <div className="mt-7 hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-2">
            {reviews.map((review, index) => (
              <button
                key={review.name + "-desktop-" + index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show patient experience ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className="group flex h-8 items-center"
              >
                <span
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-[var(--gold)]"
                      : "w-3 bg-[var(--border)] group-hover:bg-[var(--muted)]"
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(reviews.length).padStart(2, "0")}
          </p>
        </div>
      </Container>
    </section>
  );
}