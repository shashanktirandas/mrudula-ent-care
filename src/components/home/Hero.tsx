// "use client";

// import { motion } from "motion/react";
// import {
//   ArrowDown,
//   ArrowUpRight,
//   Check,
//   MapPin,
// } from "lucide-react";
// import Link from "next/link";
// import Container from "../ui/Container";

// export default function Hero() {
//   return (
//     <section className="relative min-h-[100svh] overflow-hidden bg-[var(--midnight)]">
//       {/* Ambient light */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -right-40 top-0 h-[650px] w-[650px] rounded-full bg-[var(--deep-teal)] opacity-35 blur-[160px]" />

//         <div className="absolute bottom-[-250px] left-[25%] h-[600px] w-[600px] rounded-full bg-[var(--gold)] opacity-[0.07] blur-[180px]" />

//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(47,103,102,0.16),transparent_35%)]" />
//       </div>

//       <Container className="relative z-10 flex min-h-[100svh] flex-col pt-24">
//         <div className="flex flex-1 items-center py-16 lg:py-20">
//           <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            
//             {/* LEFT */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="max-w-4xl"
//             >
//               <div className="mb-7 flex items-center gap-3">
//                 <span className="h-px w-8 bg-[var(--gold)]" />

//                 <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-light)]">
//                   Specialist ENT Care · Hyderabad
//                 </p>
//               </div>

//               <h1 className="max-w-[900px] text-[clamp(3.6rem,7vw,7.6rem)] font-medium leading-[0.88] tracking-[-0.055em] text-white">
//                 Better hearing.
//                 <br />
//                 Easier breathing.
//                 <br />
//                 <span className="text-white/45">Better balance.</span>
//               </h1>

//               <p className="mt-9 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
//                 Specialist ENT care for adults and children, focused on
//                 clear diagnosis, thoughtful treatment and better everyday
//                 health.
//               </p>

//               <div className="mt-9 flex flex-col gap-3 sm:flex-row">
//                 <Link
//                   href="/book"
//                   className="group inline-flex items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-medium text-[var(--midnight)] transition-all duration-300 hover:bg-[var(--mist)]"
//                 >
//                   Book a Consultation

//                   <ArrowUpRight
//                     size={17}
//                     className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
//                   />
//                 </Link>

//                 <Link
//                   href="/services"
//                   className="inline-flex items-center justify-center border border-white/20 px-7 py-4 text-sm text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
//                 >
//                   Explore ENT Care
//                 </Link>
//               </div>
//             </motion.div>

//             {/* RIGHT VISUAL */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.96 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
//               className="relative mx-auto w-full max-w-[520px] lg:ml-auto"
//             >
//               <div className="relative aspect-[0.82] overflow-hidden border border-white/10 bg-white/[0.035]">
                
//                 {/* Decorative medical orbit */}
//                 <div className="absolute left-1/2 top-[43%] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

//                 <div className="absolute left-1/2 top-[43%] h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--gold)]/20" />

//                 <div className="absolute left-1/2 top-[43%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)] shadow-[0_0_35px_rgba(180,147,90,0.8)]" />

//                 {/* Abstract portrait placeholder */}
//                 <div className="absolute inset-x-[18%] bottom-0 top-[13%]">
//                   <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep-teal)]/10 via-[var(--deep-teal)]/20 to-black/50" />

//                   <div className="absolute left-1/2 top-[17%] h-36 w-36 -translate-x-1/2 rounded-full border border-white/10 bg-[var(--mist)]/10 backdrop-blur-sm" />

//                   <div className="absolute bottom-0 left-1/2 h-[58%] w-[75%] -translate-x-1/2 rounded-t-[45%] bg-gradient-to-b from-white/[0.12] to-white/[0.025]" />

//                   <div className="absolute bottom-[25%] left-1/2 h-px w-[65%] -translate-x-1/2 bg-white/10" />
//                 </div>

//                 {/* Credential panel */}
//                 <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[var(--midnight)]/80 p-6 backdrop-blur-xl sm:p-7">
//                   <div className="flex items-end justify-between gap-6">
//                     <div>
//                       <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold-light)]">
//                         Led by
//                       </p>

//                       <h2 className="mt-2 text-xl text-white">
//                         Dr. Mrudula Mukiri
//                       </h2>

//                       <p className="mt-1 text-xs leading-5 text-white/45">
//                         MBBS · MS ENT & Head & Neck Surgery
//                       </p>
//                     </div>

//                     <div className="hidden items-center gap-2 text-xs text-white/40 sm:flex">
//                       <MapPin size={14} />
//                       Jubilee Hills
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* floating detail */}
//               <div className="absolute -bottom-5 -left-5 hidden border border-white/10 bg-[var(--midnight)] px-5 py-4 shadow-2xl sm:block">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--gold)]/30">
//                     <Check size={14} className="text-[var(--gold-light)]" />
//                   </div>

//                   <div>
//                     <p className="text-xs text-white">
//                       Specialist care
//                     </p>
//                     <p className="text-[10px] text-white/40">
//                       Adults & children
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="flex items-center justify-between border-t border-white/10 py-6">
//           <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/30">
//             <ArrowDown size={13} />
//             Scroll to explore
//           </div>

//           <div className="hidden text-right text-[10px] uppercase tracking-[0.22em] text-white/30 sm:block">
//             Ear · Nose · Throat · Balance
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Container from "../ui/Container";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--midnight)]">
      {/* Ambient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full bg-[var(--deep-teal)] opacity-40 blur-[170px]" />

        <div className="absolute -bottom-60 left-[20%] h-[600px] w-[600px] rounded-full bg-[var(--gold)] opacity-[0.06] blur-[180px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(47,103,102,0.15),transparent_36%)]" />
      </div>

      <Container
        size="wide"
        className="relative z-10 flex min-h-[100svh] flex-col pt-24"
      >
        <div className="flex flex-1 items-center py-12 sm:py-16 lg:py-20">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.78fr] lg:gap-16 xl:grid-cols-[1fr_0.8fr]">
            {/* ------------------------------------------------
                LEFT — POSITIONING
            ------------------------------------------------- */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 24,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="max-w-3xl"
            >
              {/* Eyebrow */}
              <div className="mb-7 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-9 bg-[var(--gold)]"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gold-light)] sm:text-[11px]">
                  Specialist ENT Care · Hyderabad
                </p>
              </div>

              {/* Main proposition */}
              <h1 className="text-balance text-[clamp(3.25rem,6.8vw,7rem)] font-medium leading-[0.9] tracking-[-0.055em] text-white">
                Clearer hearing.
                <br />
                Easier breathing.
                <br />
                <span className="text-white/45">
                  Better balance.
                </span>
              </h1>

              {/* Supporting proposition */}
              <p className="mt-8 max-w-xl text-base leading-7 text-white/60 sm:mt-9 sm:text-lg sm:leading-8">
                Specialist ENT care for adults and children,
                with thoughtful diagnosis and treatment across
                ear, nose, throat, allergy, balance and head &
                neck concerns.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-medium text-[var(--midnight)] transition-all duration-300 hover:bg-[var(--mist)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                >
                  Book a Consultation

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/services"
                 className="inline-flex min-h-12 items-center justify-center border border-white/25 bg-white/[0.03] px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
                  >
                  Explore ENT Care
                </Link>
              </div>

              {/* Doctor identity */}
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-sm font-medium text-white">
                    Dr. Mrudula Mukiri
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    MBBS · MS (ENT & Head & Neck Surgery)
                  </p>
                </div>

                <div className="hidden h-8 w-px bg-white/10 sm:block" />

                <div className="flex items-center gap-2 text-xs text-white/45">
                  <MapPin
                    size={14}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  Jubilee Hills, Hyderabad
                </div>
              </div>
            </motion.div>

            {/* ------------------------------------------------
                RIGHT — REAL DOCTOR PHOTOGRAPH
            ------------------------------------------------- */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                      scale: 0.985,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.12,
                ease: "easeOut",
              }}
              className="relative mx-auto w-full max-w-[480px] lg:ml-auto"
            >
              {/* Image frame */}
              <div className="relative overflow-hidden border border-white/10 bg-[#c8d6f1]">
                {/* Gold architectural line */}
                <div
                  aria-hidden="true"
                  className="absolute left-6 top-6 z-20 h-16 w-px bg-[var(--gold)]"
                />

                <div
                  aria-hidden="true"
                  className="absolute left-6 top-6 z-20 h-px w-16 bg-[var(--gold)]"
                />

                <Image
                  src="/images/doctor/dr-mrudula.jpg"
                  alt="Dr. Mrudula Mukiri, ENT specialist"
                  width={380}
                  height={490}
                  priority
                  sizes="(max-width: 1023px) 90vw, 480px"
                  className="relative z-10 block h-auto w-full"
                />

                {/* Bottom identity panel */}
                <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/20 bg-[var(--midnight)]/90 p-5 backdrop-blur-md sm:p-6">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--gold-light)]">
                        Dr. Mrudula Mukiri
                      </p>

                      <p className="mt-2 text-sm text-white">
                        ENT & Head & Neck Surgery
                      </p>
                    </div>

                    <div className="hidden text-right sm:block">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                        Location
                      </p>

                      <p className="mt-1 text-xs text-white/60">
                        Jubilee Hills
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialist detail */}
              <div className="absolute -bottom-5 -left-4 z-30 hidden border border-white/10 bg-[var(--midnight)] px-5 py-4 shadow-2xl sm:block lg:-left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--gold)]/30">
                    <Check
                      size={14}
                      strokeWidth={1.8}
                      className="text-[var(--gold-light)]"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-white">
                      Specialist care
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/40">
                      Adults & children
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom navigation cue */}
        <div className="flex items-center justify-between border-t border-white/10 py-5 sm:py-6">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/30">
            <ArrowDown
              size={13}
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <span>Scroll to explore</span>
          </div>

          <div className="hidden text-right text-[10px] uppercase tracking-[0.22em] text-white/30 sm:block">
            Ear · Nose · Throat · Balance
          </div>
        </div>
      </Container>
    </section>
  );
}