import type { EventType } from "../utils/enquiry";

export type Occasion = {
  title: string;
  description: string;
  icon: "rings" | "heart" | "cake" | "diya" | "home" | "briefcase";
  eventType: EventType;
};

export const occasions: Occasion[] = [
  {
    title: "Weddings",
    description:
      "Grand menus, live counters and mandap décor for your biggest day.",
    icon: "rings",
    eventType: "Wedding",
  },
  {
    title: "Engagement & Sangeet",
    description:
      "Festive spreads and vibrant setups for the celebrations before the vows.",
    icon: "heart",
    eventType: "Engagement / Sangeet",
  },
  {
    title: "Birthdays & Anniversaries",
    description:
      "Fun counters, themed décor and crowd-pleasing favourites for all ages.",
    icon: "cake",
    eventType: "Birthday / Anniversary",
  },
  {
    title: "Pooja & Religious Functions",
    description:
      "Traditional vegetarian menus served with care for auspicious occasions.",
    icon: "diya",
    eventType: "Pooja / Religious Function",
  },
  {
    title: "Housewarming",
    description:
      "Warm, homely food and graceful décor for your Griha Pravesh.",
    icon: "home",
    eventType: "Housewarming",
  },
  {
    title: "Corporate Events",
    description:
      "Hi-tea, lunches and conference catering for offices and corporate gatherings.",
    icon: "briefcase",
    eventType: "Corporate Event",
  },
];
