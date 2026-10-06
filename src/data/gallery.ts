import { menuImages } from "./menuImages";

/*
 * Gallery photos. To add event / décor photos, drop them in
 * src/assets/gallery/, import them here and add an entry with
 * category "Décor" (the filter tab appears automatically).
 */

export type GalleryImage = {
  src: string;
  title: string;
  category: string;
};

const fromMenu = (
  title: string,
  category: string,
): GalleryImage | null =>
  menuImages[title]
    ? { src: menuImages[title], title, category }
    : null;

export const gallery: GalleryImage[] = [
  fromMenu("Paneer Tikka", "Starters"),
  fromMenu("Masala Dosa", "Live Counters"),
  fromMenu("Jalebi With Rabadi", "Sweets"),
  fromMenu("Paneer Butter Masala", "Main Course"),
  fromMenu("Pani Puri", "Live Counters"),
  fromMenu("Mocktail", "Beverages"),
  fromMenu("Hara Bhara Kabab", "Starters"),
  fromMenu("Rasmalai", "Sweets"),
  fromMenu("Dal Makhani", "Main Course"),
  fromMenu("Pav Bhaji", "Live Counters"),
  fromMenu("Gulab Jamun", "Sweets"),
  fromMenu("Watermelon Juice", "Beverages"),
  fromMenu("Veg Spring Roll", "Starters"),
  fromMenu("Kashmiri Pulao", "Main Course"),
  fromMenu("Dahi Papdi Chat", "Live Counters"),
  fromMenu("Shrikhand", "Sweets"),
].filter((image): image is GalleryImage => image !== null);
