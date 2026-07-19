import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import bgImage from "@/assets/nikah-bg.jpg";
import songAsset from "@/assets/music1.mp3.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammed Shahal & Fasna — Nikah Invitation" },
      { name: "description", content: "Join us in celebrating the Nikah of Mohammed Shahal & Fasna on 29th August 2026." },
      { property: "og:title", content: "Mohammed Shahal & Fasna — Nikah Invitation" },
      { property: "og:description", content: "Join us in celebrating the Nikah of Mohammed Shahal & Fasna on 29th August 2026." },
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
    <div className="relative min-h-screen w-full overflow-x-hidden bg-cream text-maroon-deep font-serif-body">
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
          <CardContent playing={playing} onToggle={toggleMusic} />
        </div>
      )}

      {/* Floating music toggle (bottom-right, maroon circle with gold icon) */}
      <button
        onClick={opened ? toggleMusic : () => setOpened(true)}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-maroon-deep text-gold shadow-[0_8px_24px_-6px_rgba(90,20,30,0.5)] border border-gold/50 transition-transform hover:scale-110 animate-glow-pulse sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
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

function FlowerDivider() {
  return (
    <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-xl items-center justify-center px-4 py-1 sm:py-4">
      <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent to-gold-dark/50" />
      <svg
        width="70"
        height="30"
        viewBox="0 0 120 48"
        fill="none"
        className="mx-2 shrink-0 text-maroon-deep/80 sm:mx-5 sm:h-10 sm:w-28"
      >
        <path
          d="M60 44 C 52 34, 44 30, 60 20 C 76 30, 68 34, 60 44 Z"
          fill="currentColor"
          opacity="0.5"
        />
        <path
          d="M60 20 C 55 8, 45 4, 60 2 C 75 4, 65 8, 60 20 Z"
          fill="currentColor"
          opacity="0.6"
        />
        <circle cx="60" cy="24" r="4" fill="currentColor" opacity="0.7" />
        <path
          d="M60 24 C 48 16, 36 14, 32 22 C 30 26, 38 30, 48 28"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M60 24 C 72 16, 84 14, 88 22 C 90 26, 82 30, 72 28"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <circle cx="32" cy="22" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="88" cy="22" r="3" fill="currentColor" opacity="0.5" />
      </svg>
      <span className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent to-gold-dark/50" />
    </div>
  );
}

function Cover({ onOpen, showButton = true }: { onOpen: () => void; showButton?: boolean }) {
  return (
    <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 py-8 text-center animate-fade-scale sm:min-h-screen sm:px-8">
      <CornerFlourish className="pointer-events-none absolute left-1 top-1 h-20 w-20 text-gold-dark sm:left-2 sm:top-2 sm:h-28 sm:w-28" />
      <CornerFlourish className="pointer-events-none absolute right-1 top-1 h-20 w-20 scale-x-[-1] text-gold-dark sm:right-2 sm:top-2 sm:h-28 sm:w-28" />
      <CornerFlourish className="pointer-events-none absolute bottom-1 left-1 h-20 w-20 scale-y-[-1] text-gold-dark sm:bottom-2 sm:left-2 sm:h-28 sm:w-28" />
      <CornerFlourish className="pointer-events-none absolute bottom-1 right-1 h-20 w-20 scale-x-[-1] scale-y-[-1] text-gold-dark sm:bottom-2 sm:right-2 sm:h-28 sm:w-28" />

      <p className="tracking-[0.28em] text-[10px] text-gold-dark animate-float-up sm:tracking-[0.5em] sm:text-xs">BISMILLAH</p>
      <p className="mt-4 tracking-[0.24em] text-xs text-maroon-deep animate-float-up delay-200 sm:tracking-[0.45em] sm:text-sm">THE NIKAH OF</p>


      <Ornament className="my-6 animate-float-up delay-300 sm:my-8" />

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

      <Ornament className="my-6 animate-float-up delay-1000 sm:my-8" />

      <p className="tracking-[0.28em] text-sm text-maroon-deep/80 animate-float-up delay-1000 sm:tracking-[0.4em]">
        29 &middot; 08 &middot; 2026
      </p>

      {showButton && (
        <button
          onClick={onOpen}
          className="mt-8 max-w-full rounded-full border border-maroon-deep/40 bg-maroon-deep/5 px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-maroon-deep backdrop-blur-sm transition-all hover:bg-maroon-deep hover:text-cream animate-float-up delay-1500 sm:mt-12 sm:px-10 sm:text-xs sm:tracking-[0.35em]"
        >
          Open Invitation
        </button>
      )}
    </div>
  );
}

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 max-w-[28vw] bg-gradient-to-r from-transparent to-gold-dark/60 sm:w-20" />
      <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0 text-gold-dark">
        <path d="M12 2 L15 12 L12 22 L9 12 Z" fill="currentColor" opacity="0.6" />
        <circle cx="12" cy="12" r="2" fill="none" stroke="currentColor" />
      </svg>
      <span className="h-px w-16 max-w-[28vw] bg-gradient-to-l from-transparent to-gold-dark/60 sm:w-20" />
    </div>
  );
}

function CardContent({ playing: _playing, onToggle: _onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-xl animate-card-rise">
      {/* First page — main invitation details */}
      <section className="relative flex min-h-[88svh] flex-col items-center justify-center px-4 py-8 text-center sm:min-h-[92vh] sm:px-8 sm:py-14">
        <CornerFlourish className="pointer-events-none absolute left-1 top-1 h-16 w-16 text-gold-dark sm:left-2 sm:top-2 sm:h-24 sm:w-24" />
        <CornerFlourish className="pointer-events-none absolute right-1 top-1 h-16 w-16 scale-x-[-1] text-gold-dark sm:right-2 sm:top-2 sm:h-24 sm:w-24" />

        <p className="font-arabic text-xl text-maroon-deep animate-float-up sm:text-2xl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-gold-dark animate-float-up delay-200 sm:text-[10px] sm:tracking-[0.4em]">
          In the name of Allah
        </p>

        <p className="mt-8 italic text-maroon-deep/80 font-display text-base animate-float-up delay-300 sm:mt-10 sm:text-lg">
          You are invited to the wedding of
        </p>

        <h2
          className="mt-5 tracking-[0.1em] text-maroon-deep animate-float-up delay-500 sm:mt-6 sm:tracking-[0.12em] break-words"
          style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.25rem, 5.5vw, 2.2rem)" }}
        >
          MOHAMMED SHAHAL
        </h2>
        <p className="my-2 italic text-gold-dark font-display text-lg animate-float-up delay-700 sm:my-3 sm:text-xl">and</p>
        <h2
          className="tracking-[0.1em] text-maroon-deep animate-float-up delay-700 sm:tracking-[0.12em]"
          style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.25rem, 5.5vw, 2.2rem)" }}
        >
          FASNA
        </h2>

        <div className="my-6 flex w-full max-w-xs items-center justify-center gap-2 animate-float-up delay-1000 sm:my-8">
          <span className="h-[1px] flex-1 bg-maroon-deep/40" />
          <span className="h-2 w-2 rotate-45 border border-maroon-deep/50" />
          <span className="h-[1px] flex-1 bg-maroon-deep/40" />
        </div>

        {/* Date block — referenced layout */}
        <div className="relative mt-4 flex w-full max-w-xs items-center justify-center gap-1 animate-float-up delay-1000 sm:max-w-md sm:gap-3">
          {/* Left: calendar icon + day */}
          <div className="flex min-w-0 flex-col items-center gap-2 px-1 sm:gap-3">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gold-dark sm:h-8 sm:w-8">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p className="text-[12px] font-bold tracking-[0.15em] text-maroon-deep sm:text-base sm:tracking-[0.2em]">SATURDAY</p>
          </div>

          <span className="h-12 w-[1px] bg-maroon-deep/30 sm:h-16" />

          {/* Center: arched date card */}
          <div className="flex min-w-0 flex-col items-center rounded-t-[2rem] border border-maroon-deep/40 px-3 pb-4 pt-4 sm:rounded-t-[3rem] sm:px-5 sm:pb-5 sm:pt-6">
            <p className="text-[12px] font-bold tracking-[0.2em] text-gold-dark sm:text-sm sm:tracking-[0.3em]">AUGUST</p>
            <span
              className="text-maroon-deep leading-none"
              style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(4.2rem, 20vw, 8rem)" }}
            >
              29
            </span>
            <p className="text-[12px] font-bold tracking-[0.18em] text-maroon-deep sm:text-sm sm:tracking-[0.25em]">SATURDAY</p>
            <p className="mt-1 text-[12px] font-bold tracking-[0.18em] text-maroon-deep sm:text-sm sm:tracking-[0.25em]">2026</p>
          </div>

          <span className="h-12 w-[1px] bg-maroon-deep/30 sm:h-16" />

          {/* Right: clock icon + time */}
          <div className="flex min-w-0 flex-col items-center gap-2 px-1 sm:gap-3">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-gold-dark sm:h-8 sm:w-8">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <p className="text-[12px] font-bold tracking-[0.1em] text-maroon-deep sm:text-base sm:tracking-[0.15em]">11:30 AM</p>
          </div>
        </div>

        <CornerFlourish className="pointer-events-none absolute bottom-1 left-1 h-16 w-16 scale-y-[-1] text-gold-dark sm:bottom-2 sm:left-2 sm:h-24 sm:w-24" />
        <CornerFlourish className="pointer-events-none absolute bottom-1 right-1 h-16 w-16 scale-x-[-1] scale-y-[-1] text-gold-dark sm:bottom-2 sm:right-2 sm:h-24 sm:w-24" />
      </section>

      {/* Flower border divider */}
      <FlowerDivider />

      {/* Second page — countdown & location */}
      <section className="relative flex min-h-[88svh] flex-col items-center justify-center px-3 py-8 text-center sm:min-h-[92vh] sm:px-8 sm:py-14">
        <div className="relative w-full max-w-[calc(100vw-1.5rem)] rounded-lg border border-gold-dark/60 bg-cream/40 px-3 py-7 shadow-sm backdrop-blur-sm sm:max-w-lg sm:px-6 sm:py-12">
          <CornerFlourish className="pointer-events-none absolute -left-1 -top-1 h-14 w-14 text-gold-dark sm:-left-2 sm:-top-2 sm:h-20 sm:w-20" />
          <CornerFlourish className="pointer-events-none absolute -right-1 -top-1 h-14 w-14 scale-x-[-1] text-gold-dark sm:-right-2 sm:-top-2 sm:h-20 sm:w-20" />
          <CornerFlourish className="pointer-events-none absolute -bottom-1 -left-1 h-14 w-14 scale-y-[-1] text-gold-dark sm:-bottom-2 sm:-left-2 sm:h-20 sm:w-20" />
          <CornerFlourish className="pointer-events-none absolute -bottom-1 -right-1 h-14 w-14 scale-x-[-1] scale-y-[-1] text-gold-dark sm:-bottom-2 sm:-right-2 sm:h-20 sm:w-20" />

          <Countdown target="2026-08-29T11:30:00" />

          <div className="mt-8 flex flex-col items-center gap-3 animate-float-up delay-1000 sm:mt-12">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-dark sm:w-7 sm:h-7">
              <path d="M12 2 C 8 2, 5 5, 5 9 c 0 5, 7 13, 7 13 s 7 -8, 7 -13 c 0 -4, -3 -7, -7 -7 z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <p className="max-w-full break-words font-display text-lg leading-snug text-maroon-deep sm:text-xl">Eventza Convention Centre</p>
            <p className="max-w-full break-words text-xs tracking-[0.18em] text-maroon-deep/80 sm:text-sm sm:tracking-widest">M-DIT Road, Ullyeri</p>
          </div>

          <div className="mt-8 font-arabic text-lg text-maroon-deep animate-float-up delay-1500 sm:mt-12 sm:text-xl">
            بَارَكَ اللَّهُ لَكُمَا
          </div>
          <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-gold-dark sm:text-[10px] sm:tracking-[0.4em]">May Allah bless you both</p>
        </div>
      </section>
    </div>
  );
}

function Countdown({ target }: { target: string }) {
  const targetTime = useMemo(() => new Date(target).getTime(), [target]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetTime - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const items = [
    { label: "DAYS", value: days },
    { label: "HOURS", value: hours },
    { label: "MINS", value: minutes },
    { label: "SECS", value: seconds },
  ];
  return (
    <div className="w-full animate-float-up delay-1000">
      <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-gold-dark sm:mb-5 sm:text-xs sm:tracking-[0.4em]">Counting down to the big day</p>
      <div className="grid w-full grid-cols-4 items-stretch justify-center gap-1.5 sm:gap-4">
        {items.map((it) => (
          <div
            key={it.label}
            className="flex min-w-0 flex-col items-center rounded-md border border-gold-dark/40 bg-cream/50 px-1.5 py-2 shadow-sm backdrop-blur-sm sm:px-3 sm:py-3"
          >
            <span
              className="text-maroon-deep leading-none"
              style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.45rem, 8vw, 2.7rem)" }}
            >
              {String(it.value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[8px] tracking-[0.08em] text-gold-dark sm:text-[10px] sm:tracking-[0.2em]">{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
