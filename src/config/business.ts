export const business = {
  name: "Prathamesh Decorators & Caterers",

  brandName: "PRATHAMESH",

  category: "Decorators & Caterers",

  tagline: "Beautiful Celebrations. Memorable Flavours.",

  description:
    "Creating memorable celebrations through delicious catering and beautiful event experiences.",

  since: 1990,

  services: [
    "Catering",
    "Event Decoration",
    "Live Counters",
    "Celebration Services",
  ],

  /*
   * TODO: Replace these placeholder contact details with the real ones.
   * `whatsapp` must be digits only, with country code (e.g. 919812345678).
   * Leave a field as "" to hide it on the website.
   */
  contact: {
    phone: "+91 00000 00000",
    whatsapp: "910000000000",
    email: "",
    address: "",
    city: "",
    hours: "Mon – Sun, 9:00 AM – 9:00 PM",
    mapUrl: "",
  },

  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
} as const;

export const yearsOfExperience =
  new Date().getFullYear() - business.since;
