import { business } from "../config/business";
import type { SelectedMenuItem } from "../types/menu";

export function hasWhatsApp() {
  return business.contact.whatsapp.length > 0;
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${business.contact.whatsapp}`;

  return message
    ? `${base}?text=${encodeURIComponent(message)}`
    : base;
}

export function phoneLink() {
  return `tel:${business.contact.phone.replace(/[^\d+]/g, "")}`;
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
