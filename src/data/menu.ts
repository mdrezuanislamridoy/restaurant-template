export interface MenuOption {
  id: number;
  name: string;
  price: number;
  orig_price?: number;
  raw?: number;
}

export interface VariationGroup {
  id: number;
  name: string;
  required: boolean;
  max_select: number;
  options: MenuOption[];
}

export interface Addon {
  id: number;
  name: string;
  price: number;
  orig_price?: number;
  max_qty: number;
}

export interface FbtItem {
  id: number;
  name: string;
  price: number;
  orig_price?: number;
  image?: string;
}

export interface MenuItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  origPrice?: number;
  rawPrice?: number; // base pre-discount price
  image: string;
  image_large?: string;
  desc?: string;
  category: string;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  isLocked?: boolean; // for time-slot locked deals
  availableTime?: string;
  variationGroups?: VariationGroup[];
  addons?: Addon[];
  fbt?: FbtItem[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  { id: 'steaks', name: 'Premium Steaks', icon: '🥩', count: 5 },
  { id: 'burgers', name: 'Gourmet Burgers', icon: '🍔', count: 3 },
  { id: 'grill-sides', name: 'Sides & Starters', icon: '🍟', count: 4 },
  { id: 'beverages', name: 'Craft Drinks', icon: '🍹', count: 3 },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- PREMIUM STEAKS ---
  {
    id: 101,
    name: 'Premium Ribeye Steak',
    slug: 'premium-ribeye',
    price: 1200,
    origPrice: 1450,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    desc: '250g certified Angus beef ribeye, beautifully marbled and flame-grilled. Served with roasted garlic, mashed potatoes, and sautéed greens.',
    isChefSpecial: true,
    isPopular: true,
    variationGroups: [
      {
        id: 1,
        name: 'Steak Doneness',
        required: true,
        max_select: 1,
        options: [
          { id: 1001, name: 'Medium Rare (Recommended)', price: 0, raw: 0 },
          { id: 1002, name: 'Medium', price: 0, raw: 0 },
          { id: 1003, name: 'Rare', price: 0, raw: 0 },
          { id: 1004, name: 'Well Done', price: 0, raw: 0 },
        ],
      },
      {
        id: 2,
        name: 'Choice of Sauce',
        required: true,
        max_select: 1,
        options: [
          { id: 2001, name: 'Hickory Smoked Pepper Sauce', price: 0, raw: 0 },
          { id: 2002, name: 'Creamy Forest Mushroom Sauce', price: 0, raw: 0 },
          { id: 2003, name: 'Garlic Herb Butter Glaze', price: 0, raw: 0 },
        ],
      },
    ],
    addons: [
      { id: 3001, name: 'Extra Creamy Mashed Potatoes', price: 90, max_qty: 2 },
      { id: 3002, name: 'Sautéed Garlic Asparagus', price: 120, max_qty: 1 },
    ],
    fbt: [
      { id: 401, name: 'Smoke & Oak Mocktail', price: 250, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=150&auto=format&fit=crop&q=80' },
      { id: 301, name: 'Garlic Parmesan Truffle Fries', price: 250, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=150&auto=format&fit=crop&q=80' },
    ],
  },
  {
    id: 102,
    name: 'Signature T-Bone Steak',
    slug: 'signature-t-bone',
    price: 1450,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&auto=format&fit=crop&q=80',
    desc: '350g classic T-Bone cut featuring both tenderloin and strip loin. Grilled over open fire, served with house special pepper sauce.',
    variationGroups: [
      {
        id: 3,
        name: 'Steak Doneness',
        required: true,
        max_select: 1,
        options: [
          { id: 1005, name: 'Medium Rare', price: 0, raw: 0 },
          { id: 1006, name: 'Medium', price: 0, raw: 0 },
          { id: 1007, name: 'Well Done', price: 0, raw: 0 },
        ],
      },
      {
        id: 4,
        name: 'Choice of Sauce',
        required: true,
        max_select: 1,
        options: [
          { id: 2004, name: 'Hickory Smoked Pepper Sauce', price: 0, raw: 0 },
          { id: 2005, name: 'Creamy Forest Mushroom Sauce', price: 0, raw: 0 },
        ],
      },
    ],
  },
  {
    id: 103,
    name: 'Australian Wagyu Ribeye (Grade 6+)',
    slug: 'wagyu-ribeye',
    price: 2650,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80',
    desc: '250g ultra-premium Wagyu Ribeye with high marbling score. Melt-in-your-mouth tenderness, served with premium sea salt flakes and signature jus.',
    isChefSpecial: true,
    variationGroups: [
      {
        id: 5,
        name: 'Steak Doneness',
        required: true,
        max_select: 1,
        options: [
          { id: 1008, name: 'Medium Rare (Recommended)', price: 0, raw: 0 },
          { id: 1009, name: 'Medium', price: 0, raw: 0 },
          { id: 1010, name: 'Rare', price: 0, raw: 0 },
        ],
      },
    ],
  },
  {
    id: 104,
    name: 'Dry-Aged Tomahawk (800g)',
    slug: 'dry-aged-tomahawk',
    price: 3850,
    origPrice: 4200,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=600&auto=format&fit=crop&q=80',
    desc: 'Massive bone-in ribeye, dry-aged for 28 days in house wood cellars. Perfect for sharing (2 guests). Includes two sides of choice.',
    variationGroups: [
      {
        id: 6,
        name: 'Steak Doneness',
        required: true,
        max_select: 1,
        options: [
          { id: 1011, name: 'Medium Rare', price: 0, raw: 0 },
          { id: 1012, name: 'Medium', price: 0, raw: 0 },
        ],
      },
    ],
  },
  {
    id: 105,
    name: 'Garlic Butter Filet Mignon',
    slug: 'garlic-butter-tenderloin',
    price: 1100,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&auto=format&fit=crop&q=80',
    desc: '200g center-cut lean tenderloin filet. Exceptionally soft and tender, pan-seared and basted in rosemary-garlic butter.',
    variationGroups: [
      {
        id: 7,
        name: 'Steak Doneness',
        required: true,
        max_select: 1,
        options: [
          { id: 1013, name: 'Medium Rare (Recommended)', price: 0, raw: 0 },
          { id: 1014, name: 'Medium', price: 0, raw: 0 },
          { id: 1015, name: 'Rare', price: 0, raw: 0 },
          { id: 1016, name: 'Well Done', price: 0, raw: 0 },
        ],
      },
    ],
  },

  // --- GOURMET BURGERS ---
  {
    id: 201,
    name: 'Woodhouse Special Double Beef Burger',
    slug: 'woodhouse-special-burger',
    price: 399,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    desc: 'Flame-grilled double beef patties, crispy smoked beef bacon, double melted Cheddar, red onions, house barbecue aioli in a toasted brioche bun.',
    isPopular: true,
    addons: [
      { id: 3003, name: 'Extra Cheddar Cheese Slice', price: 50, max_qty: 2 },
      { id: 3004, name: 'Extra Beef Bacon Strips', price: 80, max_qty: 1 },
    ],
  },
  {
    id: 202,
    name: 'Wagyu Cheese Slider Platter',
    slug: 'wagyu-sliders',
    price: 550,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    desc: 'Three mini Wagyu beef slider patties topped with Swiss cheese, caramelized onions, pickles, and truffle mayo. Perfect for sharing.',
    isChefSpecial: true,
  },
  {
    id: 203,
    name: 'Crispy Nashville Hot Chicken Burger',
    slug: 'nashville-hot-chicken-burger',
    price: 350,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1627662236973-4f8259fa2441?w=600&auto=format&fit=crop&q=80',
    desc: 'Buttermilk fried chicken breast dipped in fiery Nashville cayenne glaze, topped with creamy dill pickles and coleslaw.',
  },

  // --- SIDES & STARTERS ---
  {
    id: 301,
    name: 'Garlic Parmesan Truffle Fries',
    slug: 'truffle-fries',
    price: 250,
    category: 'grill-sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
    desc: 'Crispy skin-on French fries tossed in white truffle oil, roasted garlic, fresh parsley, and grated Parmesan cheese.',
    isPopular: true,
  },
  {
    id: 302,
    name: 'Smoked Honey BBQ Wings (6pc)',
    slug: 'smoked-bbq-wings',
    price: 320,
    category: 'grill-sides',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&auto=format&fit=crop&q=80',
    desc: '6 pieces of slow-smoked chicken wings tossed in rich, sticky hickory-smoke honey BBQ sauce.',
  },
  {
    id: 303,
    name: 'Crispy Golden Calamari Rings',
    slug: 'crispy-calamari',
    price: 380,
    category: 'grill-sides',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80',
    desc: 'Panko-crusted fresh squid rings fried golden, served with spicy red chili tartar dip.',
  },
  {
    id: 304,
    name: 'Charcoal Grilled Asparagus',
    slug: 'grilled-asparagus',
    price: 220,
    category: 'grill-sides',
    image: 'https://images.unsplash.com/photo-1608797178974-15b35a61d121?w=600&auto=format&fit=crop&q=80',
    desc: 'Tender fresh asparagus stems seasoned with sea salt, cracked black pepper, and grilled over charcoal.',
  },

  // --- CRAFT DRINKS ---
  {
    id: 401,
    name: 'Smoke & Oak Craft Mocktail',
    slug: 'smoke-oak-mocktail',
    price: 250,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    desc: 'Signature mocktail infused with apple wood smoke, fresh pomegranate juice, lime cordial, and ginger beer.',
    isChefSpecial: true,
  },
  {
    id: 402,
    name: 'Minty Gold Flakes Mojito',
    slug: 'minty-gold-mojito',
    price: 190,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&auto=format&fit=crop&q=80',
    desc: 'Refreshing mojito with fresh lime wedges, muddled mint sprigs, sparkling soda, and a touch of edible gold flakes.',
  },
  {
    id: 403,
    name: 'Creamy Butterscotch Caramel Milkshake',
    slug: 'caramel-milkshake',
    price: 240,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80',
    desc: 'Thick rich vanilla bean milkshake blended with warm homemade butterscotch syrup, topped with whipped cream.',
  },
];
