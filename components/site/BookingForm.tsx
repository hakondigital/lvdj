"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PACKAGES, type PackageTier } from "@/data/packages";
import { Equalizer } from "@/components/ui/Equalizer";

const EVENT_TYPES = [
  "16th",
  "17th",
  "18th",
  "21st",
  "Engagement / Wedding",
  "Formal / School",
  "House Party",
  "Club Night / Afters",
  "Other",
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  contactPhone: string;
  contactEmail: string;
  instagram: string;
  eventType: (typeof EVENT_TYPES)[number] | "";
  eventDate: string;
  eventDuration: string;
  location: string;
  guestCount: string;
  packageId: PackageTier | "unsure";
  notes: string;
  honeypot: string;
}

const INITIAL: FormState = {
  name: "",
  contactPhone: "",
  contactEmail: "",
  instagram: "",
  eventType: "",
  eventDate: "",
  eventDuration: "",
  location: "",
  guestCount: "",
  packageId: "unsure",
  notes: "",
  honeypot: "",
};

export function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update =
    <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value as FormState[K] }));
    };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Couldn't send your booking. Try again or DM @lv._.dj.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="book" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-25" />
      <div className="absolute -top-32 -left-32 -z-10 h-[34rem] w-[34rem] rounded-full bg-gold/15 blur-[140px]" />
      <div className="absolute -bottom-32 -right-32 -z-10 h-[34rem] w-[34rem] rounded-full bg-neon-pink/10 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-12 md:gap-12">
          {/* Left rail */}
          <div className="md:col-span-5">
            <div className="font-mono text-[11px] tracking-ultra text-gold uppercase mb-4">
              Send · Booking SMS
            </div>
            <h2 className="font-display text-6xl md:text-8xl tracking-tightest leading-[0.85] text-bone">
              Book the <span className="text-gold">night.</span>
            </h2>
            <p className="mt-6 text-bone-dim text-base md:text-lg leading-relaxed max-w-md">
              Fill this in and it pings my phone instantly. I'll reply with
              availability — usually within the day.
            </p>

            <div className="mt-8 space-y-4 max-w-sm">
              <Fact label="Reply time" value="< 24 hours" />
              <Fact label="Payment" value="All methods accepted" />
              <Fact label="Travel" value="Sydney included" />
              <Fact label="DM" value="@lv._.dj on Instagram" />
            </div>

            <div className="mt-10 hidden md:block">
              <Equalizer bars={10} className="h-8 gap-1" />
            </div>
          </div>

          {/* Form card */}
          <div className="md:col-span-7">
            <div className="relative bg-ink-50/70 backdrop-blur-sm border border-white/10 p-6 md:p-9">
              {/* Decorative corner ticks */}
              <Corner className="top-0 left-0" />
              <Corner className="top-0 right-0 rotate-90" />
              <Corner className="bottom-0 right-0 rotate-180" />
              <Corner className="bottom-0 left-0 -rotate-90" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45 }}
                    className="py-16 text-center"
                  >
                    <Equalizer bars={9} className="h-10 gap-1 mx-auto justify-center" />
                    <h3 className="mt-6 font-display text-5xl md:text-6xl tracking-tightest text-gold">
                      You're on the list.
                    </h3>
                    <p className="mt-4 text-bone-dim max-w-md mx-auto">
                      Booking pinged. I've got your details on my phone — expect a reply
                      from <span className="text-bone">+61</span> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setForm(INITIAL);
                        setStatus("idle");
                      }}
                      className="mt-8 font-head text-lg tracking-[0.18em] text-bone border-b border-bone/30 hover:border-gold hover:text-gold transition-colors pb-1"
                    >
                      Send another →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Honeypot — hidden from real users */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.honeypot}
                      onChange={update("honeypot")}
                      className="absolute -left-[9999px] opacity-0 pointer-events-none"
                      aria-hidden="true"
                    />

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Your name" required>
                        <input
                          required
                          name="name"
                          value={form.name}
                          onChange={update("name")}
                          autoComplete="name"
                          placeholder="Jane Smith"
                          className="field w-full px-4 py-3"
                        />
                      </Field>
                      <Field label="Phone" required>
                        <input
                          required
                          type="tel"
                          name="contactPhone"
                          value={form.contactPhone}
                          onChange={update("contactPhone")}
                          autoComplete="tel"
                          placeholder="04XX XXX XXX"
                          className="field w-full px-4 py-3"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Email" hint="Optional">
                        <input
                          type="email"
                          name="contactEmail"
                          value={form.contactEmail}
                          onChange={update("contactEmail")}
                          autoComplete="email"
                          placeholder="jane@example.com"
                          className="field w-full px-4 py-3"
                        />
                      </Field>
                      <Field label="Instagram" hint="So I can suss your vibe">
                        <div className="relative">
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-bone-dim font-mono"
                          >
                            @
                          </span>
                          <input
                            type="text"
                            name="instagram"
                            value={form.instagram}
                            onChange={update("instagram")}
                            autoCapitalize="none"
                            autoCorrect="off"
                            spellCheck={false}
                            inputMode="text"
                            placeholder="your.handle"
                            className="field w-full pl-8 pr-4 py-3"
                          />
                        </div>
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Event type" required>
                        <div className="relative">
                          <select
                            required
                            name="eventType"
                            value={form.eventType}
                            onChange={update("eventType")}
                            className="field w-full px-4 pr-10 py-3 appearance-none"
                          >
                          <option value="" disabled>
                            Select event
                          </option>
                          {EVENT_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                          </select>
                          <svg
                            aria-hidden
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-bone-dim"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </Field>
                      <Field label="Event date" required>
                        <input
                          required
                          type="date"
                          name="eventDate"
                          value={form.eventDate}
                          onChange={update("eventDate")}
                          className="field w-full px-4 py-3"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Duration" hint="How long you need me">
                        <input
                          name="eventDuration"
                          value={form.eventDuration}
                          onChange={update("eventDuration")}
                          placeholder="e.g. 4 hours, 8pm–midnight"
                          className="field w-full px-4 py-3"
                        />
                      </Field>
                      <Field label="Guests" hint="Rough estimate">
                        <input
                          type="number"
                          min={1}
                          name="guestCount"
                          value={form.guestCount}
                          onChange={update("guestCount")}
                          placeholder="80"
                          className="field w-full px-4 py-3"
                        />
                      </Field>
                    </div>

                    <Field label="Location / venue" required>
                      <input
                        required
                        name="location"
                        value={form.location}
                        onChange={update("location")}
                        placeholder="Suburb, venue or address"
                        className="field w-full px-4 py-3"
                      />
                    </Field>

                    <Field label="Package">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PACKAGES.map((pkg) => (
                          <PackagePill
                            key={pkg.id}
                            id={pkg.id}
                            label={pkg.name}
                            sub={`$${pkg.price}`}
                            selected={form.packageId === pkg.id}
                            onSelect={() =>
                              setForm((f) => ({ ...f, packageId: pkg.id }))
                            }
                          />
                        ))}
                        <PackagePill
                          id="unsure"
                          label="Not sure"
                          sub="Help me"
                          selected={form.packageId === "unsure"}
                          onSelect={() =>
                            setForm((f) => ({ ...f, packageId: "unsure" }))
                          }
                        />
                      </div>
                    </Field>

                    <Field label="Anything else?" hint="Special songs, MC moments, parking notes — anything">
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={update("notes")}
                        rows={4}
                        placeholder="Hype tracks, no requests after midnight, venue has tight stairs, etc."
                        className="field w-full px-4 py-3 resize-y"
                      />
                    </Field>

                    {status === "error" && errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-neon-pink/40 bg-neon-pink/10 px-4 py-3 text-sm text-bone"
                      >
                        {errorMsg}
                      </motion.div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                      <p className="text-[11px] font-mono tracking-ultra text-bone-dim uppercase order-2 sm:order-1">
                        Submitting texts the DJ direct.
                      </p>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className={cn(
                          "group relative inline-flex items-center justify-center gap-3 bg-gold text-ink px-7 py-4 font-head text-lg sm:text-xl tracking-[0.18em] overflow-hidden w-full sm:w-auto min-h-[56px] order-1 sm:order-2",
                          status === "submitting" && "opacity-70 cursor-not-allowed"
                        )}
                      >
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 -translate-x-full bg-white/30 group-hover:animate-sweep"
                        />
                        {status === "submitting" ? (
                          <>
                            <Spinner /> <span className="relative">Sending</span>
                          </>
                        ) : (
                          <>
                            <Equalizer bars={4} className="h-4 relative" barClassName="bg-ink" />
                            <span className="relative">Send booking →</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] tracking-ultra text-bone-dim uppercase">
          {label} {required && <span className="text-gold">*</span>}
        </span>
        {hint && (
          <span className="font-mono text-[10px] tracking-[0.15em] text-bone-dim/70 uppercase">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function PackagePill({
  id,
  label,
  sub,
  selected,
  onSelect,
}: {
  id: string;
  label: string;
  sub: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "relative flex flex-col items-start gap-0.5 px-3 py-2.5 border text-left transition-all duration-200",
        selected
          ? "bg-gold text-ink border-gold"
          : "border-white/15 text-bone hover:border-gold/60"
      )}
    >
      <span className="font-head text-base tracking-[0.12em]">{label}</span>
      <span
        className={cn(
          "font-mono text-[10px] tracking-ultra uppercase",
          selected ? "text-ink/70" : "text-bone-dim"
        )}
      >
        {sub}
      </span>
      {selected && (
        <span
          aria-hidden
          className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-ink"
        />
      )}
    </button>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-white/5 pb-3">
      <span className="font-mono text-[10px] tracking-ultra text-bone-dim uppercase">
        {label}
      </span>
      <span className="font-head text-lg tracking-[0.08em] text-bone">
        {value}
      </span>
    </div>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute h-4 w-4 border-l-2 border-t-2 border-gold/70",
        className
      )}
    />
  );
}

function Spinner() {
  return (
    <svg
      className="relative animate-spin h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
