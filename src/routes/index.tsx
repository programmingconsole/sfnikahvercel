import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import bgImage from "@/assets/nikah-bg.jpg";
import songAsset from "@/assets/music1.mp3.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammed Shahal & Fasna — Nikah Invitation" },
      { name: "description", content: "Join us in celebrating the Nikah of Mohammed Shahal & Fasna on 29th August 2026." },
      { property: "og:title", content: "Mohammed Shahal weds Fasna" },
      { property: "og:description", content: "Nikah ceremony — 29th August 2026, 11:30 AM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Amiri:wght@400;700&family=Great+Vibes&family=Cinzel:wght@400;500;600&display=swap" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!opened) return;
    const a = audioRef.current;
    if (!a) return;
    a.loop = true;
    a.volume = 0.7;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [opened]);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); }
    else { a.pause(); setPlaying(false); }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-cream text-maroon-deep font-serif-body">
      <audio ref={audioRef} src={songAsset.url} preload="auto" />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/10 via-cream/0 to-cream/20" />

      {!opened ? (
        <Cover onOpen={() => setOpened(true)} showButton />
      ) : (
        <div className="relative z-10">
          <Petals />
          <Cover onOpen={() => {}} showButton={false} />
          <CardContent playing={playing} onToggle={toggleMusic} />
        </div>
      )}

      {/* Floating music toggle (bottom-right, maroon circle with gold icon) */}
      <button
        onClick={opened ? toggleMusic : () => setOpened(true)}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-maroon-deep text-gold shadow-[0_8px_24px_-6px_rgba(90,20,30,0.5)] border border-gold/50 transition-transform hover:scale-110 animate-glow-pulse"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={playing ? "animate-spin-slow" : ""}
        >
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
        </svg>
        {playing && (
          <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping-slow" />
        )}
      </button>
    </div>
  );
}


function Petals() {
  const petals = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {petals.map((_, i) => {
        const left = (i * 7.3) % 100;
        const duration = 8 + ((i * 1.7) % 7);
        const delay = (i * 0.9) % 10;
        const size = 10 + ((i * 3) % 10);
        const drift = i % 2 === 0 ? "petal-drift-a" : "petal-drift-b";
        return (
          <span
            key={i}
            className={`absolute -top-6 ${drift}`}
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animationDuration: `${duration}s`,
              animationDelay: `-${delay}s`,
            }}
          >
            <svg viewBox="0 0 20 20" className="h-full w-full text-maroon-deep/60">
              <path
                d="M10 1 C 14 5, 16 10, 10 19 C 4 10, 6 5, 10 1 Z"
                fill="currentColor"
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
}

function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M2 2 C 40 4, 70 20, 90 50 C 100 65, 110 85, 118 118" opacity="0.6" />
      <path d="M2 2 C 30 10, 55 25, 75 55" opacity="0.4" />
      <circle cx="90" cy="50" r="2" fill="currentColor" />
      <circle cx="60" cy="30" r="1.5" fill="currentColor" opacity="0.6" />
      <path d="M15 15 q 8 -5 16 0" opacity="0.5" />
    </svg>
  );
}

function Cover({ onOpen, showButton = true }: { onOpen: () => void; showButton?: boolean }) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 text-center animate-fade-scale">
      <CornerFlourish className="pointer-events-none absolute left-2 top-2 h-28 w-28 text-gold-dark" />
      <CornerFlourish className="pointer-events-none absolute right-2 top-2 h-28 w-28 scale-x-[-1] text-gold-dark" />
      <CornerFlourish className="pointer-events-none absolute bottom-2 left-2 h-28 w-28 scale-y-[-1] text-gold-dark" />
      <CornerFlourish className="pointer-events-none absolute bottom-2 right-2 h-28 w-28 scale-x-[-1] scale-y-[-1] text-gold-dark" />

      <p className="tracking-[0.5em] text-xs text-gold-dark animate-float-up">BISMILLAH</p>
      <p className="mt-4 tracking-[0.45em] text-sm text-maroon-deep animate-float-up delay-200">THE NIKAH OF</p>

      <Ornament className="my-8 animate-float-up delay-300" />

      <h1
        className="text-maroon-deep animate-float-up delay-500"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(4rem, 14vw, 7rem)", lineHeight: 1 }}
      >
        Shahal
      </h1>
      <p
        className="my-2 text-gold-dark animate-float-up delay-700"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2rem, 5vw, 3rem)" }}
      >
        &amp;
      </p>
      <h1
        className="text-maroon-deep animate-float-up delay-1000"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(4rem, 14vw, 7rem)", lineHeight: 1 }}
      >
        Fasna
      </h1>

      <Ornament className="my-8 animate-float-up delay-1000" />

      <p className="tracking-[0.4em] text-sm text-maroon-deep/80 animate-float-up delay-1000">
        29 &middot; 08 &middot; 2026
      </p>

      {showButton && (
        <button
          onClick={onOpen}
          className="mt-12 rounded-full border border-maroon-deep/40 bg-maroon-deep/5 px-10 py-3 text-xs uppercase tracking-[0.35em] text-maroon-deep backdrop-blur-sm transition-all hover:bg-maroon-deep hover:text-cream animate-float-up delay-1500"
        >
          Open Invitation
        </button>
      )}
    </div>
  );
}

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold-dark/60" />
      <svg width="20" height="20" viewBox="0 0 24 24" className="text-gold-dark">
        <path d="M12 2 L15 12 L12 22 L9 12 Z" fill="currentColor" opacity="0.6" />
        <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" />
      </svg>
      <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold-dark/60" />
    </div>
  );
}

function CardContent({ playing: _playing, onToggle: _onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col items-center px-8 py-14 text-center animate-card-rise">
      <CornerFlourish className="pointer-events-none absolute left-2 top-2 h-24 w-24 text-gold-dark" />
      <CornerFlourish className="pointer-events-none absolute right-2 top-2 h-24 w-24 scale-x-[-1] text-gold-dark" />

      <p className="font-arabic text-2xl text-maroon-deep animate-float-up">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.4em] text-gold-dark animate-float-up delay-200">
        In the name of Allah
      </p>

      <p className="mt-10 italic text-maroon-deep/80 font-display text-lg animate-float-up delay-300">
        You are invited to the wedding of
      </p>

      <h2
        className="mt-6 tracking-[0.12em] text-maroon-deep animate-float-up delay-500"
        style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem, 5vw, 2rem)" }}
      >
        MOHAMMED SHAHAL
      </h2>
      <p className="my-3 italic text-gold-dark font-display text-xl animate-float-up delay-700">and</p>
      <h2
        className="tracking-[0.12em] text-maroon-deep animate-float-up delay-700"
        style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem, 5vw, 2rem)" }}
      >
        FASNA
      </h2>

      <div className="my-8 flex w-full max-w-xs items-center justify-center gap-2 animate-float-up delay-1000">
        <span className="h-[1px] flex-1 bg-maroon-deep/40" />
        <span className="h-2 w-2 rotate-45 border border-maroon-deep/50" />
        <span className="h-[1px] flex-1 bg-maroon-deep/40" />
      </div>

      {/* Date block */}
      <div className="flex items-stretch justify-center gap-5 animate-float-up delay-1000">
        <div className="flex flex-col justify-center text-right">
          <p className="tracking-[0.2em] text-xs text-maroon-deep border-b border-maroon-deep/40 pb-1">AUGUST</p>
          <p className="mt-1 tracking-[0.2em] text-xs text-maroon-deep border-b border-maroon-deep/40 pb-1">SATURDAY</p>
        </div>
        <div className="border-l border-r border-maroon-deep/40 px-5 flex items-center">
          <span
            className="text-maroon-deep leading-none"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(3rem, 10vw, 4.5rem)" }}
          >
            29
          </span>
        </div>
        <div className="flex flex-col justify-center text-left">
          <p className="tracking-[0.15em] text-xs text-maroon-deep">11:30 AM</p>
          <p className="mt-3 tracking-[0.15em] text-xs text-maroon-deep">2026</p>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-2 animate-float-up delay-1500">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-dark">
          <path d="M12 2 C 8 2, 5 5, 5 9 c 0 5, 7 13, 7 13 s 7 -8, 7 -13 c 0 -4, -3 -7, -7 -7 z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        <p className="font-display text-lg text-maroon-deep">Eventza Convention Centre</p>
        <p className="text-xs tracking-widest text-maroon-deep/70">M-DIT Road, Ullyeri</p>
      </div>

      <div className="mt-10 font-arabic text-xl text-maroon-deep animate-float-up delay-1500">
        بَارَكَ اللَّهُ لَكُمَا
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-gold-dark">May Allah bless you both</p>

      <CornerFlourish className="pointer-events-none absolute bottom-2 left-2 h-24 w-24 scale-y-[-1] text-gold-dark" />
      <CornerFlourish className="pointer-events-none absolute bottom-2 right-2 h-24 w-24 scale-x-[-1] scale-y-[-1] text-gold-dark" />
    </div>
  );
}
