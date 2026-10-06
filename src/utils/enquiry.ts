export const eventTypes = [
  "Wedding",
  "Engagement / Sangeet",
  "Birthday / Anniversary",
  "Pooja / Religious Function",
  "Housewarming",
  "Corporate Event",
  "Other Celebration",
] as const;

export type EventType = (typeof eventTypes)[number];

export const ENQUIRY_PREFILL_EVENT = "enquiry:prefill";

/**
 * Pre-selects the event type in the contact form
 * and scrolls the visitor to it.
 */
export function startEnquiry(eventType?: EventType) {
  window.dispatchEvent(
    new CustomEvent(ENQUIRY_PREFILL_EVENT, {
      detail: eventType,
    }),
  );

  document
    .getElementById("contact")
    ?.scrollIntoView({ behavior: "smooth" });
}
