export type ContactPerson = {
  name: string;
  phone: string;
};

const address =
  "Shop No. 5, A Wing, Krishna Sagar Apt., Near Kashi Vishwanath Temple, R.N.P. Park, S.V. Road, Bhayandar East";

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

  contact: {
    /*
     * The first person is the main contact: used for every
     * Call / WhatsApp button and for website enquiries.
     */
    people: [
      { name: "Prathmesh Patil", phone: "8828064702" },
      { name: "Devendra Patil", phone: "9221956137" },
      { name: "Dipeeka Patil", phone: "9892342809" },
    ] satisfies ContactPerson[],

    email: "",
    address,
    city: "Bhayandar East",
    hours: "Mon – Sun, 9:00 AM – 9:00 PM",
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
    mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`,
  },

  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
} as const;

export const primaryContact = business.contact.people[0];

export const yearsOfExperience =
  new Date().getFullYear() - business.since;
