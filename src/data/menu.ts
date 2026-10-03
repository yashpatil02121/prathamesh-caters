export type MenuCategory = {
  id: string;
  title: string;
  items: string[];
};

export type SelectedMenuItem = {
  categoryId: string;
  categoryTitle: string;
  item: string;
};

export const menu: MenuCategory[] = [
  {
    id: "fresh-juice-soft-drink",
    title: "Fresh Juice + Soft Drink",
    items: [
      "Water Melon",
      "Pineapple",
      "Guava",
      "Pineapple + Guava + Pudina",
      "Mango Shake (Seasonal)",
      "Mocktail",
      "Strawberry Shake",
      "ThumsUp + Sprite + Mirinda",
    ],
  },

  {
    id: "starter",
    title: "Starter",
    items: [
      "Hara Bhara Kabab",
      "Cheeze Ball",
      "Cheez Corn Ball",
      "American Roll",
      "Veg Spring Roll",
      "Panner Chilly",
      "Paneer Pakoda",
      "Paneer Tikka",
      "Dry Manchurian",
      "Cocktail Samosa",
      "Potato Finger",
    ],
  },

  {
    id: "veg-main-course",
    title: "Veg Main Course",
    items: [
      "Veg Makhan Wala",
      "Veg Kadai",
      "Veg Kolhapuri",
      "Veg Hyderabadi",
      "Veg Kurma",
      "Chana Masala",
      "Chole (Punjabi)",
      "Chole Masala",
      "Dum Aloo",
      "Mix Vegetable",
      "Aloo Mutter",
      "Aloo Palak Baigan",
      "Tawa Mehfil",
      "Tawa Sahi",
      "Bhindi Masala",
      "Bhindi Fry",
      "Baigan Bharta",
      "Methi Mutter Malai",
    ],
  },

  {
    id: "paneer-main-course",
    title: "Paneer Main Course",
    items: [
      "Shahi Paneer",
      "Paneer Tikka Masala",
      "Paneer Mutter",
      "Paneer Makhan Wala",
      "Paneer Pasanda",
      "Paneer Makhani",
      "Paneer Kofta",
      "Paneer Butter Masala",
      "Paneer Methi Malai",
      "Paneer Palak",
      "Paneer Hyderabadi",
      "Paneer Amritsari",
      "Undhiyu (Seasonal)",
    ],
  },

  {
    id: "rice",
    title: "Rice",
    items: [
      "Steam Rice",
      "Jeera Rice",
      "Veg Pulao",
      "Green Peas Pulao",
      "Kashmiri Pulao",
      "Masala Rice",
    ],
  },

  {
    id: "dal",
    title: "Dal",
    items: [
      "Dal Fry",
      "Dal Tadka",
      "Dal Makhani",
      "Dal Palak",
      "Gujarati Kadi",
      "Marwadi Kadi",
      "Kadi Pakoda",
      "Panchratna Dal",
    ],
  },

  {
    id: "indian-breads",
    title: "Indian Breads",
    items: [
      "Tandoori Roti",
      "Rumali Roti",
      "Missi Roti",
      "Masala Roti",
      "Kulcha",
      "Naan",
      "Baby Paratha",
      "Methi Paratha",
      "Laccha Paratha",
      "Puri",
      "Palak Puri",
      "Methi Puri",
      "Tawa Roti (Chapati)",
      "Bhature",
    ],
  },

  {
    id: "sweets",
    title: "Sweets",
    items: [
      "Gulab Jamun",
      "Basundi",
      "Shrikhand",
      "Mung Dal Halwa",
      "Dudhi Halwa",
      "Pineapple Halwa",
      "Kala Jamun",
      "Jalebi",
      "Jalabi With Rabadi",
      "Aamras (Seasonal)",
      "Gajar Halwa (Seasonal)",
    ],
  },

  {
    id: "special-bengali-sweets",
    title: "Sweet (Special Bengali Sweets)",
    items: [
      "Malai Sandwich",
      "Rajbhog",
      "Rasgulla",
      "Rasmalai",
    ],
  },
  
  {
    id: "sweet-varieties",
    title: "Sweet (Varieties)",
    items: [
      "Basundi Kesar",
      "Basundi Angoori",
      "Basundi Sitafal (Seasonal)",
      "Basundi Dry Fruits",
      "Basundi Mango",
      "Rasmalai",
      "Rabadi",
    ],
  },

  {
    id: "chat-counter-live",
    title: "Chat Counter Live",
    items: [
      "Pani Puri",
      "Sev Puri",
      "Bhel",
      "Delhi Chat",
      "Dahi Papadi Chat",
      "Aloo Tikki",
      "Kachori Chat",
    ],
  },

  {
    id: "dosa-counter-live",
    title: "Dosa Counter Live",
    items: [
      "Sada Dosa",
      "Masala Dosa",
      "Paneer Dosa",
      "Mini Dosa",
      "Mini Uthappa",
      "Onion Uthappa",
    ],
  },

  {
    id: "salad-extra",
    title: "Salad (Extra)",
    items: [
      "Chana Chat",
      "Corn Chat",
      "Russian Salad",
      "Macroni Salad",
      "Dahi Vada",
      "Dahi Bhalle",
    ],
  },

  {
    id: "raita",
    title: "Raita",
    items: [
      "Boondi Raita",
      "Cucumber Raita",
      "Pineapple Raita",
      "Onion Raita",
      "Plain Curd",
    ],
  },

  {
    id: "chinese-counter",
    title: "Chinese Counter",
    items: [
      "Veg Fried Rice",
      "Veg Noodles",
      "Veg Soup",
      "Veg Manchurian Soup",
    ],
  },

  {
    id: "pasta-pizza-counter",
    title: "Pasta + Pizza Counter",
    items: [
      "Red Sauce Pasta",
      "White Sauce Pasta",
      "Veg Pizza",
      "Cheese Pizza",
      "Paneer Pizza",
      "Garlic Bread",
    ],
  },

  {
    id: "fruit-counter",
    title: "Fruit Counter",
    items: [
      "Pineapple",
      "Watermelon",
      "Papaya",
      "Grapes",
      "Guava",
    ],
  },

  {
    id: "ice-cream",
    title: "Ice Cream",
    items: [
      "Vanilla With Chocolate",
      "Strawberry",
      "Butter Scotch",
      "Tutti Fruti",
      "Malai Kulfi",
      "Kesar Kulfi",
      "Pista Kulfi",
      "Strawberry Kulfi",
      "Mango Kulfi",
    ],
  },

  {
    id: "ice-cream-special",
    title: "Icecream (Special)",
    items: [
      "Roll",
      "Kesar Pista",
      "Dry Fruit",
      "Choco Chips",
      "Kaju Anjeer",
      "Paan Masala",
      "Gulkand",
      "Roasted Almond",
      "Black Current",
    ],
  },

  {
    id: "special-counters",
    title: "Special Counters",
    items: [
      "Pan Counter",
      "Mukhwas Counter",
      "Fruit Counter",
      "Popcorn",
      "Candy Floss",
    ],
  },

  {
    id: "pav-bhaji",
    title: "Pav Bhaji",
    items: [
      "Pav Bhaji",
      "Cheese Pav Bhaji",
    ],
  },

  {
    id: "biryani",
    title: "Biryani",
    items: [
      "Veg Biryani",
      "Veg Hyderabadi Biryani",
      "Paneer Biryani",
    ],
  },

  {
    id: "hi-tea",
    title: "Hi Tea",
    items: [
      "Tea",
      "Coffee",
      "Poha",
      "Upma",
      "Sheera",
      "Idli",
      "Medu Vada",
      "Batata Vada",
      "Kanda Bhaji",
      "Mix Bhaji",
      "Fafada",
      "Jalebi",
      "Gathiya",
      "Samosa",
      "Kachori",
    ],
  },
];