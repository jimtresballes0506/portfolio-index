export const CATEGORIES = [
  { id: 'all', label: 'All Menu', icon: 'Sparkles' },
  { id: 'espresso', label: 'Signature Espresso', icon: 'Coffee' },
  { id: 'cold-brew', label: 'Cold Brew & Iced', icon: 'GlassWater' },
  { id: 'pour-over', label: 'Single Origin Pour Over', icon: 'Flame' },
  { id: 'matcha-tea', label: 'Matcha & Botanicals', icon: 'Leaf' },
  { id: 'pastries', label: 'Artisanal Bakery', icon: 'Croissant' },
];

export const CUSTOMIZATION_OPTIONS = {
  sizes: [
    { id: 'regular', label: 'Regular (12 oz)', priceDelta: 0 },
    { id: 'large', label: 'Large (16 oz)', priceDelta: 0.95 },
  ],
  milks: [
    { id: 'whole', label: 'Organic Whole Milk', priceDelta: 0 },
    { id: 'oat', label: 'Barista Oat Milk', priceDelta: 0.75 },
    { id: 'almond', label: 'Roasted Almond Milk', priceDelta: 0.75 },
    { id: 'none', label: 'Black / No Milk', priceDelta: 0 },
  ],
  sweetness: [
    { id: '100', label: 'Standard Sweet (100%)' },
    { id: '50', label: 'Half Sweet (50%)' },
    { id: '0', label: 'Unsweetened (0%)' },
  ],
  extras: [
    { id: 'none', label: 'Standard Pull', priceDelta: 0 },
    { id: 'extra-shot', label: '+1 Extra Espresso Shot', priceDelta: 1.25 },
    { id: 'vanilla-bean', label: '+ Madagascar Vanilla Syrup', priceDelta: 0.65 },
  ],
};

export const MENU_ITEMS = [
  {
    id: 'brown-sugar-oat-cortado',
    name: 'Spiced Brown Sugar Oat Cortado',
    category: 'espresso',
    price: 5.75,
    calories: 140,
    rating: 4.9,
    reviews: 128,
    badge: 'Bestseller',
    dietary: ['Dairy-Free', 'Vegan'],
    tastingNotes: ['Caramelized Muscovado', 'Ceylon Cinnamon', 'Velvety Espresso'],
    description:
      'Double ristretto pulled from our Ethiopian-Colombian house blend, shaken over raw muscovado sugar and finished with micro-steamed barista oat milk.',
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
    customizable: true,
    defaultMilk: 'oat',
  },
  {
    id: 'velvet-flat-white',
    name: 'Aura Velvet Flat White',
    category: 'espresso',
    price: 5.25,
    calories: 120,
    rating: 4.8,
    reviews: 94,
    badge: 'House Classic',
    dietary: ['Gluten-Free'],
    tastingNotes: ['Roasted Hazelnut', 'Dark Cocoa', 'Silky Microfoam'],
    description:
      'Precision double espresso layered under glossy, fine-textured steamed milk for a rich espresso-forward balance.',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80',
    customizable: true,
    defaultMilk: 'whole',
  },
  {
    id: 'salted-maple-latte',
    name: 'Smoked Sea Salt & Maple Latte',
    category: 'espresso',
    price: 6.25,
    calories: 210,
    rating: 4.9,
    reviews: 162,
    badge: 'Seasonal',
    dietary: ['Gluten-Free'],
    tastingNotes: ['Vermont Grade-A Maple', 'Flaky Sea Salt', 'Toasted Pecan'],
    description:
      'Warm organic maple reduction paired with our full-bodied espresso and topped with a pinch of Maldon smoked sea salt.',
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
    customizable: true,
    defaultMilk: 'oat',
  },
  {
    id: 'nitro-vanilla-sweet-cream',
    name: '24-Hour Vanilla Sweet Cream Cold Brew',
    category: 'cold-brew',
    price: 5.95,
    calories: 135,
    rating: 4.9,
    reviews: 215,
    badge: 'Bestseller',
    dietary: ['Gluten-Free'],
    tastingNotes: ['Madagascar Vanilla Pod', 'Cacao Nib', 'Crisp Finish'],
    description:
      'Coarse-ground Guatemalan beans steeped cold for 24 hours, topped with a cascading float of house-whipped Madagascar vanilla cream.',
    image:
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80',
    customizable: true,
    defaultMilk: 'whole',
  },
  {
    id: 'yuzu-espresso-tonic',
    name: 'Yuzu Blossom Espresso Tonic',
    category: 'cold-brew',
    price: 6.5,
    calories: 95,
    rating: 4.7,
    reviews: 73,
    badge: 'Barista Pick',
    dietary: ['Dairy-Free', 'Vegan'],
    tastingNotes: ['Japanese Yuzu Citrus', 'Botanical Quinine', 'Bright Acidity'],
    description:
      'Chilled single-origin Kenyan espresso poured gently over artisanal botanical tonic water and a ribbon of yuzu citrus reduction.',
    image:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
    customizable: false,
    defaultMilk: 'none',
  },
  {
    id: 'ethiopia-yirgacheffe-v60',
    name: 'Ethiopia Yirgacheffe Halo Beriti (V60)',
    category: 'pour-over',
    price: 6.75,
    calories: 5,
    rating: 5.0,
    reviews: 88,
    badge: 'Single Origin',
    dietary: ['Dairy-Free', 'Vegan', 'Sugar-Free'],
    tastingNotes: ['Jasmine Blossom', 'White Peach', 'Bergamot Tea'],
    description:
      'Hand-poured to order using a Hario V60. Washed-process heirloom beans grown at 2,100m elevation with floral clarity and tea-like sweetness.',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    customizable: false,
    defaultMilk: 'none',
  },
  {
    id: 'colombia-pink-bourbon-chemex',
    name: 'Colombia Huila Pink Bourbon (Chemex)',
    category: 'pour-over',
    price: 7.0,
    calories: 5,
    rating: 4.9,
    reviews: 64,
    badge: 'Micro-Lot',
    dietary: ['Dairy-Free', 'Vegan', 'Sugar-Free'],
    tastingNotes: ['Honeycrisp Apple', 'Panela Cane', 'Red Currant'],
    description:
      'Honey-processed rare Pink Bourbon varietal brewed clean through heavy bonded Chemex filters for a silky, jewel-bright cup.',
    image:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
    customizable: false,
    defaultMilk: 'none',
  },
  {
    id: 'uji-ceremonial-matcha-latte',
    name: 'Uji First-Harvest Ceremonial Matcha',
    category: 'matcha-tea',
    price: 6.5,
    calories: 130,
    rating: 4.9,
    reviews: 184,
    badge: 'Bestseller',
    dietary: ['Dairy-Free', 'Vegan'],
    tastingNotes: ['Umami Sweet', 'Stone-Milled Tencha', 'Creamy Oat'],
    description:
      'Shade-grown first-flush matcha from Uji, Kyoto, hand-whisked with bamboo chasen to a jade foam and poured over oat milk.',
    image:
      'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=80',
    customizable: true,
    defaultMilk: 'oat',
  },
  {
    id: 'cardamom-rose-pistachio-croissant',
    name: 'Pistachio & Cardamom Twice-Baked Croissant',
    category: 'pastries',
    price: 5.85,
    calories: 380,
    rating: 4.9,
    reviews: 147,
    badge: 'Baked Fresh 7AM',
    dietary: ['Vegetarian'],
    tastingNotes: ['Roasted Bronte Pistachio', 'French Cultured Butter', 'Green Cardamom'],
    description:
      '72-hour laminated sourdough croissant filled with Sicilian pistachio frangipane, dusted with crushed nuts and cardamom sugar.',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
    customizable: false,
    defaultMilk: 'none',
  },
  {
    id: 'burnt-basque-espresso-cheesecake',
    name: 'Espresso Bean Basque Cheesecake Slice',
    category: 'pastries',
    price: 6.95,
    calories: 420,
    rating: 4.8,
    reviews: 91,
    badge: 'Chef Special',
    dietary: ['Vegetarian', 'Gluten-Free'],
    tastingNotes: ['Caramelized Crust', 'Mascarpone Custard', 'Espresso Ganache'],
    description:
      'San Sebastián-style crustless cheesecake infused with cold-pressed espresso oil, baked at high heat for a molten, creamy center.',
    image:
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80',
    customizable: false,
    defaultMilk: 'none',
  },
];

export const ROAST_PROFILES = [
  {
    id: 'light',
    title: '01 · Filter & Floral Roast',
    origin: 'Yirgacheffe, Ethiopia (2,100m)',
    process: 'Washed Heirloom',
    notes: 'Jasmine • White Peach • Bergamot',
    acidity: 90,
    body: 55,
    sweetness: 85,
  },
  {
    id: 'medium',
    title: '02 · Aura House Omni-Roast',
    origin: 'Huila, Colombia & Antigua, Guatemala',
    process: 'Honey & Washed Blend',
    notes: 'Muscovado • Roasted Hazelnut • Meyer Lemon',
    acidity: 70,
    body: 80,
    sweetness: 92,
  },
  {
    id: 'dark',
    title: '03 · Velvet Alchemy Espresso',
    origin: 'Cerrado Mineiro, Brazil & Sumatra',
    process: 'Natural & Wet-Hulled',
    notes: '70% Dark Cacao • Molasses • Toasted Almond',
    acidity: 40,
    body: 95,
    sweetness: 80,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Elena Rostova',
    role: 'Specialty Coffee Judge & Food Writer',
    quote:
      'Their Ethiopia Halo Beriti V60 is one of the cleanest, most aromatic cups in the city—and being able to pre-order a custom oat cortado before my morning commute is a lifesaver.',
    favorite: 'Ethiopia Yirgacheffe V60',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Product Designer & Daily Regular',
    quote:
      'The Spiced Brown Sugar Oat Cortado paired with the twice-baked pistachio croissant is unmatched. The online quick-order system always has my drink ready right on the pickup bar.',
    favorite: 'Brown Sugar Oat Cortado',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sora Takahashi',
    role: 'Architectural Photographer',
    quote:
      'Warm minimalist interiors, sunlit oak tables, and genuinely ethical direct-trade beans. You can taste the freshness of their 48-hour small-batch roasting.',
    favorite: 'Uji Ceremonial Matcha',
    rating: 5,
  },
];
