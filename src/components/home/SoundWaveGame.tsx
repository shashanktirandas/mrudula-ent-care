
"use client";

import { useState } from "react";
import { AudioLines, RotateCcw, Sparkles } from "lucide-react";

type Position = {
  x: number;
  y: number;
};

const START_POSITION: Position = { x: 50, y: 48 };

function nextPosition(previous: Position): Position {
  let next = previous;

  for (let attempt = 0; attempt < 8; attempt++) {
    next = {
      x: 14 + Math.random() * 72,
      y: 25 + Math.random() * 48,
    };

    const distance = Math.hypot(
      next.x - previous.x,
      next.y - previous.y,
    );

    if (distance > 28) break;
  }

  return next;
}

export default function SoundWaveGame() {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState(START_POSITION);
  const finished = score >= 3;

  function catchWave() {
    if (finished) return;

    const nextScore = score + 1;
    setScore(nextScore);

    if (nextScore < 3) {
      setPosition(nextPosition(position));
    }
  }

  function restart() {
    setScore(0);
    setPosition(START_POSITION);
  }

  return (
    <section
      aria-labelledby="sound-game-title"
      className="overflow-hidden rounded-2xl border border-[#D8C59B]/25 bg-[#123D43] text-[#F7F5EF] shadow-xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D8C59B]">
            A little detour
          </p>
          <h2
            id="sound-game-title"
            className="mt-1 text-lg font-medium sm:text-xl"
          >
            Catch the sound wave
          </h2>
        </div>

        <div
          aria-label={`${score} of 3 waves caught`}
          className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80"
        >
          <span className="text-[#D8C59B]">{score}</span> / 3 caught
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div
          className="relative isolate h-52 overflow-hidden rounded-xl border border-white/10 bg-[#0B1720] sm:h-60"
          aria-label="Sound wave mini-game area"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, transparent 0 34px, #D8C59B 35px, transparent 36px, transparent 65px, #D8C59B 66px, transparent 67px)",
            }}
          />

          {!finished ? (
            <button
              type="button"
              onClick={catchWave}
              aria-label="Catch the moving sound wave"
              className="absolute z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8C59B]/70 bg-[#D8C59B] text-[#0B1720] shadow-[0_0_28px_rgba(216,197,155,0.2)] transition-[left,top,transform] duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7F5EF] motion-reduce:transition-none"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            >
              <AudioLines size={25} strokeWidth={1.8} />
            </button>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
              <Sparkles
                aria-hidden="true"
                className="mb-3 text-[#D8C59B]"
                size={30}
              />
              <p className="text-lg font-medium">Beautifully done.</p>
              <p className="mt-1 text-sm text-white/65">
                You found your rhythm. Let&apos;s find your way back.
              </p>
              <button
                type="button"
                onClick={restart}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7F5EF]"
              >
                <RotateCcw size={14} />
                Play again
              </button>
            </div>
          )}
        </div>

        <p
          aria-live="polite"
          className="mt-3 text-center text-sm text-white/60"
        >
          {finished
            ? "3 of 3 waves caught. Nicely done!"
            : "Tap or click the wave to catch it. No rush."}
        </p>
      </div>
    </section>
  );
}
