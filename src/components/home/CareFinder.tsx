"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Baby,
  CircleDot,
  Ear,
  HeartPulse,
  MessageCircle,
  Wind,
} from "lucide-react";
import Link from "next/link";
import Container from "../ui/Container";

const categories = [
  {
    title: "Ear",
    description: "Hearing, pain, blockage & ear conditions",
    icon: Ear,
    href: "/conditions/ear",
    number: "01",
  },
  {
    title: "Nose & Sinus",
    description: "Breathing, congestion, sinus & allergy",
    icon: Wind,
    href: "/conditions/nose-sinus",
    number: "02",
  },
  {
    title: "Vertigo & Balance",
    description: "Dizziness, balance & inner-ear concerns",
    icon: CircleDot,
    href: "/conditions/vertigo-balance",
    number: "03",
  },
  {
    title: "Throat & Voice",
    description: "Throat, tonsils, swallowing & voice",
    icon: MessageCircle,
    href: "/conditions/throat-voice",
    number: "04",
  },
  {
    title: "Children's ENT",
    description: "ENT care for growing ears, noses & throats",
    icon: Baby,
    href: "/conditions/pediatric-ent",
    number: "05",
  },
  {
    title: "Head & Neck",
    description: "Lumps, lesions & head and neck concerns",
    icon: HeartPulse,
    href: "/conditions/head-neck",
    number: "06",
  },
];

export default function CareFinder() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="care-finder"
      aria-labelledby="care-finder-title"
      className="bg-[var(--ivory)] py-24 sm:py-32 lg:py-40"
    >
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* Intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[var(--gold)]"
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Start here
              </p>
            </div>

            <h2
              id="care-finder-title"
              className="text-balance text-5xl leading-[0.95] tracking-[-0.04em] text-[var(--midnight)] sm:text-6xl lg:text-[4.5rem]"
            >
              What brings
              <br />
              you here?
            </h2>

            <p className="mt-7 max-w-md text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
              Start with what you are experiencing. Explore the area of
              ENT care that feels closest to what you need.
            </p>

            <div className="mt-8 border-l border-[var(--gold)]/50 pl-4">
              <p className="max-w-sm text-xs leading-5 text-[var(--muted)]">
                This is an educational navigation tool, not a medical
                diagnosis.
              </p>
            </div>
          </div>

          {/* Care categories */}
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 18,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={item.href}
                    className="group flex min-h-[238px] flex-col justify-between border border-[var(--border)] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--midnight)] hover:shadow-[var(--shadow-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] sm:p-7"
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--gold)]">
                        {item.number}
                      </span>

                      <div
                        aria-hidden="true"
                        className="flex h-10 w-10 items-center justify-center border border-[var(--border)] text-[var(--deep-teal)] transition-all duration-500 group-hover:border-[var(--gold)]/50 group-hover:bg-[var(--mist)]"
                      >
                        <Icon
                          size={19}
                          strokeWidth={1.4}
                        />
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="pt-12">
                      <h3 className="text-2xl leading-tight tracking-[-0.025em] text-[var(--midnight)]">
                        {item.title}
                      </h3>

                      <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
                        {item.description}
                      </p>

                      <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[var(--midnight)]">
                        Explore care

                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.8}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}