import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { business } from "../../config/business";
import { useMenuSelection } from "../../context/menuSelection";
import {
  ENQUIRY_PREFILL_EVENT,
  eventTypes,
} from "../../utils/enquiry";
import type { EventType } from "../../utils/enquiry";
import {
  formatMenuForMessage,
  hasWhatsApp,
  phoneLink,
  whatsappLink,
} from "../../utils/whatsapp";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import {
  CheckIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "../ui/Icons";

const guestRanges = [
  "Under 50",
  "50 – 100",
  "100 – 250",
  "250 – 500",
  "500 – 1000",
  "1000+",
];

type FormState = {
  name: string;
  phone: string;
  eventType: EventType | "";
  date: string;
  guests: string;
  venue: string;
  message: string;
  includeMenu: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  phone: "",
  eventType: "",
  date: "",
  guests: "",
  venue: "",
  message: "",
  includeMenu: true,
};

function todayIso() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  return now.toISOString().slice(0, 10);
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  const digits = form.phone.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");

  if (form.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!/^[6-9]\d{9}$/.test(digits)) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }

  if (!form.eventType) {
    errors.eventType = "Please choose the type of event.";
  }

  if (!form.date) {
    errors.date = "Please choose your event date.";
  } else if (form.date < todayIso()) {
    errors.date = "Event date can't be in the past.";
  }

  return errors;
}

export function Contact() {
  const { selectedItems } = useMenuSelection();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const eventType = (event as CustomEvent<EventType | undefined>).detail;

      if (eventType) {
        setForm((current) => ({ ...current, eventType }));
        setErrors((current) => ({ ...current, eventType: undefined }));
      }

      setSubmitted(false);
    };

    window.addEventListener(ENQUIRY_PREFILL_EVENT, onPrefill);

    return () =>
      window.removeEventListener(ENQUIRY_PREFILL_EVENT, onPrefill);
  }, []);

  const update = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));

    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];

    if (firstError) {
      document.getElementById(`enquiry-${firstError}`)?.focus();
      return;
    }

    const lines = [
      `Hello ${business.name}! I'd like a quote for my event.`,
      `\n*Name:* ${form.name.trim()}`,
      `*Phone:* ${form.phone.trim()}`,
      `*Event:* ${form.eventType}`,
      `*Date:* ${formatDate(form.date)}`,
      form.guests && `*Guests:* ${form.guests}`,
      form.venue.trim() && `*Venue / City:* ${form.venue.trim()}`,
      form.message.trim() && `\n*Details:* ${form.message.trim()}`,
      form.includeMenu &&
        selectedItems.length > 0 &&
        `\n*My selected menu (${selectedItems.length} items):*\n\n${formatMenuForMessage(selectedItems)}`,
    ].filter(Boolean);

    const message = lines.join("\n");

    if (hasWhatsApp()) {
      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    } else if (business.contact.email) {
      window.location.href = `mailto:${business.contact.email}?subject=${encodeURIComponent(
        `Event enquiry – ${form.eventType}`,
      )}&body=${encodeURIComponent(message.replace(/\*/g, ""))}`;
    } else if (business.contact.phone) {
      window.location.href = phoneLink();
    }

    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-sand/50 py-20 sm:py-24 lg:py-32"
    >
      <div className="container-custom">
        <Reveal>
          <SectionHeading
            eyebrow="Get In Touch"
            title="Let's plan your celebration"
            description="Share a few details and we'll get back to you with menu suggestions and a quote."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">
          {/* Contact details */}
          <Reveal className="h-full">
            <aside className="bg-pattern relative flex h-full flex-col overflow-hidden rounded-3xl bg-brand p-7 text-white sm:p-9">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
              />

              <h3 className="relative font-display text-2xl font-semibold sm:text-3xl">
                Talk to us directly
              </h3>

              <p className="relative mt-3 text-sm leading-6 text-white/70">
                Prefer a quick chat? Call or WhatsApp us — we're happy to
                help you plan.
              </p>

              <ul className="relative mt-8 space-y-5">
                {business.contact.phone && (
                  <ContactRow
                    icon={<PhoneIcon size={18} />}
                    label="Call us"
                    href={phoneLink()}
                  >
                    {business.contact.phone}
                  </ContactRow>
                )}

                {hasWhatsApp() && (
                  <ContactRow
                    icon={<WhatsAppIcon size={18} />}
                    label="WhatsApp"
                    href={whatsappLink()}
                    external
                  >
                    Chat with us
                  </ContactRow>
                )}

                {business.contact.email && (
                  <ContactRow
                    icon={<MailIcon size={18} />}
                    label="Email"
                    href={`mailto:${business.contact.email}`}
                  >
                    {business.contact.email}
                  </ContactRow>
                )}

                {business.contact.address && (
                  <ContactRow
                    icon={<MapPinIcon size={18} />}
                    label="Visit us"
                    href={business.contact.mapUrl || undefined}
                    external
                  >
                    {business.contact.address}
                  </ContactRow>
                )}

                {business.contact.hours && (
                  <ContactRow
                    icon={<ClockIcon size={18} />}
                    label="Working hours"
                  >
                    {business.contact.hours}
                  </ContactRow>
                )}
              </ul>

              <div className="relative mt-auto pt-10">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-display text-lg italic text-accent">
                    “Atithi Devo Bhava”
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    Hospitality since {business.since}.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>

          {/* Enquiry form */}
          <Reveal delay={120}>
            <div className="rounded-3xl border border-brand/10 bg-white p-6 shadow-[0_20px_50px_rgba(90,24,39,0.08)] sm:p-9">
              {submitted ? (
                <SuccessState
                  onReset={() => {
                    setForm(initialForm);
                    setSubmitted(false);
                  }}
                />
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <Field
                    id="enquiry-name"
                    label="Your name"
                    error={errors.name}
                    required
                  >
                    <input
                      id="enquiry-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => update("name", event.target.value)}
                      placeholder="Full name"
                      className={inputClass(errors.name)}
                    />
                  </Field>

                  <Field
                    id="enquiry-phone"
                    label="Mobile number"
                    error={errors.phone}
                    required
                  >
                    <input
                      id="enquiry-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      placeholder="10-digit mobile number"
                      className={inputClass(errors.phone)}
                    />
                  </Field>

                  <Field
                    id="enquiry-eventType"
                    label="Event type"
                    error={errors.eventType}
                    required
                  >
                    <select
                      id="enquiry-eventType"
                      value={form.eventType}
                      onChange={(event) =>
                        update("eventType", event.target.value as EventType)
                      }
                      className={inputClass(errors.eventType)}
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select an occasion
                      </option>
                      {eventTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    id="enquiry-date"
                    label="Event date"
                    error={errors.date}
                    required
                  >
                    <input
                      id="enquiry-date"
                      type="date"
                      min={todayIso()}
                      value={form.date}
                      onChange={(event) => update("date", event.target.value)}
                      className={inputClass(errors.date)}
                    />
                  </Field>

                  <Field
                    id="enquiry-guests"
                    label="Number of guests"
                  >
                    <select
                      id="enquiry-guests"
                      value={form.guests}
                      onChange={(event) => update("guests", event.target.value)}
                      className={inputClass()}
                    >
                      <option value="">Approximate count</option>
                      {guestRanges.map((range) => (
                        <option key={range}>{range}</option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    id="enquiry-venue"
                    label="Venue / City"
                  >
                    <input
                      id="enquiry-venue"
                      type="text"
                      value={form.venue}
                      onChange={(event) => update("venue", event.target.value)}
                      placeholder="Hall name or area"
                      className={inputClass()}
                    />
                  </Field>

                  <Field
                    id="enquiry-message"
                    label="Anything else?"
                    className="sm:col-span-2"
                  >
                    <textarea
                      id="enquiry-message"
                      rows={4}
                      value={form.message}
                      onChange={(event) => update("message", event.target.value)}
                      placeholder="Décor theme, special requests, budget…"
                      className={`${inputClass()} h-auto resize-none py-3`}
                    />
                  </Field>

                  {selectedItems.length > 0 && (
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-4 sm:col-span-2">
                      <input
                        type="checkbox"
                        checked={form.includeMenu}
                        onChange={(event) =>
                          update("includeMenu", event.target.checked)
                        }
                        className="mt-0.5 h-5 w-5 shrink-0 accent-accent"
                      />
                      <span className="text-sm">
                        <span className="font-semibold text-brand">
                          Include my selected menu
                        </span>
                        <span className="block text-muted">
                          {selectedItems.length}{" "}
                          {selectedItems.length === 1 ? "dish" : "dishes"} from
                          the menu builder will be added to your enquiry.
                        </span>
                      </span>
                    </label>
                  )}

                  <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted">
                      {hasWhatsApp()
                        ? "Your enquiry opens in WhatsApp, ready to send."
                        : "We'll get back to you as soon as possible."}
                    </p>

                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {hasWhatsApp() && <WhatsAppIcon size={18} />}
                      Send Enquiry
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Helpers
========================================================= */

function inputClass(error?: string) {
  return `
    h-12
    w-full
    rounded-xl
    border
    bg-page
    px-4
    text-sm
    text-body
    outline-none
    transition-all
    placeholder:text-muted/60
    focus:bg-white
    focus:ring-4
    ${
      error
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
        : "border-brand/10 focus:border-accent focus:ring-accent/10"
    }
  `;
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

function Field({
  id,
  label,
  error,
  required = false,
  className = "",
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-brand"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>

      {children}

      {error && (
        <p
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  href?: string;
  external?: boolean;
  children: ReactNode;
};

function ContactRow({
  icon,
  label,
  href,
  external = false,
  children,
}: ContactRowProps) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
        {icon}
      </span>

      <span>
        <span className="block text-xs uppercase tracking-[0.15em] text-white/50">
          {label}
        </span>
        <span className="mt-0.5 block font-medium">{children}</span>
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          className="group flex items-center gap-4"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-4">{content}</div>
      )}
    </li>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="animate-pop-in flex flex-col items-center py-12 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-lg">
        <CheckIcon size={28} />
      </span>

      <h3 className="mt-6 font-display text-3xl font-semibold text-brand">
        Dhanyavaad!
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
        {hasWhatsApp()
          ? "Your enquiry is ready in WhatsApp — just hit send and we'll get back to you shortly."
          : "Thank you for your enquiry. We'll get back to you shortly."}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 text-sm font-semibold text-accent hover:text-brand"
      >
        Send another enquiry
      </button>
    </div>
  );
}
