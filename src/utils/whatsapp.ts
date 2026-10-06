import { business, primaryContact } from "../config/business";
import type { SelectedMenuItem } from "../types/menu";

function tenDigits(phone: string) {
  return phone.replace(/\D/g, "").slice(-10);
}

/** "8828064702" → "+91 88280 64702" */
export function formatPhone(phone: string = primaryContact.phone) {
  const digits = tenDigits(phone);

  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export function whatsappLink(
  message?: string,
  phone: string = primaryContact.phone,
) {
  const base = `https://wa.me/91${tenDigits(phone)}`;

  return message
    ? `${base}?text=${encodeURIComponent(message)}`
    : base;
}

export function phoneLink(phone: string = primaryContact.phone) {
  return `tel:+91${tenDigits(phone)}`;
}

export function groupSelectedItems(
  selectedItems: SelectedMenuItem[],
) {
  const grouped = new Map<string, SelectedMenuItem[]>();

  for (const selected of selectedItems) {
    const existing = grouped.get(selected.categoryTitle);

    if (existing) {
      existing.push(selected);
    } else {
      grouped.set(selected.categoryTitle, [selected]);
    }
  }

  return Array.from(grouped.entries());
}

export function formatMenuForMessage(
  selectedItems: SelectedMenuItem[],
) {
  return groupSelectedItems(selectedItems)
    .map(
      ([category, items]) =>
        `*${category}*\n${items
          .map((selected) => `• ${selected.item}`)
          .join("\n")}`,
    )
    .join("\n\n");
}

export function buildMenuMessage(
  selectedItems: SelectedMenuItem[],
) {
  return [
    `Hello ${business.name}!`,
    "",
    `I'd like a quote for this menu (${selectedItems.length} items):`,
    "",
    formatMenuForMessage(selectedItems),
  ].join("\n");
}
