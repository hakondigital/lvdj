const ITEMS = [
  "16TH BIRTHDAYS",
  "17TH BIRTHDAYS",
  "18TH BIRTHDAYS",
  "21ST BIRTHDAYS",
  "FORMALS",
  "AFTERS",
  "ENGAGEMENTS",
  "CLUB NIGHTS",
  "HOUSE PARTIES",
  "WEDDINGS",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative border-y border-white/10 bg-ink overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-5 will-change-transform">
        {row.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-6 px-6 font-display text-3xl md:text-5xl tracking-tightest text-bone/80"
          >
            <span>{item}</span>
            <svg
              aria-hidden
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-gold shrink-0"
            >
              <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
