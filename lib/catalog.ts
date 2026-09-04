import type { Category, Product } from "@/lib/types";

const img = (file: string) => `/products/${file}`;

export const categories: Category[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    slug: "school-uniforms",
    name: "School Uniforms",
    description:
      "Primary, high school, international, and preschool kits — polos, shirts, trousers, skirts, and blazers.",
    sort: 1,
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    slug: "sports",
    name: "Sports & PE",
    description: "House tees, jerseys, and dry-fit kits for matches and PE.",
    sort: 2,
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    slug: "college",
    name: "College Apparel",
    description: "Club tees, event shirts, and campus merch.",
    sort: 3,
  },
  {
    id: "44444444-4444-4444-8444-444444444444",
    slug: "accessories",
    name: "Accessories",
    description: "Ties, caps, bags, socks, belts, and ID lanyards.",
    sort: 4,
  },
];

function sizes(
  productId: string,
  prefix: string,
  extras: { name: string; sku: string; delta: number }[] = []
): Product["variants"] {
  const base = [
    { name: "6–8 yrs", sku: `${prefix}-68`, delta: 0 },
    { name: "9–11 yrs", sku: `${prefix}-911`, delta: 80 },
    { name: "12–14 yrs", sku: `${prefix}-1214`, delta: 160 },
    { name: "XS–S adult", sku: `${prefix}-XS`, delta: 220 },
  ];
  const n = productId.slice(-2);
  const list = extras.length ? extras : base;
  return list.map((v, i) => ({
    id: `v00000${n}-0000-4000-8000-${String(i + 1).padStart(12, "0")}`,
    productId,
    sku: v.sku,
    name: v.name,
    priceDelta: v.delta,
    attributes: { size: v.name },
    stock: 24 - i * 3,
  }));
}

export const products: Product[] = [
  {
    id: "a0000001-0000-4000-8000-000000000001",
    slug: "polo-tshirt",
    name: "School Polo T-Shirt",
    description:
      "Greenfield Academy polo in navy cotton pique (220 GSM) with sky-blue collar tipping and an embroidered school crest. Breathable, moisture-wicking, and built for everyday wear from primary through senior secondary.",
    categoryId: "11111111-1111-4111-8111-111111111111",
    price: 890,
    compareAt: null,
    heroImage: img("polo.png"),
    gallery: [img("polo.png")],
    specs: {
      Fabric: "Cotton pique 220 GSM",
      Branding: "Embroidery, screen print, heat transfer",
      Features: "Breathable, moisture-wicking, shape retention",
      Sample: "Greenfield Academy",
    },
    featured: true,
    variants: sizes("a0000001-0000-4000-8000-000000000001", "POLO"),
  },
  {
    id: "a0000001-0000-4000-8000-000000000002",
    slug: "formal-shirt",
    name: "Formal School Shirt",
    description:
      "Crisp poplin formal shirt with chest embroidery and woven neck labels. Easy-iron, breathable, and tailored for assemblies and school days that need a smarter look.",
    categoryId: "11111111-1111-4111-8111-111111111111",
    price: 1190,
    compareAt: null,
    heroImage: img("shirt.png"),
    gallery: [img("shirt.png")],
    specs: {
      Fabric: "Poplin / oxford / poly-cotton",
      Branding: "Chest embroidery, woven labels, name embroidery",
      Features: "Crisp appearance, easy iron, durable",
    },
    featured: true,
    variants: sizes("a0000001-0000-4000-8000-000000000002", "SHIRT"),
  },
  {
    id: "a0000001-0000-4000-8000-000000000003",
    slug: "school-trousers",
    name: "School Trousers",
    description:
      "Wrinkle-resistant poly-viscose trousers with a comfortable school fit, custom buttons, and embroidered branding options. Built to hold shape through the term.",
    categoryId: "11111111-1111-4111-8111-111111111111",
    price: 1490,
    compareAt: null,
    heroImage: img("trousers.png"),
    gallery: [img("trousers.png")],
    specs: {
      Fabric: "Poly viscose / cotton twill / stretch twill",
      Branding: "Woven labels, embroidered logo, custom buttons",
      Features: "Wrinkle resistant, durable, shape retention",
    },
    featured: false,
    variants: sizes("a0000001-0000-4000-8000-000000000003", "TRSR"),
  },
  {
    id: "a0000001-0000-4000-8000-000000000004",
    slug: "school-skirt",
    name: "School Skirt",
    description:
      "Poly-viscose skirt with excellent drape, wrinkle resistance, and an optional embroidered crest. Custom waistband labels available for house or school identity.",
    categoryId: "11111111-1111-4111-8111-111111111111",
    price: 1290,
    compareAt: null,
    heroImage: img("skirt.png"),
    gallery: [img("skirt.png")],
    specs: {
      Fabric: "Poly viscose / polyester / stretch blend",
      Branding: "Woven labels, embroidered crest",
      Features: "Excellent drape, wrinkle resistant",
    },
    featured: false,
    variants: sizes("a0000001-0000-4000-8000-000000000004", "SKRT"),
  },
  {
    id: "a0000001-0000-4000-8000-000000000005",
    slug: "school-blazer",
    name: "School Blazer",
    description:
      "Structured navy blazer in premium poly-viscose suiting, with embroidered crest, metal buttons, satin labels, and a smooth inner lining. The formal piece of a complete school kit.",
    categoryId: "11111111-1111-4111-8111-111111111111",
    price: 3490,
    compareAt: null,
    heroImage: img("blazer.png"),
    gallery: [img("blazer.png")],
    specs: {
      Fabric: "Polyester viscose / wool blend / premium suiting",
      Branding: "Embroidered crest, woven labels, metal buttons",
      Features: "Structured look, premium finish, long-lasting",
    },
    featured: true,
    variants: sizes("a0000001-0000-4000-8000-000000000005", "BLZR"),
  },
  {
    id: "a0000001-0000-4000-8000-000000000006",
    slug: "school-sweater",
    name: "School Sweater",
    description:
      "Warm, lightweight knit sweater in acrylic-cotton or merino blend. Knit-in or embroidered school logo, designed for winter assemblies without the bulk.",
    categoryId: "11111111-1111-4111-8111-111111111111",
    price: 1690,
    compareAt: null,
    heroImage: img("sweater.png"),
    gallery: [img("sweater.png")],
    specs: {
      Fabric: "Acrylic cotton knit / wool blend / merino",
      Branding: "Knit logo, embroidery, woven labels",
      Features: "Warm, lightweight, soft, durable",
    },
    featured: false,
    variants: sizes("a0000001-0000-4000-8000-000000000006", "SWTR"),
  },
  {
    id: "a0000001-0000-4000-8000-000000000007",
    slug: "school-hoodie",
    name: "School Hoodie",
    description:
      "Navy cotton-fleece hoodie with embroidered crest, puff-print sleeve branding, and ribbed cuffs. Warm enough for winter, easy enough for everyday campus wear.",
    categoryId: "11111111-1111-4111-8111-111111111111",
    price: 1890,
    compareAt: 2190,
    heroImage: img("hoodie.png"),
    gallery: [img("hoodie.png")],
    specs: {
      Fabric: "Cotton fleece / poly-cotton fleece / French terry",
      Branding: "Embroidery, puff print, DTF, heat transfer",
      Features: "Warm, breathable, kangaroo pocket",
    },
    featured: true,
    variants: sizes("a0000001-0000-4000-8000-000000000007", "HOOD"),
  },
  {
    id: "a0000001-0000-4000-8000-000000000008",
    slug: "house-tshirt",
    name: "House T-Shirt",
    description:
      "Colour-coded house tee in polyester dry-fit with embroidered crest and contrast shoulder piping. Built for sports days, events, and house activities.",
    categoryId: "22222222-2222-4222-8222-222222222222",
    price: 690,
    compareAt: null,
    heroImage: img("house-tee.png"),
    gallery: [img("house-tee.png")],
    specs: {
      Fabric: "Polyester dry-fit / cotton jersey / poly-cotton",
      Branding: "Sublimation, embroidery, screen print",
      Features: "Colour coding, breathable, lightweight",
    },
    featured: true,
    variants: [
      {
        id: "v0000008-0000-4000-8000-000000000001",
        productId: "a0000001-0000-4000-8000-000000000008",
        sku: "HOUSE-RED",
        name: "Red house",
        priceDelta: 0,
        attributes: { house: "Red" },
        stock: 40,
      },
      {
        id: "v0000008-0000-4000-8000-000000000002",
        productId: "a0000001-0000-4000-8000-000000000008",
        sku: "HOUSE-BLU",
        name: "Blue house",
        priceDelta: 0,
        attributes: { house: "Blue" },
        stock: 36,
      },
      {
        id: "v0000008-0000-4000-8000-000000000003",
        productId: "a0000001-0000-4000-8000-000000000008",
        sku: "HOUSE-GRN",
        name: "Green house",
        priceDelta: 0,
        attributes: { house: "Green" },
        stock: 32,
      },
      {
        id: "v0000008-0000-4000-8000-000000000004",
        productId: "a0000001-0000-4000-8000-000000000008",
        sku: "HOUSE-YLW",
        name: "Yellow house",
        priceDelta: 0,
        attributes: { house: "Yellow" },
        stock: 28,
      },
    ],
  },
  {
    id: "a0000001-0000-4000-8000-000000000009",
    slug: "sports-uniform",
    name: "Sports Uniform Kit",
    description:
      "Navy-and-white micro-polyester PE kit with heat-transfer crest, vinyl numbers, and contrast side panels. Moisture-wicking, quick-dry, and stretchable for all school sports.",
    categoryId: "22222222-2222-4222-8222-222222222222",
    price: 2190,
    compareAt: null,
    heroImage: img("sports.png"),
    gallery: [img("sports.png")],
    specs: {
      Fabric: "Micro polyester / dry-fit / mesh / spandex blend",
      Branding: "Heat transfer, sublimation, vinyl numbers",
      Features: "Moisture-wicking, quick dry, lightweight, stretchable",
    },
    featured: true,
    variants: sizes("a0000001-0000-4000-8000-000000000009", "SPORT"),
  },
  {
    id: "a0000001-0000-4000-8000-000000000010",
    slug: "club-tshirt",
    name: "College Club T-Shirt",
    description:
      "Premium sports-inspired college tee in dark forest green with white ringer collar and cuffs. Varsity chest lettering, official crest, and textured polyester jersey — as shown for XYZ College in the Slyde catalogue.",
    categoryId: "33333333-3333-4333-8333-333333333333",
    price: 990,
    compareAt: null,
    heroImage: img("club-tee.png"),
    gallery: [img("club-tee.png")],
    specs: {
      Fabric: "Textured polyester jersey",
      Color: "Dark forest green with white cuffs",
      Fit: "Athletic, football-jersey inspired",
    },
    featured: true,
    variants: sizes("a0000001-0000-4000-8000-000000000010", "CLUB", [
      { name: "S", sku: "CLUB-S", delta: 0 },
      { name: "M", sku: "CLUB-M", delta: 0 },
      { name: "L", sku: "CLUB-L", delta: 0 },
      { name: "XL", sku: "CLUB-XL", delta: 80 },
    ]),
  },
  {
    id: "a0000001-0000-4000-8000-000000000011",
    slug: "performance-tee",
    name: "Performance Round-Neck Tee",
    description:
      "Sublimated round-neck sports tee with championship numbering and a breathable athletic cut. Shown in the catalogue as SM Sportswear — ready to rebrand for any school team.",
    categoryId: "22222222-2222-4222-8222-222222222222",
    price: 850,
    compareAt: null,
    heroImage: img("jersey-tee.png"),
    gallery: [img("jersey-tee.png")],
    specs: {
      Fabric: "Performance polyester",
      Branding: "Sublimation, heat transfer",
      Features: "Lightweight, breathable, full-colour print",
    },
    featured: false,
    variants: sizes("a0000001-0000-4000-8000-000000000011", "PERF", [
      { name: "S", sku: "PERF-S", delta: 0 },
      { name: "M", sku: "PERF-M", delta: 0 },
      { name: "L", sku: "PERF-L", delta: 0 },
      { name: "XL", sku: "PERF-XL", delta: 60 },
    ]),
  },
  {
    id: "a0000001-0000-4000-8000-000000000012",
    slug: "school-tie",
    name: "School Tie",
    description:
      "Polyester-satin school tie with wrinkle-resistant, colourfast finish. Woven logo, embroidery, or jacquard weaving for house stripes and crests.",
    categoryId: "44444444-4444-4444-8444-444444444444",
    price: 490,
    compareAt: null,
    heroImage: img("tie.png"),
    gallery: [img("tie.png")],
    specs: {
      Fabric: "Polyester satin / microfiber / silk blend",
      Branding: "Woven logo, embroidery, jacquard",
      Features: "Elegant finish, wrinkle resistant, colourfast",
    },
    featured: false,
    variants: [
      {
        id: "v0000012-0000-4000-8000-000000000001",
        productId: "a0000001-0000-4000-8000-000000000012",
        sku: "TIE-NVY",
        name: "Navy stripe",
        priceDelta: 0,
        attributes: { color: "Navy" },
        stock: 50,
      },
      {
        id: "v0000012-0000-4000-8000-000000000002",
        productId: "a0000001-0000-4000-8000-000000000012",
        sku: "TIE-MAR",
        name: "Maroon stripe",
        priceDelta: 0,
        attributes: { color: "Maroon" },
        stock: 40,
      },
    ],
  },
  {
    id: "a0000001-0000-4000-8000-000000000013",
    slug: "school-cap",
    name: "School Cap",
    description:
      "Cotton-twill school cap with 3D or flat embroidery. Breathable, durable, and ready for crests, house colours, or sports-day marks.",
    categoryId: "44444444-4444-4444-8444-444444444444",
    price: 590,
    compareAt: null,
    heroImage: img("cap.png"),
    gallery: [img("cap.png")],
    specs: {
      Fabric: "Cotton twill / brushed cotton / polyester microfiber",
      Branding: "3D embroidery, screen print, woven patch",
      Features: "Comfortable, breathable, durable",
    },
    featured: false,
    variants: [
      {
        id: "v0000013-0000-4000-8000-000000000001",
        productId: "a0000001-0000-4000-8000-000000000013",
        sku: "CAP-NVY",
        name: "Navy",
        priceDelta: 0,
        attributes: { color: "Navy" },
        stock: 44,
      },
    ],
  },
  {
    id: "a0000001-0000-4000-8000-000000000014",
    slug: "school-bag",
    name: "School Bag",
    description:
      "600D / 1000D polyester school bag — water-resistant, tear-resistant, and light enough for daily commute. Crest, rubber patch, or reflective print available.",
    categoryId: "44444444-4444-4444-8444-444444444444",
    price: 1590,
    compareAt: null,
    heroImage: img("bag.png"),
    gallery: [img("bag.png")],
    specs: {
      Fabric: "600D / 1000D polyester / nylon ripstop",
      Branding: "Embroidery, rubber patch, reflective print",
      Features: "Water resistant, tear resistant, lightweight",
    },
    featured: false,
    variants: [
      {
        id: "v0000014-0000-4000-8000-000000000001",
        productId: "a0000001-0000-4000-8000-000000000014",
        sku: "BAG-NVY",
        name: "Navy",
        priceDelta: 0,
        attributes: { color: "Navy" },
        stock: 22,
      },
    ],
  },
];

export function withCategories(list: Product[] = products): Product[] {
  const map = new Map(categories.map((c) => [c.id, c]));
  return list.map((p) => ({ ...p, category: map.get(p.categoryId) }));
}

export function getLocalCategories() {
  return categories;
}

export function getLocalProducts() {
  return withCategories();
}

export function getLocalProduct(slug: string) {
  return withCategories().find((p) => p.slug === slug) ?? null;
}
