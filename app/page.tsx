"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

type NavLink = {
  href: string;
  label: string;
};

type BenefitCard = {
  title: string;
  description: string;
  detail: string;
};

type PricingCard = {
  name: string;
  price: string;
  cadence: string;
  note: string;
};

type BookingNoteCard = {
  title: string;
  description: string;
};

type GallerySlide = {
  alt: string;
  description: string;
  src?: string;
  title: string;
};

const CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/embed?src=poshpaws.dogcare%40gmail.com&ctz=America%2FLos_Angeles";

const navigationLinks: NavLink[] = [
  { href: "#pricing", label: "Pricing" },
  { href: "#book", label: "Let's Connect" },
];

const benefitCards: BenefitCard[] = [
  {
    title: "Care that feels familiar",
    description:
      "Each stay is tailored to your dog’s routine, personality, and comfort level so they can settle in and feel at home.",
    detail: "Private, attentive care shaped around your pup.",
  },
  {
    title: "You’ll always know how they’re doing",
    description:
      "Daily photo and text updates help you stay connected and give you peace of mind while you’re away.",
    detail: "Clear communication is part of every stay.",
  },
  {
    title: "Easy pickup, no extra fees",
    description:
      "Pickup is available when you need it, without added charges or unnecessary stress.",
    detail: "Simple, accommodating care from start to finish.",
  },
];

const pricingCards: PricingCard[] = [
  {
    name: "Overnight boarding",
    price: "$50",
    cadence: "/ first dog",
    note: "+$30 for each additional dog.",
  },
  {
    name: "Extended and holiday stays",
    price: "$60",
    cadence: "/ night",
    note: "+$40 for each additional dog.",
  },
];

const bookingNoteCards: BookingNoteCard[] = [
  {
    title: "A thoughtful first conversation",
    description:
      "After you inquire, I’ll be in touch within 24 hours to learn more about your dog’s personality, routine, and needs.",
  },
  {
    title: "Meet-and-greet before booking",
    description:
      "We’ll schedule a meet-and-greet so everyone feels comfortable and confident before confirming the stay.",
  },
  {
    title: "Carefully considered stays",
    description:
      "I keep my client list small and accept bookings intentionally to make sure each dog is a good fit for my home and routine.",
  },
];

// Add more client photos here as you collect them.
const clientGallerySlides: GallerySlide[] = [
  {
    src: "/Posh%20Paws%201.png",
    alt: "Raquel outside with two happy dogs",
    title: "Adventure walks together",
    description:
      "Outdoor time is paced around the dogs in care, with room for fun, movement, and plenty of check-ins.",
  },
  {
    src: "/Posh%20Paws%202.png",
    alt: "Raquel smiling while a dog kisses her cheek",
    title: "Sweet client connections",
    description:
      "These kinds of easy, affectionate moments help show how comfortable dogs can feel during their stay.",
  },
  {
    src: "/Posh%20Paws%203.png",
    alt: "Two dogs on a sunny trail walk",
    title: "Trail time and fresh air",
    description:
      "Walks and outdoor time can be part of a calm, enriching routine based on each dog’s needs and energy.",
  },
  {
    src: "/Posh%20Paws%200.png",
    alt: "Raquel smiling in a sunny field with a happy dog",
    title: "Sunny field smiles",
    description:
      "Bright outdoor moments like this help show the warm, personal feel families can expect from Posh Paws.",
  },
  {
    src: "/Posh%20Paws%205.png",
    alt: "Raquel smiling with a happy dog in a sunny field",
    title: "Happy guest memories",
    description:
      "Use this carousel to highlight previous clients and give new families a more personal sense of your care.",
  },
];

const calendarConfigured = !CALENDAR_EMBED_URL.startsWith("replace-with-your");

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`${eyebrow ? "mt-4" : ""} font-display text-3xl tracking-tight text-[var(--color-ink)] sm:text-4xl`}>
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-[color:rgba(40,44,34,0.78)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function Home() {
  const [activeClientSlide, setActiveClientSlide] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const currentClientSlide = clientGallerySlides[activeClientSlide];

  async function handleInquirySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Unable to submit form");
      }

      form.reset();
      setIsSuccessModalOpen(true);
    } catch {
      setFormError(
        "Something went wrong while sending your inquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function showPreviousClientSlide() {
    setActiveClientSlide((currentIndex) =>
      currentIndex === 0 ? clientGallerySlides.length - 1 : currentIndex - 1
    );
  }

  function showNextClientSlide() {
    setActiveClientSlide((currentIndex) =>
      currentIndex === clientGallerySlides.length - 1 ? 0 : currentIndex + 1
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-ink)]">
      <header className="sticky top-0 z-50 border-b border-[color:rgba(45,63,54,0.08)] bg-[color:rgba(255,250,244,0.88)] backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <Image
              src="/posh-paws-logo.png"
              alt="Posh Paws logo"
              width={56}
              height={56}
              priority
              className="h-14 w-14 rounded-full border border-[color:rgba(45,63,54,0.08)] bg-white object-cover shadow-[0_10px_24px_rgba(66,51,36,0.08)]"
            />
            <span className="block font-display text-xl tracking-tight text-[var(--color-ink)]">
              Posh Paws
            </span>
          </a>

          <div className="flex flex-wrap items-center justify-end gap-2 text-sm font-semibold text-[color:rgba(40,44,34,0.8)] sm:gap-3">
            {navigationLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 transition hover:bg-[color:rgba(45,63,54,0.08)] hover:text-[var(--color-forest)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
        <section className="scroll-mt-28">
          <div className="overflow-hidden rounded-[2rem] border border-[color:rgba(45,63,54,0.08)] bg-[var(--color-card)] px-8 pb-8 pt-12 shadow-[0_28px_80px_rgba(66,51,36,0.09)] sm:px-10 sm:pb-10 sm:pt-14">
            <div className="grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
              <div className="flex flex-col">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  Reno-Tahoe
                </p>
                <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[0.95] tracking-tight text-[var(--color-ink)] sm:text-6xl">
                  Your Pet&apos;s Favorite Vacation
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:rgba(40,44,34,0.78)]">
                  Private luxury boarding with 24/7 personalized care, daily
                  photo updates, and a safe home environment, so you can travel
                  with peace of mind.
                </p>
              </div>

              <div className="flex items-start justify-center lg:-mt-16">
                <div className="relative aspect-square w-full max-w-[24rem] overflow-hidden rounded-[1.8rem] bg-transparent">
                  <Image
                    src="/public.png"
                    alt="Posh Paws hero image"
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 24rem, 78vw"
                    className="object-contain object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl rounded-[2rem] border border-[color:rgba(45,63,54,0.08)] bg-[var(--color-sand)] p-5 shadow-[0_24px_60px_rgba(66,51,36,0.08)] sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
            <div className="flex flex-col gap-6 p-1 sm:p-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">
                  5 Star Rating
                </p>
                <blockquote className="mt-4 max-w-[26rem] font-display text-[1.85rem] leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-[2.15rem] lg:text-[2.3rem]">
                  “Raquel was our pups’ home away from home. She was incredibly
                  attentive and communicative throughout their stay, and made
                  our trip completely worry-free.”
                </blockquote>
                <p className="mt-4 text-base font-medium text-[color:rgba(40,44,34,0.72)]">
                  — Taylor P.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={showPreviousClientSlide}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:rgba(45,63,54,0.12)] bg-white/60 text-xl text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                    aria-label="Show previous client photo"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={showNextClientSlide}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:rgba(45,63,54,0.12)] bg-white/60 text-xl text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                    aria-label="Show next client photo"
                  >
                    ›
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {clientGallerySlides.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => setActiveClientSlide(index)}
                      className={`h-2.5 rounded-full transition ${
                        index === activeClientSlide
                          ? "w-8 bg-[var(--color-accent)]"
                          : "w-2.5 bg-[color:rgba(45,63,54,0.22)]"
                      }`}
                      aria-label={`Show slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <article className="w-full self-start rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(45,63,54,0.98),rgba(54,81,68,0.98))] p-3 text-white shadow-[0_22px_48px_rgba(32,46,39,0.18)] lg:ml-auto lg:max-w-[36rem]">
              {currentClientSlide.src ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.35rem] bg-[color:rgba(255,255,255,0.04)]">
                  <Image
                    src={currentClientSlide.src}
                    alt={currentClientSlide.alt}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 36rem, 100vw"
                    className="object-cover"
                    style={{ objectPosition: "center 65%" }}
                  />
                </div>
              ) : (
                <div className="flex aspect-[5/4] w-full items-center justify-center bg-[color:rgba(255,255,255,0.06)] p-8 text-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:rgba(255,236,221,0.82)]">
                      Image slot
                    </p>
                    <p className="mt-4 text-base leading-7 text-[color:rgba(250,245,239,0.82)]">
                      Add a client image to this slide when you are ready.
                    </p>
                  </div>
                </div>
              )}
            </article>
          </div>
        </section>

        <section
          id="benefits"
          className="scroll-mt-28 rounded-[2rem] border border-[color:rgba(45,63,54,0.08)] bg-white/80 p-8 shadow-[0_18px_50px_rgba(66,51,36,0.06)] sm:p-10"
        >
          <SectionHeading
            eyebrow="Personalized Dog Care"
            title="What you can count on"
            description=""
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {benefitCards.map((card, index) => (
              <article
                key={card.title}
                className="flex h-full flex-col rounded-[1.6rem] border border-[color:rgba(45,63,54,0.08)] bg-[var(--color-card)] p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  {index === 0
                    ? "Personalized care"
                    : index === 1
                      ? "Daily updates"
                      : "Flexible pickup"}
                </p>
                <h3 className="mt-4 font-display text-2xl tracking-tight text-[var(--color-ink)]">
                  {card.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[color:rgba(40,44,34,0.8)]">
                  {card.description}
                </p>
                <p className="mt-6 rounded-[1.2rem] bg-[var(--color-sand)] px-4 py-3 text-sm leading-6 text-[color:rgba(40,44,34,0.76)]">
                  {card.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="book"
          className="scroll-mt-28 rounded-[2rem] border border-[color:rgba(45,63,54,0.08)] bg-white/85 p-8 shadow-[0_18px_50px_rgba(66,51,36,0.06)] sm:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
            Pricing and availability
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Clear From the Start
          </h2>

          <div className="mt-6 grid gap-5 lg:grid-cols-[21rem_minmax(0,1fr)] lg:items-start">
            <aside
              id="pricing"
              className="scroll-mt-28 rounded-[1.8rem] border border-[color:rgba(45,63,54,0.08)] bg-[var(--color-card)] p-4 sm:p-5 lg:self-start"
            >
              <div className="space-y-4">
                {pricingCards.map((tier) => (
                  <article
                    key={tier.name}
                    className="flex flex-col rounded-[1.6rem] border border-[color:rgba(45,63,54,0.08)] bg-[var(--color-sand)] p-5 text-[var(--color-ink)] shadow-[0_18px_40px_rgba(66,51,36,0.08)]"
                  >
                    <h3 className="font-display text-[1.9rem] tracking-tight text-[var(--color-ink)]">
                      {tier.name}
                    </h3>
                    <p className="mt-4 flex items-baseline gap-2">
                      <span className="font-display text-[3.35rem] leading-none tracking-tight text-[var(--color-ink)]">
                        {tier.price}
                      </span>
                      <span className="text-base font-medium text-[color:rgba(40,44,34,0.64)]">
                        {tier.cadence}
                      </span>
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[color:rgba(40,44,34,0.76)]">
                      {tier.note}
                    </p>
                  </article>
                ))}
              </div>
            </aside>

            <div className="overflow-hidden rounded-[1.8rem] border border-[color:rgba(45,63,54,0.08)] bg-[linear-gradient(180deg,rgba(45,63,54,0.98),rgba(54,81,68,0.98))] text-white shadow-[0_22px_48px_rgba(32,46,39,0.18)]">
              <div className="border-b border-[color:rgba(255,255,255,0.12)] px-6 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:rgba(255,236,221,0.82)]">
                  Availability calendar
                </p>
              </div>

              {calendarConfigured ? (
                <iframe
                  title="Posh Paws availability calendar"
                  src={CALENDAR_EMBED_URL}
                  className="min-h-[28rem] w-full border-0 bg-white"
                  loading="lazy"
                />
              ) : (
                <div className="grid gap-6 bg-[linear-gradient(135deg,rgba(45,63,54,0.94),rgba(54,81,68,0.96))] px-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <h3 className="font-display text-3xl tracking-tight text-white">
                      Calendar embed placeholder
                    </h3>
                    <p className="mt-4 max-w-lg text-base leading-7 text-[color:rgba(250,245,239,0.82)]">
                      Replace <code>CALENDAR_EMBED_URL</code> in{" "}
                      <code>app/page.tsx</code> with your Google Calendar embed link
                      and the live availability view will render here automatically.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[color:rgba(255,255,255,0.12)] bg-[color:rgba(255,255,255,0.08)] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:rgba(255,236,221,0.82)]">
                      How to wire it
                    </p>
                    <ol className="mt-4 space-y-3 text-sm leading-6 text-[color:rgba(250,245,239,0.82)]">
                      <li>1. Open your Google Calendar embed settings.</li>
                      <li>2. Copy the public embed URL for your availability calendar.</li>
                      <li>3. Paste it into the constant at the top of this page file.</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
              Book with me
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-[var(--color-ink)] sm:text-4xl">
              Let&apos;s Connect
            </h2>
          </div>

          <form
            action="https://formspree.io/f/xojpplky"
            method="POST"
            onSubmit={handleInquirySubmit}
            className="mt-5 min-w-0 rounded-[1.8rem] border border-[color:rgba(45,63,54,0.08)] bg-[var(--color-card)] p-6"
          >
            <div className="grid gap-4 sm:mt-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-ink)]">
                Owner name
                <input
                  required
                  name="ownerName"
                  type="text"
                  placeholder="Jordan Lee"
                  className="rounded-[1rem] border border-[color:rgba(45,63,54,0.12)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none transition placeholder:text-[color:rgba(40,44,34,0.42)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[color:rgba(200,117,82,0.2)]"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-ink)]">
                Dog name
                <input
                  required
                  name="dogName"
                  type="text"
                  placeholder="Maple"
                  className="rounded-[1rem] border border-[color:rgba(45,63,54,0.12)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none transition placeholder:text-[color:rgba(40,44,34,0.42)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[color:rgba(200,117,82,0.2)]"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-ink)] sm:col-span-2">
                Additional dog name(s)
                <input
                  name="additionalDogs"
                  type="text"
                  placeholder="List any additional dogs joining the stay"
                  className="rounded-[1rem] border border-[color:rgba(45,63,54,0.12)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none transition placeholder:text-[color:rgba(40,44,34,0.42)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[color:rgba(200,117,82,0.2)]"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-ink)]">
                Check-in date
                <input
                  required
                  name="checkIn"
                  type="date"
                  className="rounded-[1rem] border border-[color:rgba(45,63,54,0.12)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[color:rgba(200,117,82,0.2)]"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-ink)]">
                Check-out date
                <input
                  required
                  name="checkOut"
                  type="date"
                  className="rounded-[1rem] border border-[color:rgba(45,63,54,0.12)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[color:rgba(200,117,82,0.2)]"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-ink)]">
                Email
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="jordan@example.com"
                  className="rounded-[1rem] border border-[color:rgba(45,63,54,0.12)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none transition placeholder:text-[color:rgba(40,44,34,0.42)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[color:rgba(200,117,82,0.2)]"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-ink)]">
                Phone
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="rounded-[1rem] border border-[color:rgba(45,63,54,0.12)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none transition placeholder:text-[color:rgba(40,44,34,0.42)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[color:rgba(200,117,82,0.2)]"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-white transition hover:bg-[var(--color-accent-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </div>

            {formError ? (
              <p className="mt-4 text-sm leading-6 text-[var(--color-accent-dark)]">
                {formError}
              </p>
            ) : null}
          </form>
        </section>

      </main>

      <footer
        id="contact"
        className="border-t border-[color:rgba(45,63,54,0.08)] bg-[linear-gradient(135deg,rgba(45,63,54,0.98),rgba(73,104,90,0.98))] px-4 py-5 text-center text-sm text-[color:rgba(250,245,239,0.82)] sm:px-6 lg:px-8"
      >
        Posh Paws | Reno-Tahoe Personalized Dog Care
      </footer>

      {isSuccessModalOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[color:rgba(25,31,27,0.58)] px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-success-title"
            className="w-full max-w-5xl rounded-[2rem] border border-[color:rgba(45,63,54,0.08)] bg-[var(--color-card)] p-6 shadow-[0_28px_80px_rgba(25,31,27,0.22)] sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Inquiry received
                </p>
                <h2
                  id="inquiry-success-title"
                  className="mt-3 font-display text-3xl tracking-tight text-[var(--color-ink)]"
                >
                  What happens next
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-[color:rgba(45,63,54,0.12)] bg-white px-5 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {bookingNoteCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[1.4rem] border border-[color:rgba(45,63,54,0.08)] bg-[var(--color-sand)] px-5 py-5"
                >
                  <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[color:rgba(40,44,34,0.78)]">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
