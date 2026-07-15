import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import bgImage from "@/assets/nikah-bg.jpg";
import ornament from "@/assets/gold-ornament.png";
import songAsset from "@/assets/nikah.mp3.asset.json";

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
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Amiri:wght@400;700&family=Great+Vibes&display=swap" },
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
    <div className="relative min-h-screen w-full overflow-hidden bg-emerald-deep font-serif-body text-cream">
      <audio ref={audioRef} src={songAsset.url} preload="auto" />

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/40 via-emerald-deep/20 to-emerald-deep/70" />

      {/* Floating sparkles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute rounded-full bg-gold animate-sparkle"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
            width: `${4 + (i % 4)}px`,
            height: `${4 + (i % 4)}px`,
            animationDelay: `${(i % 5) * 0.6}s`,
            boxShadow: "0 0 12px currentColor",
          }}
        />
      ))}

      {!opened ? <Cover onOpen={() => setOpened(true)} /> : <CardContent playing={playing} onToggle={toggleMusic} />}
    </div>
  );
}

function Cover({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center animate-fade-scale">
      <p className="font-arabic text-2xl md:text-3xl gold-text animate-float-up">بِسْمِ اللَّهِ</p>
      <div className="mt-6 flex items-center gap-4 animate-float-up delay-200">
        <span className="h-px w-16 bg-gold/70" />
        <span className="tracking-[0.5em] text-xs uppercase text-gold-soft">Nikah</span>
        <span className="h-px w-16 bg-gold/70" />
      </div>
      <h1
        className="mt-8 gold-text animate-float-up delay-300"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(3rem, 9vw, 6rem)", lineHeight: 1 }}
      >
        Mohammed Shahal
      </h1>
      <p className="my-3 text-3xl font-display italic text-gold animate-float-up delay-500">&</p>
      <h1
        className="gold-text animate-float-up delay-700"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(3rem, 9vw, 6rem)", lineHeight: 1 }}
      >
        Fasna
      </h1>

      <p className="mt-10 font-display text-lg tracking-widest text-cream animate-float-up delay-1000">
        29 · AUGUST · 2026
      </p>

      <button
        onClick={onOpen}
        className="mt-14 group relative overflow-hidden rounded-full border border-gold/60 bg-gold/10 px-10 py-4 text-sm uppercase tracking-[0.35em] text-gold-soft backdrop-blur-sm transition-all hover:bg-gold hover:text-emerald-deep animate-glow-pulse animate-float-up delay-1500"
      >
        <span className="relative z-10">Open Invitation</span>
      </button>
      <p className="mt-4 text-xs text-gold-soft/70 animate-float-up delay-1500">Tap to reveal</p>
    </div>
  );
}

function CardContent({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center px-6 py-16 text-center animate-card-rise">
      {/* Music toggle */}
      <button
        onClick={onToggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed right-5 top-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-emerald-deep/70 text-gold shadow-gold backdrop-blur-md transition-transform hover:scale-110"
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="animate-spin-slow">
            <path d="M12 3v9.28a4.39 4.39 0 0 0-1.5-.28A4.5 4.5 0 1 0 15 16.5V6h4V3z" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        {playing && (
          <span className="absolute inset-0 rounded-full border border-gold/40 animate-glow-pulse" />
        )}
      </button>

      <div className="animate-float-up">
        <p className="font-arabic text-2xl gold-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p className="mt-3 text-xs uppercase tracking-[0.4em] text-gold-soft/80">In the name of Allah</p>
      </div>

      <Divider />

      <p className="max-w-md text-base italic leading-relaxed text-cream/90 animate-float-up delay-200 font-display">
        "And among His signs is this, that He created for you mates from among yourselves,
        that you may dwell in tranquility with them, and He has put love and mercy between your hearts."
        <span className="mt-2 block text-xs tracking-widest text-gold-soft">— Qur'an 30:21</span>
      </p>

      <Divider />

      <p className="text-sm uppercase tracking-[0.35em] text-gold-soft animate-float-up delay-300">
        Together with their families
      </p>
      <p className="mt-6 text-xs uppercase tracking-[0.4em] text-cream/70 animate-float-up delay-500">Groom</p>
      <h2
        className="mt-2 gold-text animate-float-up delay-500"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.5rem, 8vw, 4.5rem)", lineHeight: 1 }}
      >
        Mohammed Shahal
      </h2>

      <div className="my-6 flex items-center gap-4 animate-float-up delay-700">
        <span className="h-px w-12 bg-gold/60" />
        <span className="font-display text-3xl italic text-gold">&</span>
        <span className="h-px w-12 bg-gold/60" />
      </div>

      <p className="text-xs uppercase tracking-[0.4em] text-cream/70 animate-float-up delay-700">Bride</p>
      <h2
        className="mt-2 gold-text animate-float-up delay-700"
        style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.5rem, 8vw, 4.5rem)", lineHeight: 1 }}
      >
        Fasna
      </h2>

      <Divider />

      {/* Date card */}
      <div
        className="relative w-full max-w-sm rounded-lg border border-gold/40 bg-emerald-deep/60 p-8 shadow-gold backdrop-blur-sm animate-float-up delay-1000"
        style={{ boxShadow: "inset 0 0 60px oklch(0.78 0.13 82 / 0.1)" }}
      >
        <img
          src={ornament}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain opacity-30 pointer-events-none"
        />
        <p className="text-xs uppercase tracking-[0.4em] text-gold-soft">Save the date</p>
        <div className="my-4 flex items-center justify-center gap-6">
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-cream/70">Saturday</p>
            <p className="font-display text-lg text-cream">August</p>
          </div>
          <p className="gold-text font-display" style={{ fontSize: "4.5rem", lineHeight: 1 }}>29</p>
          <div className="text-left">
            <p className="text-xs uppercase tracking-widest text-cream/70">2026</p>
            <p className="font-display text-lg text-cream">11:30 AM</p>
          </div>
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold-soft/80">Nikah Ceremony</p>
      </div>

      <Divider />

      <p className="font-display text-xl italic text-cream/90 animate-float-up delay-1000">
        Your presence is our greatest blessing.
      </p>
      <p className="mt-3 text-sm tracking-widest text-gold-soft animate-float-up delay-1500">
        — Mohammed Shahal & Fasna —
      </p>

      <div className="mt-10 font-arabic text-xl gold-text animate-float-up delay-1500">
        بَارَكَ اللَّهُ لَكُمَا
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-gold-soft/70">May Allah bless you both</p>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-10 flex items-center gap-3 animate-float-up delay-200">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
      <svg width="24" height="24" viewBox="0 0 24 24" className="text-gold">
        <path
          d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}
