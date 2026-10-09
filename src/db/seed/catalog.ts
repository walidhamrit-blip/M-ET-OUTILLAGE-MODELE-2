/** Données de démonstration : rayons, marques, diaporama et magasins (AR principal, EN secondaire). */

export const seedCategories = [
  { id: 1, name: "أدوات كهربائية", slug: "outillage-electrique", icon: "Drill", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=70&auto=format&fit=crop", order: 1, featured: true, productCount: 1240, subcategories: ["مثاقب ومسننات", "مطاحن", "مناشير دائرية", "مثاقب خرسانة", "مصقلات", "حقائب أدوات"], i18n: { en: { name: "Power Tools", subcategories: ["Drills & drivers", "Grinders", "Circular saws", "Rotary hammers", "Sanders", "Kits & cases"] } } },
  { id: 2, name: "أدوات يدوية", slug: "outillage-a-main", icon: "Hammer", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=70&auto=format&fit=crop", order: 2, featured: true, productCount: 860, subcategories: ["مفاتيح وقبضات", "مطارق", "مفكات", "كماشات", "مناشير يدوية", "صناديق أدوات"], i18n: { en: { name: "Hand Tools", subcategories: ["Wrenches & sockets", "Hammers", "Screwdrivers", "Pliers", "Hand saws", "Tool boxes"] } } },
  { id: 3, name: "مواد البناء", slug: "materiaux-construction", icon: "Package", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=70&auto=format&fit=crop", order: 3, featured: true, productCount: 2100, subcategories: ["أسمنت وخرسانة", "حديد تسليح", "طوب وبلوك", "جص ومعاجين", "رمل وحصى", "خشب شدّ"], i18n: { en: { name: "Building Materials", subcategories: ["Cement & concrete", "Rebar", "Bricks & blocks", "Plaster & fillers", "Sand & gravel", "Formwork timber"] } } },
  { id: 4, name: "دهانات ومستلزمات", slug: "peinture-droguerie", icon: "PaintBucket", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=70&auto=format&fit=crop", order: 4, featured: true, productCount: 640, subcategories: ["دهان داخلي", "دهان خارجي", "معاجين", "ورنيش وحماية الخشب", "فرش وأسطوانات"], i18n: { en: { name: "Paint & Hardware", subcategories: ["Interior paint", "Exterior paint", "Fillers", "Varnish & wood care", "Brushes & rollers"] } } },
  { id: 5, name: "سباكة وصحيات", slug: "plomberie-sanitaire", icon: "Droplets", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=70&auto=format&fit=crop", order: 5, featured: true, productCount: 980, subcategories: ["أنابيب ووصلات", "حنفيات وخلاطات", "مراحيض وأحواض", "سخانات مياه", "مضخات مياه"], i18n: { en: { name: "Plumbing & Sanitary", subcategories: ["Pipes & fittings", "Taps & mixers", "WCs & basins", "Water heaters", "Water pumps"] } } },
  { id: 6, name: "كهرباء وإنارة", slug: "electricite-eclairage", icon: "Plug", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=70&auto=format&fit=crop", order: 6, featured: true, productCount: 1120, subcategories: ["كابلات وأسلاك", "قواطع", "مفاتيح وقوابس", "إنارة LED", "لوحات كهربائية"], i18n: { en: { name: "Electrical & Lighting", subcategories: ["Cables & wires", "Circuit breakers", "Switches & sockets", "LED lighting", "Distribution boards"] } } },
  { id: 7, name: "تكييف وتدفئة", slug: "climatisation", icon: "Snowflake", image: "https://images.unsplash.com/photo-1631545806609-24040d63f86a?w=600&q=70&auto=format&fit=crop", order: 7, featured: true, productCount: 320, subcategories: ["مكيفات", "سخانات شمسية", "مراوح", "مزيلات الرطوبة"], i18n: { en: { name: "Air Conditioning & Heating", subcategories: ["Air conditioners", "Solar water heaters", "Fans", "Dehumidifiers"] } } },
  { id: 8, name: "عتاد ومسامير", slug: "quincaillerie", icon: "Wrench", image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=600&q=70&auto=format&fit=crop", order: 8, featured: false, productCount: 1540, subcategories: ["براغي ومسامير", "أقفال", "مفصلات", "مثبتات", "لواصق وسيليكون"], i18n: { en: { name: "Hardware & Fasteners", subcategories: ["Screws & bolts", "Locks", "Hinges", "Wall plugs", "Adhesives & silicone"] } } },
  { id: 9, name: "مولدات الكهرباء", slug: "groupes-electrogenes", icon: "Zap", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=70&auto=format&fit=crop", order: 9, featured: true, productCount: 180, subcategories: ["مولدات بنزين", "مولدات ديزل", "ضواغط هواء", "أجهزة لحام"], i18n: { en: { name: "Generators", subcategories: ["Petrol generators", "Diesel generators", "Air compressors", "Welding machines"] } } },
  { id: 10, name: "بلاط وتكسية", slug: "carrelage-revetement", icon: "LayoutGrid", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=70&auto=format&fit=crop", order: 10, featured: false, productCount: 720, subcategories: ["بلاط أرضي", "بلاط جداري", "باركيه لامينيت", "حواف الجدران", "لاصق البلاط"], i18n: { en: { name: "Tiles & Flooring", subcategories: ["Floor tiles", "Wall tiles", "Laminate flooring", "Skirting boards", "Tile adhesive"] } } },
  { id: 11, name: "حديقة وخارجي", slug: "jardin-exterieur", icon: "LayoutGrid", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=70&auto=format&fit=crop", order: 11, featured: false, productCount: 410, subcategories: ["جزازات العشب", "مقصات الأسوار", "الري", "أثاث حدائق"], i18n: { en: { name: "Garden & Outdoor", subcategories: ["Lawn mowers", "Hedge trimmers", "Irrigation", "Garden furniture"] } } },
  { id: 12, name: "السلامة والوقاية", slug: "securite", icon: "ShieldCheck", image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&q=70&auto=format&fit=crop", order: 12, featured: false, productCount: 290, subcategories: ["خوذات", "قفازات", "أحذية أمان", "نظارات", "طفايات حريق"], i18n: { en: { name: "Safety & Protection", subcategories: ["Helmets", "Gloves", "Safety shoes", "Goggles", "Fire extinguishers"] } } },
];

export const seedBrands = [
  { id: 1, name: "Bosch", slug: "bosch", color: "#ea0016", featured: true },
  { id: 2, name: "Makita", slug: "makita", color: "#00838f", featured: true },
  { id: 3, name: "DeWalt", slug: "dewalt", color: "#febd17", featured: true },
  { id: 4, name: "Stanley", slug: "stanley", color: "#111111", featured: true },
  { id: 5, name: "Total", slug: "total", color: "#c8102e", featured: true },
  { id: 6, name: "Ingco", slug: "ingco", color: "#f5a800", featured: true },
  { id: 7, name: "Sika", slug: "sika", color: "#c4001a", featured: true },
  { id: 8, name: "Legrand", slug: "legrand", color: "#e2001a", featured: true },
  { id: 9, name: "Schneider", slug: "schneider", color: "#3dcdbf", featured: true },
  { id: 10, name: "Knauf", slug: "knauf", color: "#0072bc", featured: true },
  { id: 11, name: "Jotun", slug: "jotun", color: "#003da5", featured: true },
  { id: 12, name: "Coral", slug: "coral", color: "#e30613", featured: true },
];

export const seedSlides = [
  { title: "تصفية كبرى للأدوات", subtitle: "خصم يصل إلى 40% على Bosch وMakita وTotal وIngco", link: "/categorie/outillage-electrique", bgColor: "#1a2a3a", order: 1, active: true, i18n: { en: { title: "BIG TOOL CLEARANCE", subtitle: "Up to -40% on Bosch, Makita, Total & Ingco" } } },
  { title: "الأسمنت ومواد البناء بأسعار الورشات", subtitle: "توصيل بالشاحنة خلال 24 ساعة في طرابلس", link: "/categorie/materiaux-construction", bgColor: "#e30613", order: 2, active: true, i18n: { en: { title: "CEMENT & BUILDING MATERIALS AT SITE PRICES", subtitle: "Truck delivery within 24h across Tripoli" } } },
  { title: "مكيفات 12000 وحدة حرارية", subtitle: "ابتداءً من 1899 د.ل — التركيب مشمول", link: "/categorie/climatisation", bgColor: "#0e7490", order: 3, active: true, i18n: { en: { title: "12000 BTU AIR CONDITIONERS", subtitle: "From 1,899 LYD — installation included" } } },
  { title: "مولدات الكهرباء", subtitle: "بنزين وديزل — ضمان سنتين", link: "/categorie/groupes-electrogenes", bgColor: "#3f3f46", order: 4, active: true, i18n: { en: { title: "GENERATORS", subtitle: "Petrol & diesel — 2-year warranty" } } },
  { title: "الدهانات والترميم", subtitle: "Jotun وCoral وSika — كل ما تحتاجه للترميم", link: "/categorie/peinture-droguerie", bgColor: "#b45309", order: 5, active: true, i18n: { en: { title: "PAINT & RENOVATION", subtitle: "Jotun, Coral, Sika — everything to renovate" } } },
];

export const seedStores = [
  {
    name: "TRIPO-TECH Janzour", address: "طريق الساحل، كم 12، جنزور", city: "طرابلس", phone: "+218 21 444 44 01", hours: "الإثنين - السبت: 8:30 - 19:30", tag: "المعرض الرئيسي — 2500 م²",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=70&auto=format&fit=crop", order: 1,
    i18n: { en: { address: "Coastal Road, Km 12, Janzour", city: "Tripoli", hours: "Mon - Sat: 8:30 - 19:30", tag: "Flagship — 2,500 m²" } },
  },
  {
    name: "TRIPO-TECH Ain Zara", address: "طريق المطار، كم 7، عين زارة", city: "طرابلس", phone: "+218 21 444 44 02", hours: "الإثنين - السبت: 8:30 - 19:30", tag: "فرع جديد",
    image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&q=70&auto=format&fit=crop", order: 2,
    i18n: { en: { address: "Airport Road, Km 7, Ain Zara", city: "Tripoli", hours: "Mon - Sat: 8:30 - 19:30", tag: "New store" } },
  },
  {
    name: "TRIPO-TECH Tajoura", address: "المنطقة الصناعية، تاجوراء", city: "طرابلس", phone: "+218 21 444 44 03", hours: "الإثنين - السبت: 8:30 - 19:00", tag: "مستودع للمحترفين والجملة",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=70&auto=format&fit=crop", order: 3,
    i18n: { en: { address: "Industrial zone, Tajoura", city: "Tripoli", hours: "Mon - Sat: 8:30 - 19:00", tag: "Pro & wholesale depot" } },
  },
  {
    name: "TRIPO-TECH Gargaresh", address: "الشارع الرئيسي، قرقارش", city: "طرابلس", phone: "+218 21 444 44 04", hours: "الإثنين - السبت: 9:00 - 19:30", tag: "وسط المدينة",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=70&auto=format&fit=crop", order: 4,
    i18n: { en: { address: "Main Street, Gargaresh", city: "Tripoli", hours: "Mon - Sat: 9:00 - 19:30", tag: "City centre" } },
  },
];
