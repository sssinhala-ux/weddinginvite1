import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SRC = "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3"; // soft instrumental

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true;
    a.volume = 0.4;
    ref.current = a;
    return () => { a.pause(); };
  }, []);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) ref.current.pause();
    else ref.current.play().catch(() => {});
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full maroon-bg border border-[var(--gold)]/60 shadow-gold-glow flex items-center justify-center text-[var(--gold-soft)] hover:scale-110 transition"
      aria-label="Toggle music"
    >
      {playing ? <Music className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
}
