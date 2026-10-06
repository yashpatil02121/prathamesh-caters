export const CONTACT_SHEET_EVENT = "contact-sheet:open";

/** Opens the bottom sheet listing all contact numbers. */
export function openContactSheet() {
  window.dispatchEvent(new Event(CONTACT_SHEET_EVENT));
}
