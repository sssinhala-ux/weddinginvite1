import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET = new Date("2026-06-04T09:00:00+05:30").getTime();

function diff() {
  const d = TARGET - Date.now();
  const clamp = Math.max(0, d);
  return {
    days: Math.floor(clamp / 86400000),
    hours: Math.floor((clamp / 3600000) % 24),
    minutes: Math.floor((clamp / 60000) % 60),
    seconds: Math.floor((clamp / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState(diff());
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items: [string, number][] = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {items.map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="relative w-16 sm:w-24 h-20 sm:h-28 rounded-xl maroon-bg shadow-elegant border border-[var(--gold)]/40 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="gold-text text-3xl sm:text-5xl font-bold"
              >
                {String(value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="mt-2 text-xs sm:text-sm tracking-[0.3em] text-[var(--maroon)]">
            {label.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
}
