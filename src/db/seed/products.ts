/**
 * Données de démonstration : produits (généré à partir de l'ancien seed, enrichi AR/EN).
 * Les colonnes de base contiennent l'arabe ; i18n.en contient l'anglais.
 */
import type { SeedProduct } from "./types";

export const seedProducts: SeedProduct[] = [
  {
    "slug": "perceuse-bosch-gsb-180",
    "name": "مثقاب لولبي Bosch GSB 180-LI 18 فولت + بطاريتان",
    "reference": "BOC-GSB180",
    "shortDescription": "18 فولت • بطاريتان • حقيبة احترافية",
    "description": "مثقاب لولبي بالصدم من Bosch Professional بجهد 18 فولت وعزم 38 نيوتن متر وظرف تثبيت 13 ملم، مع بطاريتين 2.0 أمبير وشاحن وحقيبة. مثالي للورشات.",
    "price": "845.00",
    "oldPrice": "1095.00",
    "categoryId": 1,
    "brandId": 1,
    "image": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=70&auto=format&fit=crop",
    "stock": 24,
    "rating": "4.8",
    "reviewsCount": 132,
    "badge": "الأكثر مبيعاً",
    "discount": 23,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "Bosch GSB 180-LI 18V Drill Driver + 2 Batteries",
        "shortDescription": "18V • 2 batteries • Pro case",
        "description": "Bosch Professional 18V hammer drill/driver, 38 Nm torque, 13 mm chuck, with two 2.0Ah batteries, charger and case. Ideal for job sites.",
        "badge": "TOP SELLER"
      }
    }
  },
  {
    "slug": "meuleuse-makita-ga9030",
    "name": "مطحنة زاوية Makita GA9030 بقوة 2400 واط وقرص 230 ملم",
    "reference": "MAK-GA9030",
    "shortDescription": "2400 واط • قرص 230 ملم • احترافي",
    "description": "مطحنة قوية بقوة 2400 واط وقرص 230 ملم، بدء تشغيل تدريجي ومقبض مضاد للاهتزاز. للقطع في الخرسانة والمعادن والحجر.",
    "price": "620.00",
    "oldPrice": "780.00",
    "categoryId": 1,
    "brandId": 2,
    "image": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=70&auto=format&fit=crop",
    "stock": 18,
    "rating": "4.7",
    "reviewsCount": 89,
    "badge": null,
    "discount": 21,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "Makita GA9030 Angle Grinder 2400W Ø230mm",
        "shortDescription": "2400W • Ø230mm • Pro",
        "description": "Powerful 2400W grinder with 230mm disc, soft start and anti-vibration handle. For cutting concrete, metal and stone."
      }
    }
  },
  {
    "slug": "perforateur-dewalt-d25133k",
    "name": "مثقاب خرسانة DeWalt D25133K بقوة 800 واط SDS-Plus",
    "reference": "DEW-D25133",
    "shortDescription": "800 واط • SDS-Plus • 2.6 جول",
    "description": "مثقاب SDS-Plus بقوة 800 واط وطاقة صدم 2.6 جول وثلاثة أنماط تشغيل وظرف قابل للتبديل. اختيار محترفي الهياكل الخرسانية.",
    "price": "1190.00",
    "oldPrice": "1450.00",
    "categoryId": 1,
    "brandId": 3,
    "image": "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=500&q=70&auto=format&fit=crop",
    "stock": 12,
    "rating": "4.9",
    "reviewsCount": 64,
    "badge": "احترافي",
    "discount": 18,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "DeWalt D25133K 800W SDS-Plus Rotary Hammer",
        "shortDescription": "800W • SDS-Plus • 2.6J",
        "description": "800W SDS-Plus rotary hammer, 2.6J impact energy, 3 operating modes and interchangeable chuck. The choice of structural professionals.",
        "badge": "PRO"
      }
    }
  },
  {
    "slug": "scie-circulaire-total-1400",
    "name": "منشار دائري Total بقوة 1400 واط وقرص 185 ملم",
    "reference": "TOT-TS114185",
    "shortDescription": "1400 واط • قرص 185 ملم • ليزر",
    "description": "منشار دائري بقوة 1400 واط وشفرة 185 ملم، قطع حتى 65 ملم بزاوية 90 درجة، مؤشر ليزر وغطاء من الألومنيوم. ضمان سنتين.",
    "price": "395.00",
    "oldPrice": "520.00",
    "categoryId": 1,
    "brandId": 5,
    "image": "https://images.unsplash.com/photo-1513467535987-fd63d46e3bb6?w=500&q=70&auto=format&fit=crop",
    "stock": 30,
    "rating": "4.5",
    "reviewsCount": 47,
    "badge": null,
    "discount": 24,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "Total 1400W Circular Saw Ø185mm",
        "shortDescription": "1400W • Ø185mm • Laser",
        "description": "1400W circular saw, 185mm blade, cuts up to 65mm at 90°, laser guide and aluminium guard. 2-year warranty."
      }
    }
  },
  {
    "slug": "coffret-ingco-108-pieces",
    "name": "طقم أدوات Ingco من 108 قطعة + مثقاب 20 فولت هدية",
    "reference": "ING-HKTHP108",
    "shortDescription": "108 قطعة + مثقاب هدية",
    "description": "طقم كامل من 108 قطعة: مفاتيح ربط مقببة ومفكات وكماشات، مع مثقاب 20 فولت هدية. أفضل سعر مقابل الجودة.",
    "price": "549.00",
    "oldPrice": "749.00",
    "categoryId": 1,
    "brandId": 6,
    "image": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=70&auto=format&fit=crop",
    "stock": 40,
    "rating": "4.6",
    "reviewsCount": 210,
    "badge": "عرض مجمّع",
    "discount": 27,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "Ingco 108-Piece Tool Set + Free 20V Drill",
        "shortDescription": "108 pcs + free drill",
        "description": "Complete 108-piece set: sockets, wrenches, screwdrivers, pliers — plus a 20V drill free. Unbeatable value for money.",
        "badge": "PACK"
      }
    }
  },
  {
    "slug": "ponceuse-bosch-pex220",
    "name": "مصقلة مدارية Bosch PEX 220 A",
    "reference": "BOC-PEX220",
    "shortDescription": "220 واط • قرص 125 ملم + أوراق صنفرة",
    "description": "مصقلة مدارية بقوة 220 واط وقرص 125 ملم وشفط مدمج، مع ظرف و25 ورقة صنفرة. تشطيب مثالي للخشب والجدران.",
    "price": "289.00",
    "oldPrice": "365.00",
    "categoryId": 1,
    "brandId": 1,
    "image": "https://images.unsplash.com/photo-1616401784845-180882db64ba?w=500&q=70&auto=format&fit=crop",
    "stock": 22,
    "rating": "4.4",
    "reviewsCount": 38,
    "badge": null,
    "discount": 21,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Bosch PEX 220 A Random Orbit Sander",
        "shortDescription": "220W • Ø125mm + sanding discs",
        "description": "220W random orbit sander, 125mm pad, integrated dust extraction, case with 25 sanding discs. Perfect finish on wood & walls."
      }
    }
  },
  {
    "slug": "poste-souder-total-200a",
    "name": "جهاز لحام Inverter من Total بقوة 200 أمبير",
    "reference": "TOT-TW220200",
    "shortDescription": "200 أمبير • Inverter • كامل",
    "description": "جهاز لحام Inverter بقوة 200 أمبير وتقنية IGBT، أقطاب من 1.6 إلى 4 ملم، شاشة رقمية، مع حقيبة وقناع وكابلات.",
    "price": "475.00",
    "oldPrice": "620.00",
    "categoryId": 1,
    "brandId": 5,
    "image": "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=500&q=70&auto=format&fit=crop",
    "stock": 15,
    "rating": "4.6",
    "reviewsCount": 52,
    "badge": null,
    "discount": 23,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "Total 200A Inverter Welder",
        "shortDescription": "200A • Inverter • Complete",
        "description": "200A inverter welder with IGBT technology, 1.6–4mm electrodes, digital display, supplied with case, mask and cables."
      }
    }
  },
  {
    "slug": "caisse-stanley-3en1",
    "name": "صندوق أدوات Stanley 3 في 1 بطول 65 سم",
    "reference": "STA-65CM",
    "shortDescription": "65 سم • عجلات • 50 كغ",
    "description": "صندوق أدوات Stanley 3 في 1 على عجلات، طول 65 سم وحمولة 50 كغ، وأدراج قابلة للإزالة. رفيق الحرفيين المتنقلين.",
    "price": "340.00",
    "oldPrice": "420.00",
    "categoryId": 2,
    "brandId": 4,
    "image": "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&q=70&auto=format&fit=crop",
    "stock": 35,
    "rating": "4.7",
    "reviewsCount": 96,
    "badge": null,
    "discount": 19,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Stanley 3-in-1 Tool Box 65cm",
        "shortDescription": "65cm • Wheels • 50kg",
        "description": "Stanley 3-in-1 tool box on wheels, 65cm, 50kg load capacity, removable drawers. The mobile craftsman's companion."
      }
    }
  },
  {
    "slug": "cles-mixtes-ingco-14",
    "name": "طقم مفاتيح ربط مختلطة Ingco من 14 قطعة (8-24 ملم)",
    "reference": "ING-HKSPA114",
    "shortDescription": "14 قطعة • كروم فاناديوم • ضمان مدى الحياة",
    "description": "طقم من 14 مفتاح ربط مختلط من 8 إلى 24 ملم من الكروم فاناديوم، بتشطيب مصقول وعلبة صلبة. ضمان مدى الحياة.",
    "price": "129.00",
    "oldPrice": "175.00",
    "categoryId": 2,
    "brandId": 6,
    "image": "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=500&q=70&auto=format&fit=crop",
    "stock": 60,
    "rating": "4.5",
    "reviewsCount": 73,
    "badge": null,
    "discount": 26,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Ingco 14-Piece Combination Wrench Set 8–24mm",
        "shortDescription": "14 pcs • Cr-V • Lifetime warranty",
        "description": "Set of 14 combination wrenches from 8 to 24mm in chrome vanadium, polished finish, rigid case. Lifetime warranty."
      }
    }
  },
  {
    "slug": "marteau-piqueur-total-1500",
    "name": "مطرقة هدم Total بقوة 1500 واط مع أزاميل",
    "reference": "TOT-TH215002",
    "shortDescription": "1500 واط • SDS-Max • حقيبة",
    "description": "مطرقة هدم SDS-Max بقوة 1500 واط، مع إزميلين و3 مثاقب، داخل حقيبة. للهدم والأعمال الخرسانية.",
    "price": "890.00",
    "oldPrice": "1150.00",
    "categoryId": 2,
    "brandId": 5,
    "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=70&auto=format&fit=crop",
    "stock": 10,
    "rating": "4.8",
    "reviewsCount": 41,
    "badge": "للورشات",
    "discount": 23,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "Total 1500W Demolition Hammer + Chisels",
        "shortDescription": "1500W • SDS-Max • Case",
        "description": "1500W SDS-Max demolition hammer, 2 chisels and 3 drill bits, in a case. For demolition and concrete work.",
        "badge": "JOB SITE"
      }
    }
  },
  {
    "slug": "tournevis-stanley-1000v",
    "name": "طقم مفكات معزولة Stanley حتى 1000 فولت (6 قطع)",
    "reference": "STA-1000V6",
    "shortDescription": "1000 فولت • VDE • 6 قطع",
    "description": "طقم من 6 مفكات معزولة حتى 1000 فولت للكهربائيين، شفرات كروم فاناديوم ومقبض ثنائي المادة. معتمد VDE.",
    "price": "95.00",
    "oldPrice": "130.00",
    "categoryId": 2,
    "brandId": 4,
    "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=70&auto=format&fit=crop",
    "stock": 80,
    "rating": "4.6",
    "reviewsCount": 58,
    "badge": null,
    "discount": 27,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Stanley 1000V Insulated Screwdriver Set, 6 pcs",
        "shortDescription": "1000V • VDE • 6 pcs",
        "description": "Set of 6 insulated screwdrivers rated to 1000V for electricians, Cr-V blades and dual-material handles. VDE certified."
      }
    }
  },
  {
    "slug": "ciment-cpa-45kg-tonne",
    "name": "أسمنت بورتلاند CPA 45 كغ — سعر الطن (20 كيساً)",
    "reference": "CIM-CPA45T",
    "shortDescription": "كيس 45 كغ • توصيل بالشاحنة",
    "description": "أسمنت بورتلاند مركب CPA 45 كغ مطابق للمواصفات الليبية. سعر تنازلي للورشات وتوصيل مباشر بالشاحنة.",
    "price": "38.00",
    "oldPrice": "45.00",
    "categoryId": 3,
    "brandId": 10,
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=70&auto=format&fit=crop",
    "stock": 500,
    "rating": "4.9",
    "reviewsCount": 320,
    "badge": "سعر الورشة",
    "discount": 16,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "CPA 45kg Portland Cement — Price per Tonne (20 bags)",
        "shortDescription": "45kg bag • Truck delivery",
        "description": "CPA 45kg blended Portland cement, compliant with Libyan standards. Volume trade pricing and direct truck delivery.",
        "badge": "TRADE PRICE"
      }
    }
  },
  {
    "slug": "fer-beton-ha12",
    "name": "حديد تسليح عالي الالتصاق قطر 12 ملم — قضيب 12 متراً",
    "reference": "FER-HA12",
    "shortDescription": "قطر 12 ملم • قضيب 12 م • Fe500",
    "description": "حديد تسليح عالي الالتصاق قطر 12 ملم، قضيب 12 متراً، درجة Fe500. قص حسب الطلب وتوصيل إلى الورشة.",
    "price": "42.00",
    "oldPrice": "50.00",
    "categoryId": 3,
    "brandId": 10,
    "image": "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=500&q=70&auto=format&fit=crop",
    "stock": 800,
    "rating": "4.8",
    "reviewsCount": 180,
    "badge": "سعر الورشة",
    "discount": 16,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "HA Rebar Ø12mm — 12m Bar",
        "shortDescription": "Ø12mm • 12m bar • Fe500",
        "description": "High-bond rebar Ø12mm, 12-metre bar, grade Fe500. Cut to length on request and delivered to site.",
        "badge": "TRADE PRICE"
      }
    }
  },
  {
    "slug": "parpaing-20-palette",
    "name": "طوب أسمنتي مجوّف 20×20×40 — طبليّة 120 قطعة",
    "reference": "PAR-20X120",
    "shortDescription": "طبليّة 120 قطعة • متين",
    "description": "طوب أسمنتي مجوّف 20×20×40 سم، طبليّة من 120 قطعة، صناعة محلية عالية المتانة. يُسلَّم مع التفريغ.",
    "price": "210.00",
    "oldPrice": "252.00",
    "categoryId": 3,
    "brandId": 10,
    "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=70&auto=format&fit=crop",
    "stock": 200,
    "rating": "4.7",
    "reviewsCount": 95,
    "badge": null,
    "discount": 17,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Hollow Concrete Block 20x20x40 — Pallet of 120",
        "shortDescription": "Pallet of 120 • Durable",
        "description": "Hollow concrete blocks 20x20x40cm, pallet of 120, high-strength local manufacture. Delivered with unloading."
      }
    }
  },
  {
    "slug": "platre-knauf-goldband",
    "name": "جص Knauf Goldband 25 كغ",
    "reference": "KNA-GOLD25",
    "shortDescription": "25 كغ • تشطيب ناعم",
    "description": "جص تشطيب Knauf Goldband 25 كغ للطلاء الداخلي، زمن تماسك 60 دقيقة ومردود 8 م². جودة ألمانية.",
    "price": "28.00",
    "oldPrice": "34.00",
    "categoryId": 3,
    "brandId": 10,
    "image": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&q=70&auto=format&fit=crop",
    "stock": 300,
    "rating": "4.6",
    "reviewsCount": 64,
    "badge": null,
    "discount": 18,
    "isNew": true,
    "isPromo": false,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Knauf Goldband Plaster 25kg",
        "shortDescription": "25kg • Smooth finish",
        "description": "Knauf Goldband 25kg finishing plaster for interior coats, 60-minute setting time, covers 8 m². German quality."
      }
    }
  },
  {
    "slug": "colle-sika-ceram-25",
    "name": "لاصق بلاط Sika Ceram 25 كغ",
    "reference": "SIK-CERAM25",
    "shortDescription": "25 كغ • C1T • أرضية وجدار",
    "description": "لاصق أسمنتي للبلاط الداخلي والخارجي Sika Ceram، كيس 25 كغ، التصاق عالٍ من الفئة C1T. للأرضيات والجدران.",
    "price": "45.00",
    "oldPrice": "56.00",
    "categoryId": 3,
    "brandId": 7,
    "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=70&auto=format&fit=crop",
    "stock": 250,
    "rating": "4.8",
    "reviewsCount": 112,
    "badge": null,
    "discount": 20,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Sika Ceram 25kg Tile Adhesive",
        "shortDescription": "25kg • C1T • Floor & wall",
        "description": "Sika Ceram cement-based adhesive for interior and exterior tiles, 25kg bag, high bond C1T. Floors & walls."
      }
    }
  },
  {
    "slug": "planche-coffrage-4m",
    "name": "لوح شدّ من خشب الصنوبر 4 أمتار",
    "reference": "BOI-COF4M",
    "shortDescription": "4 م • صنوبر • شدّ",
    "description": "لوح شدّ من الصنوبر مقاس 25×200 ملم وطول 4 أمتار، مُجفَّف وصالح لثلاثة استعمالات مضمونة. سعر تنازلي حسب الحزمة.",
    "price": "32.00",
    "oldPrice": "39.00",
    "categoryId": 3,
    "brandId": 10,
    "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=70&auto=format&fit=crop",
    "stock": 400,
    "rating": "4.5",
    "reviewsCount": 40,
    "badge": null,
    "discount": 18,
    "isNew": false,
    "isPromo": false,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Pine Formwork Board 4m",
        "shortDescription": "4m • Pine • Formwork",
        "description": "Pine formwork board 25×200mm, 4 metres long, kiln-dried, guaranteed for 3 uses. Volume pricing per bundle."
      }
    }
  },
  {
    "slug": "peinture-jotun-fenomastic-15l",
    "name": "دهان فينيلي Jotun Fenomastic 15 لتر أبيض",
    "reference": "JOT-FENO15",
    "shortDescription": "15 لتر • قابل للغسل • 120 م²",
    "description": "دهان فينيلي مطفأ من Jotun Fenomastic، 15 لتر، أبيض ناصع، قابل للغسل، ومردود 120 م². الأول في ليبيا.",
    "price": "265.00",
    "oldPrice": "320.00",
    "categoryId": 4,
    "brandId": 11,
    "image": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&q=70&auto=format&fit=crop",
    "stock": 90,
    "rating": "4.9",
    "reviewsCount": 240,
    "badge": "الأكثر مبيعاً",
    "discount": 17,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "Jotun Fenomastic Vinyl Paint 15L White",
        "shortDescription": "15L • Washable • 120 m²",
        "description": "Jotun Fenomastic matt vinyl paint, 15L, brilliant white, washable, covers 120 m². Libya's number one.",
        "badge": "TOP SELLER"
      }
    }
  },
  {
    "slug": "peinture-coral-facade-15l",
    "name": "دهان واجهات Coral Weatherguard 15 لتر",
    "reference": "COR-WG15",
    "shortDescription": "15 لتر • مضاد للأشعة فوق البنفسجية • 10 سنوات",
    "description": "دهان أكريليك للواجهات Coral Weatherguard، مقاوم للأشعة فوق البنفسجية والتشققات، وحماية لمدة 10 سنوات. ألوان حسب الطلب.",
    "price": "310.00",
    "oldPrice": "385.00",
    "categoryId": 4,
    "brandId": 12,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&q=70&auto=format&fit=crop",
    "stock": 70,
    "rating": "4.7",
    "reviewsCount": 98,
    "badge": null,
    "discount": 19,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Coral Weatherguard Exterior Paint 15L",
        "shortDescription": "15L • UV-resistant • 10 years",
        "description": "Coral Weatherguard acrylic facade paint, UV and crack resistant, 10 years' protection. Colours made to order."
      }
    }
  },
  {
    "slug": "enduit-toupret-15kg",
    "name": "معجون تسوية Toupret 15 كغ",
    "reference": "SIK-END15",
    "shortDescription": "15 كغ • تسوية • احترافي",
    "description": "معجون تسوية داخلي 15 كغ، يُدهن بالأسطوانة، سهل الصنفرة، أبيض مطفأ. تشطيب احترافي دون أثر.",
    "price": "120.00",
    "oldPrice": "148.00",
    "categoryId": 4,
    "brandId": 7,
    "image": "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=500&q=70&auto=format&fit=crop",
    "stock": 110,
    "rating": "4.6",
    "reviewsCount": 55,
    "badge": null,
    "discount": 19,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Toupret Smoothing Filler 15kg",
        "shortDescription": "15kg • Smoothing • Pro",
        "description": "15kg interior smoothing filler, roller applied, easy to sand, matt white. Professional finish without trace."
      }
    }
  },
  {
    "slug": "kit-rouleaux-pinceaux-10",
    "name": "طقم أدوات دهان احترافي — 10 قطع",
    "reference": "PIN-KIT10",
    "shortDescription": "10 قطع • كامل",
    "description": "طقم دهان كامل: 3 أسطوانات و4 فرش وصينية وغطاء أرضية وشريط لاصق للتغطية. كل ما تحتاجه للبدء.",
    "price": "75.00",
    "oldPrice": "99.00",
    "categoryId": 4,
    "brandId": 12,
    "image": "https://images.unsplash.com/photo-1525904097878-94fb15835963?w=500&q=70&auto=format&fit=crop",
    "stock": 130,
    "rating": "4.4",
    "reviewsCount": 71,
    "badge": null,
    "discount": 24,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Pro Paint Kit — 10 Pieces",
        "shortDescription": "10 pcs • Complete",
        "description": "Complete painting kit: 3 rollers, 4 brushes, tray, drop cloth and masking tape. Everything you need to start."
      }
    }
  },
  {
    "slug": "vernis-jotun-marin-4l",
    "name": "ورنيش بحري Jotun 4 لتر شفاف",
    "reference": "JOT-VERN4",
    "shortDescription": "4 لتر • بحري • مضاد للأشعة فوق البنفسجية",
    "description": "ورنيش بحري عالي الحماية من Jotun، 4 لتر، مضاد للأشعة فوق البنفسجية، للخشب الخارجي والأبواب والمظلات. لمعان دائم.",
    "price": "145.00",
    "oldPrice": "178.00",
    "categoryId": 4,
    "brandId": 11,
    "image": "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&q=70&auto=format&fit=crop",
    "stock": 60,
    "rating": "4.7",
    "reviewsCount": 33,
    "badge": null,
    "discount": 19,
    "isNew": false,
    "isPromo": false,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Jotun Marine Varnish 4L Clear",
        "shortDescription": "4L • Marine • UV-resistant",
        "description": "High-protection Jotun marine varnish, 4L, UV-resistant, for exterior wood, doors and pergolas. Long-lasting gloss."
      }
    }
  },
  {
    "slug": "chauffe-eau-100l",
    "name": "سخان مياه كهربائي عمودي 100 لتر",
    "reference": "PLB-CE100",
    "shortDescription": "100 لتر • 2000 واط • ضمان 5 سنوات",
    "description": "سخان مياه كهربائي عمودي 100 لتر، خزان مطلي بالمينا، مقاومة 2000 واط، منظم حرارة، وضمان 5 سنوات على الخزان.",
    "price": "690.00",
    "oldPrice": "850.00",
    "categoryId": 5,
    "brandId": 9,
    "image": "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&q=70&auto=format&fit=crop",
    "stock": 25,
    "rating": "4.6",
    "reviewsCount": 87,
    "badge": null,
    "discount": 19,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "100L Vertical Electric Water Heater",
        "shortDescription": "100L • 2000W • 5-year warranty",
        "description": "100L vertical electric water heater, enamelled tank, 2000W element, thermostat and 5-year tank warranty."
      }
    }
  },
  {
    "slug": "wc-suspendu-bati",
    "name": "مرحاض معلّق + إطار تثبيت كامل",
    "reference": "PLB-WC01",
    "shortDescription": "كامل • هادئ • ضمان 10 سنوات",
    "description": "طقم مرحاض معلّق من السيراميك مع إطار التثبيت ولوحة الزر المزدوج. تصميم عصري وهادئ مع ضمان 10 سنوات.",
    "price": "1150.00",
    "oldPrice": "1390.00",
    "categoryId": 5,
    "brandId": 9,
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0c?w=500&q=70&auto=format&fit=crop",
    "stock": 14,
    "rating": "4.8",
    "reviewsCount": 45,
    "badge": "تصميم",
    "discount": 17,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Wall-Hung WC + Complete Support Frame",
        "shortDescription": "Complete • Quiet • 10-year warranty",
        "description": "Ceramic wall-hung toilet pack with support frame and dual-flush plate. Modern, quiet design with 10-year warranty.",
        "badge": "DESIGN"
      }
    }
  },
  {
    "slug": "mitigeur-lavabo-cascade",
    "name": "خلاط حوض شلالي مطلي بالكروم",
    "reference": "PLB-MIT02",
    "shortDescription": "شلالي • كروم • خرطوش سيراميك",
    "description": "خلاط حوض بفوهة شلالية مطلية بالكروم، وخرطوش سيراميك 35 ملم، مع خراطيم مرفقة. أناقة الحمّام.",
    "price": "185.00",
    "oldPrice": "240.00",
    "categoryId": 5,
    "brandId": 9,
    "image": "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=500&q=70&auto=format&fit=crop",
    "stock": 48,
    "rating": "4.5",
    "reviewsCount": 62,
    "badge": null,
    "discount": 23,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Chrome Cascade Basin Mixer",
        "shortDescription": "Cascade • Chrome • Ceramic cartridge",
        "description": "Chrome-plated cascade basin mixer, 35mm ceramic cartridge, flexible hoses included. Bathroom elegance."
      }
    }
  },
  {
    "slug": "pompe-eau-1hp",
    "name": "مضخة مياه محيطية 1 حصان",
    "reference": "PLB-PMP1",
    "shortDescription": "1 حصان • 60 لتر/دقيقة • حديد زهر",
    "description": "مضخة مياه محيطية 1 حصان (0.75 كيلوواط)، 60 لتر في الدقيقة، ارتفاع 60 متراً، وهيكل من الحديد الزهر. للحفر والخزانات.",
    "price": "320.00",
    "oldPrice": "410.00",
    "categoryId": 5,
    "brandId": 5,
    "image": "https://images.unsplash.com/photo-1542013936693-884638332954?w=500&q=70&auto=format&fit=crop",
    "stock": 20,
    "rating": "4.7",
    "reviewsCount": 54,
    "badge": null,
    "discount": 22,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "1HP Peripheral Water Pump",
        "shortDescription": "1HP • 60 L/min • Cast iron",
        "description": "1HP (0.75kW) peripheral water pump, 60 L/min, 60m head, cast iron body. For boreholes and tanks."
      }
    }
  },
  {
    "slug": "tuyau-ppr-25",
    "name": "أنبوب PPR قطر 25 ملم — قضيب 4 م + وصلات",
    "reference": "PLB-PPR25",
    "shortDescription": "4 م + 10 وصلات",
    "description": "أنبوب PPR قطر 25 ملم، قضيب 4 أمتار مع 10 وصلات (أكواع ومجالس وتيهات). لحام مثالي للماء الساخن والبارد.",
    "price": "28.00",
    "oldPrice": "36.00",
    "categoryId": 5,
    "brandId": 9,
    "image": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&q=70&auto=format&fit=crop",
    "stock": 300,
    "rating": "4.6",
    "reviewsCount": 88,
    "badge": null,
    "discount": 22,
    "isNew": false,
    "isPromo": false,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "PPR Pipe Ø25mm — 4m Bar + Fittings",
        "shortDescription": "4m + 10 fittings",
        "description": "PPR pipe Ø25mm, 4-metre bar with 10 fittings (elbows, couplers, tees). Perfect welds, hot and cold water."
      }
    }
  },
  {
    "slug": "cable-3x25-100m",
    "name": "كابل كهربائي 3×2.5 ملم² — بكرة 100 م",
    "reference": "ELE-CAB325",
    "shortDescription": "100 م • نحاس • 3G2.5",
    "description": "كابل صلب 3×2.5 ملم² من النحاس، بكرة 100 متر، عزل PVC ومطابق للمواصفات. للتركيبات المنزلية.",
    "price": "420.00",
    "oldPrice": "510.00",
    "categoryId": 6,
    "brandId": 8,
    "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=70&auto=format&fit=crop",
    "stock": 45,
    "rating": "4.8",
    "reviewsCount": 76,
    "badge": null,
    "discount": 18,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "3x2.5mm² Electric Cable — 100m Reel",
        "shortDescription": "100m • Copper • 3G2.5",
        "description": "Solid 3×2.5mm² copper cable, 100-metre reel, PVC insulation, compliant. For domestic installations."
      }
    }
  },
  {
    "slug": "tableau-schneider-8mod",
    "name": "لوحة كهربائية Schneider 8 وحدات مع قواطع 32 أمبير",
    "reference": "ELE-TAB08",
    "shortDescription": "كامل • Schneider",
    "description": "لوحة كهربائية من 8 وحدات مع قواطع Schneider (32 و20 و16 و10 أمبير) وقاطع تفاضلي 40 أمبير.",
    "price": "385.00",
    "oldPrice": "470.00",
    "categoryId": 6,
    "brandId": 9,
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=70&auto=format&fit=crop",
    "stock": 32,
    "rating": "4.9",
    "reviewsCount": 91,
    "badge": "أمان",
    "discount": 18,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Schneider 8-Module Distribution Board with 32A Breakers",
        "shortDescription": "Complete • Schneider",
        "description": "8-module distribution board with Schneider breakers (32A, 20A, 16A, 10A) and a 40A residual-current device.",
        "badge": "SAFETY"
      }
    }
  },
  {
    "slug": "spots-led-7w-x10",
    "name": "عبوة من 10 سبوتات LED مدمجة 7 واط بضوء أبيض دافئ",
    "reference": "ELE-SPOT10",
    "shortDescription": "10 قطع • 7 واط • 3000 كلفن",
    "description": "عبوة من 10 سبوتات LED مدمجة بقوة 7 واط، ضوء أبيض دافئ 3000 كلفن، قابلة للتوجيه، مع المحوّل. توفير 85٪ من الطاقة.",
    "price": "145.00",
    "oldPrice": "190.00",
    "categoryId": 6,
    "brandId": 8,
    "image": "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=70&auto=format&fit=crop",
    "stock": 85,
    "rating": "4.6",
    "reviewsCount": 120,
    "badge": null,
    "discount": 24,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "10 Recessed LED Spotlights 7W Warm White",
        "shortDescription": "10 pcs • 7W • 3000K",
        "description": "Pack of 10 recessed LED spotlights, 7W, warm white 3000K, adjustable, driver included. Saves 85% energy."
      }
    }
  },
  {
    "slug": "lot-legrand-10",
    "name": "عبوة Legrand: 10 مفاتيح وقوابس",
    "reference": "ELE-LEG10",
    "shortDescription": "10 قطع • Legrand",
    "description": "عبوة Legrand: 6 مفاتيح إنارة و4 قوابس 16 أمبير بيضاء، تثبيت بالبراغي وتصميم عصري. جودة فرنسية.",
    "price": "165.00",
    "oldPrice": "210.00",
    "categoryId": 6,
    "brandId": 8,
    "image": "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=500&q=70&auto=format&fit=crop",
    "stock": 70,
    "rating": "4.7",
    "reviewsCount": 66,
    "badge": null,
    "discount": 21,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Legrand Pack: 10 Switches & Sockets",
        "shortDescription": "10 pcs • Legrand",
        "description": "Legrand pack: 6 light switches and 4 white 16A sockets, screw fixing, modern design. French quality."
      }
    }
  },
  {
    "slug": "projecteur-solaire-200w",
    "name": "كشاف LED شمسي 200 واط مع جهاز تحكم عن بعد",
    "reference": "ELE-SOL200",
    "shortDescription": "200 واط • طاقة شمسية • IP66",
    "description": "كشاف LED شمسي 200 واط، بطارية 30000 مللي أمبير، كاشف حركة، جهاز تحكم عن بعد، وحماية IP66. بدون فاتورة كهرباء.",
    "price": "195.00",
    "oldPrice": "260.00",
    "categoryId": 6,
    "brandId": 6,
    "image": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=70&auto=format&fit=crop",
    "stock": 55,
    "rating": "4.5",
    "reviewsCount": 83,
    "badge": "طاقة شمسية",
    "discount": 25,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "200W Solar LED Floodlight with Remote",
        "shortDescription": "200W • Solar • IP66",
        "description": "200W solar LED floodlight, 30000mAh battery, motion sensor, remote control, IP66 rated. No electricity bill.",
        "badge": "SOLAR"
      }
    }
  },
  {
    "slug": "climatiseur-12000-inverter",
    "name": "مكيف سبليت 12000 وحدة حرارية إنفرتر — تبريد وتدفئة",
    "reference": "CLI-12INV",
    "shortDescription": "12000 وحدة • إنفرتر • مركّب",
    "description": "مكيف سبليت 12000 وحدة حرارية بتقنية الإنفرتر، تبريد وتدفئة، غاز R32، واي فاي، فئة A++. التركيب مشمول في طرابلس.",
    "price": "1899.00",
    "oldPrice": "2350.00",
    "categoryId": 7,
    "brandId": 1,
    "image": "https://images.unsplash.com/photo-1631545806609-24040d63f86a?w=500&q=70&auto=format&fit=crop",
    "stock": 28,
    "rating": "4.9",
    "reviewsCount": 310,
    "badge": "مركّب",
    "discount": 19,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "12000 BTU Inverter Air Conditioner — Heat & Cool",
        "shortDescription": "12000 BTU • Inverter • Installed",
        "description": "12000 BTU split air conditioner with inverter technology, heat & cool, R32 gas, Wi-Fi, A++ class. Installation included in Tripoli.",
        "badge": "INSTALLED"
      }
    }
  },
  {
    "slug": "climatiseur-18000",
    "name": "مكيف 18000 وحدة حرارية للصالات الكبيرة",
    "reference": "CLI-18STD",
    "shortDescription": "18000 وحدة • 40 م² • مركّب",
    "description": "مكيف 18000 وحدة حرارية للصالات حتى 40 م²، تبريد سريع، فلتر مضاد للبكتيريا، والتركيب مشمول.",
    "price": "2590.00",
    "oldPrice": "3100.00",
    "categoryId": 7,
    "brandId": 2,
    "image": "https://images.unsplash.com/photo-1614633833026-0820552978b6?w=500&q=70&auto=format&fit=crop",
    "stock": 16,
    "rating": "4.8",
    "reviewsCount": 142,
    "badge": "مركّب",
    "discount": 16,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "18000 BTU Air Conditioner for Large Living Rooms",
        "shortDescription": "18000 BTU • 40 m² • Installed",
        "description": "18000 BTU air conditioner for living rooms up to 40 m², turbo cooling, antibacterial filter, installation included.",
        "badge": "INSTALLED"
      }
    }
  },
  {
    "slug": "chauffe-eau-solaire-200l",
    "name": "سخان شمسي 200 لتر مع لوحين",
    "reference": "CLI-SOL200",
    "shortDescription": "200 لتر • لوحان • توفير 70٪",
    "description": "سخان مياه شمسي 200 لتر مع لوحين ومصدر تسخين كهربائي مساعد، مثالي لأسطح المنازل. توفير 70٪ من الطاقة.",
    "price": "1750.00",
    "oldPrice": "2100.00",
    "categoryId": 7,
    "brandId": 9,
    "image": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=70&auto=format&fit=crop",
    "stock": 9,
    "rating": "4.7",
    "reviewsCount": 38,
    "badge": "طاقة شمسية",
    "discount": 17,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "200L Solar Water Heater + Panels",
        "shortDescription": "200L • 2 panels • Saves 70%",
        "description": "200L solar water heater with 2 panels and electric backup heating, ideal for rooftops. Saves 70% of energy.",
        "badge": "SOLAR"
      }
    }
  },
  {
    "slug": "ventilateur-plafond-52",
    "name": "مروحة سقف 132 سم مع جهاز تحكم",
    "reference": "CLI-VENT52",
    "shortDescription": "132 سم • LED • هادئ",
    "description": "مروحة سقف 132 سم، 5 سرعات، جهاز تحكم عن بعد، إضاءة LED مدمجة، وتشغيل هادئ 30 ديسيبل. تصميم بمظهر الخشب.",
    "price": "340.00",
    "oldPrice": "430.00",
    "categoryId": 7,
    "brandId": 8,
    "image": "https://images.unsplash.com/photo-1565128939503-3b8de9e8e2c0?w=500&q=70&auto=format&fit=crop",
    "stock": 40,
    "rating": "4.5",
    "reviewsCount": 59,
    "badge": null,
    "discount": 21,
    "isNew": true,
    "isPromo": false,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "132cm Ceiling Fan with Remote",
        "shortDescription": "132cm • LED • Quiet",
        "description": "132cm ceiling fan, 5 speeds, remote control, built-in LED light, quiet 30dB operation. Wood-look design."
      }
    }
  },
  {
    "slug": "visserie-1000-pieces",
    "name": "عبوة من 1000 قطعة من البراغي والمثبتات",
    "reference": "QUI-VIS1000",
    "shortDescription": "1000 قطعة • كامل",
    "description": "عبوة من 1000 قطعة: براغي خشب ومعدن، مثبتات نايلون، وحلقات. منظّم مع 50 رأس مفك هدية.",
    "price": "89.00",
    "oldPrice": "120.00",
    "categoryId": 8,
    "brandId": 4,
    "image": "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=500&q=70&auto=format&fit=crop",
    "stock": 120,
    "rating": "4.6",
    "reviewsCount": 150,
    "badge": null,
    "discount": 26,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "1000-Piece Screw & Plug Kit",
        "shortDescription": "1000 pcs • Complete",
        "description": "1000-piece kit: wood and metal screws, nylon plugs and washers. Organiser with 50 free bits."
      }
    }
  },
  {
    "slug": "serrure-blindee-3pts",
    "name": "قفل أمان 3 نقاط مع 5 مفاتيح",
    "reference": "QUI-SER3P",
    "shortDescription": "3 نقاط • 5 مفاتيح • أمان",
    "description": "قفل تركيب خارجي 3 نقاط، أسطوانة عالية الأمان، 5 مفاتيح قابلة للعكس، وحماية ضد الفتح بالعبث.",
    "price": "265.00",
    "oldPrice": "340.00",
    "categoryId": 8,
    "brandId": 4,
    "image": "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=70&auto=format&fit=crop",
    "stock": 35,
    "rating": "4.8",
    "reviewsCount": 72,
    "badge": "أمان",
    "discount": 22,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "3-Point Security Lock + 5 Keys",
        "shortDescription": "3 points • 5 keys • Security",
        "description": "Surface-mounted 3-point lock, high-security cylinder, 5 reversible keys. Anti-pick protection.",
        "badge": "SAFETY"
      }
    }
  },
  {
    "slug": "silicone-sika-x6",
    "name": "سيليكون صحي Sika أبيض 300 مل × 6",
    "reference": "QUI-SIK6",
    "shortDescription": "6 × 300 مل • مضاد للعفن",
    "description": "6 خراطيش سيليكون صحي Sika أبيض سعة 300 مل، مضاد للعفن، للحمّام والمطبخ.",
    "price": "72.00",
    "oldPrice": "95.00",
    "categoryId": 8,
    "brandId": 7,
    "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&q=70&auto=format&fit=crop",
    "stock": 150,
    "rating": "4.7",
    "reviewsCount": 84,
    "badge": null,
    "discount": 24,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Sika Sanitary Silicone White 300ml x6",
        "shortDescription": "6 x 300ml • Anti-mould",
        "description": "6 cartridges of Sika white sanitary silicone, 300ml each, anti-mould, for bathroom & kitchen."
      }
    }
  },
  {
    "slug": "colle-pattex-pistolet",
    "name": "6 أنابيب لاصق قوي Pattex + مسدس هدية",
    "reference": "QUI-PAT6",
    "shortDescription": "6 أنابيب + مسدس",
    "description": "6 أنابيب لاصق بوليمري مع مسدس بثق هدية. يلصق كل شيء: الخشب والمعدن والبلاط والحجر.",
    "price": "95.00",
    "oldPrice": "128.00",
    "categoryId": 8,
    "brandId": 7,
    "image": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=70&auto=format&fit=crop",
    "stock": 95,
    "rating": "4.5",
    "reviewsCount": 47,
    "badge": null,
    "discount": 26,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "6 Pattex Strong Adhesive Tubes + Free Gun",
        "shortDescription": "6 tubes + gun",
        "description": "6 tubes of polymer adhesive with extrusion gun free. Bonds everything: wood, metal, tile and stone."
      }
    }
  },
  {
    "slug": "groupe-total-35kw",
    "name": "مولد كهرباء Total 3.5 كيلوواط يعمل بالبنزين",
    "reference": "GRP-TOT35",
    "shortDescription": "3.5 كيلوواط • 10 ساعات • ضمان سنتين",
    "description": "مولد بنزين 3.5 كيلوواط، تشغيل كهربائي ويدوي، خزان 15 لتر بمدة تشغيل 10 ساعات، ومنظم AVR. ضمان سنتين.",
    "price": "1890.00",
    "oldPrice": "2350.00",
    "categoryId": 9,
    "brandId": 5,
    "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&q=70&auto=format&fit=crop",
    "stock": 12,
    "rating": "4.9",
    "reviewsCount": 178,
    "badge": "ضمان سنتين",
    "discount": 20,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "Total 3.5kW Petrol Generator",
        "shortDescription": "3.5kW • 10h • 2-year warranty",
        "description": "3.5kW petrol generator, electric and manual start, 15L tank for 10 hours' runtime, AVR. 2-year warranty.",
        "badge": "2-YEAR WARRANTY"
      }
    }
  },
  {
    "slug": "groupe-diesel-6kw",
    "name": "مولد ديزل 6 كيلوواط هادئ ومغلّف",
    "reference": "GRP-DIE60",
    "shortDescription": "6 كيلوواط • 68 ديسيبل • تشغيل تلقائي",
    "description": "مولد ديزل 6 كيلوواط معزول صوتياً (68 ديسيبل)، تشغيل تلقائي ATS، خزان 30 لتر، للفلل والمحلات. التركيب مجاني.",
    "price": "4950.00",
    "oldPrice": "5900.00",
    "categoryId": 9,
    "brandId": 6,
    "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&q=70&auto=format&fit=crop",
    "stock": 6,
    "rating": "4.8",
    "reviewsCount": 52,
    "badge": "للفلل",
    "discount": 16,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "6kW Silent Diesel Generator",
        "shortDescription": "6kW • 68dB • Auto start",
        "description": "6kW diesel generator, soundproofed (68dB), automatic ATS start, 30L tank, for villas & shops. Free installation.",
        "badge": "VILLA"
      }
    }
  },
  {
    "slug": "compresseur-100l-3hp",
    "name": "ضاغط هواء 100 لتر 3 حصان مع 5 ملحقات",
    "reference": "GRP-CMP100",
    "shortDescription": "100 لتر • 3 حصان • طقم هدية",
    "description": "ضاغط هواء 100 لتر، 3 حصان، 8 بار، مخرجان، مع طقم نفخ وانتفاخ ودهان هدية.",
    "price": "980.00",
    "oldPrice": "1250.00",
    "categoryId": 9,
    "brandId": 5,
    "image": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&q=70&auto=format&fit=crop",
    "stock": 14,
    "rating": "4.6",
    "reviewsCount": 61,
    "badge": null,
    "discount": 22,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": true,
    "i18n": {
      "en": {
        "name": "100L 3HP Air Compressor + 5-Piece Kit",
        "shortDescription": "100L • 3HP • Free kit",
        "description": "100L, 3HP, 8-bar air compressor with 2 outlets, plus a free blow-gun, inflation and paint kit."
      }
    }
  },
  {
    "slug": "stabilisateur-5000va",
    "name": "منظم جهد 5000 فولت أمبير",
    "reference": "GRP-STAB5K",
    "shortDescription": "5000 فولت أمبير • رقمي • يحمي المكيفات",
    "description": "منظم جهد 5000 فولت أمبير يحمي المكيفات والأجهزة، بشاشة رقمية ومجاوز (bypass). ضروري في ليبيا.",
    "price": "750.00",
    "oldPrice": "920.00",
    "categoryId": 9,
    "brandId": 9,
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=70&auto=format&fit=crop",
    "stock": 22,
    "rating": "4.7",
    "reviewsCount": 93,
    "badge": null,
    "discount": 18,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "5000VA Voltage Stabiliser",
        "shortDescription": "5000VA • Digital • Protects AC units",
        "description": "5000VA voltage stabiliser protecting air conditioners and appliances, digital display, bypass. Essential in Libya."
      }
    }
  },
  {
    "slug": "carrelage-60x60-marbre",
    "name": "بلاط بورسلان أرضي 60×60 بمظهر الرخام (م²)",
    "reference": "CAR-6060M",
    "shortDescription": "60×60 • رخام • الدرجة الأولى",
    "description": "بلاط بورسلان 60×60 بمظهر الرخام الأبيض والرمادي، من الدرجة الأولى ومضاد للانزلاق. السعر للمتر المربع.",
    "price": "68.00",
    "oldPrice": "85.00",
    "categoryId": 10,
    "brandId": 10,
    "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=70&auto=format&fit=crop",
    "stock": 600,
    "rating": "4.8",
    "reviewsCount": 134,
    "badge": null,
    "discount": 20,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "60x60 Marble-Effect Porcelain Floor Tile (m²)",
        "shortDescription": "60x60 • Marble • First choice",
        "description": "60x60 porcelain tile with white/grey marble effect, first grade, slip-resistant. Priced per m²."
      }
    }
  },
  {
    "slug": "faience-30x60",
    "name": "بلاط جداري للحمّام 30×60 (م²)",
    "reference": "CAR-F3060",
    "shortDescription": "30×60 • لامع • ديكور",
    "description": "بلاط جداري لامع 30×60 بتصاميم عصرية، للحمّام والمطبخ. تشكيلة واسعة من الديكورات في الفرع.",
    "price": "54.00",
    "oldPrice": "68.00",
    "categoryId": 10,
    "brandId": 10,
    "image": "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500&q=70&auto=format&fit=crop",
    "stock": 800,
    "rating": "4.6",
    "reviewsCount": 87,
    "badge": null,
    "discount": 21,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "30x60 Bathroom Wall Tile (m²)",
        "shortDescription": "30x60 • Glossy • Decor",
        "description": "Glossy 30x60 wall tile with modern patterns, for bathroom & kitchen. Wide range of designs in store."
      }
    }
  },
  {
    "slug": "parquet-chene-8mm",
    "name": "باركيه لامينيت بنقشة البلوط 8 ملم (م²)",
    "reference": "CAR-PAR08",
    "shortDescription": "8 ملم • الفئة 32 • تركيب بالمشابك",
    "description": "باركيه لامينيت 8 ملم بنقشة البلوط الطبيعي، الفئة 32، تركيب بالمشابك مع حواف متناسقة. ضمان 15 سنة.",
    "price": "75.00",
    "oldPrice": "95.00",
    "categoryId": 10,
    "brandId": 10,
    "image": "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&q=70&auto=format&fit=crop",
    "stock": 400,
    "rating": "4.7",
    "reviewsCount": 76,
    "badge": null,
    "discount": 21,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "8mm Oak Laminate Flooring (m²)",
        "shortDescription": "8mm • Class 32 • Click-fit",
        "description": "8mm laminate flooring with natural oak finish, class 32, click installation, matching skirting boards. 15-year warranty."
      }
    }
  },
  {
    "slug": "tondeuse-thermique-45",
    "name": "جزازة عشب بنزين 4.5 حصان 51 سم",
    "reference": "JAR-TON45",
    "shortDescription": "4.5 حصان • 51 سم • دفع ذاتي",
    "description": "جزازة عشب بنزين 4.5 حصان بعرض قص 51 سم، سلة 60 لتر، 6 ارتفاعات، ودفع ذاتي. للحدائق حتى 1500 م².",
    "price": "1250.00",
    "oldPrice": "1550.00",
    "categoryId": 11,
    "brandId": 5,
    "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=70&auto=format&fit=crop",
    "stock": 10,
    "rating": "4.6",
    "reviewsCount": 34,
    "badge": null,
    "discount": 19,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "4.5HP 51cm Petrol Lawn Mower",
        "shortDescription": "4.5HP • 51cm • Self-propelled",
        "description": "4.5HP petrol mower, 51cm cutting width, 60L grass bag, 6 cutting heights, self-propelled. For gardens up to 1500 m²."
      }
    }
  },
  {
    "slug": "taille-haie-bosch-700",
    "name": "مقص أسوار كهربائي Bosch 700 واط 60 سم",
    "reference": "JAR-TH700",
    "shortDescription": "700 واط • 60 سم • 3.4 كغ",
    "description": "مقص أسوار كهربائي Bosch بقوة 700 واط وشفرة 60 سم وفتحة قص 34 ملم، مضاد للانحشار. خفيف الوزن 3.4 كغ.",
    "price": "420.00",
    "oldPrice": "530.00",
    "categoryId": 11,
    "brandId": 1,
    "image": "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=500&q=70&auto=format&fit=crop",
    "stock": 18,
    "rating": "4.5",
    "reviewsCount": 28,
    "badge": null,
    "discount": 21,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Bosch 700W 60cm Electric Hedge Trimmer",
        "shortDescription": "700W • 60cm • 3.4kg",
        "description": "Bosch 700W electric hedge trimmer, 60cm blade, 34mm cutting capacity, anti-jam. Lightweight at 3.4kg."
      }
    }
  },
  {
    "slug": "tuyau-50m-devidoir",
    "name": "خرطوم ري 50 م + بكرة حائطية + مسدس رش",
    "reference": "JAR-TUY50",
    "shortDescription": "50 م • بكرة • 7 أنماط رش",
    "description": "خرطوم مضفّر 50 متراً + بكرة حائطية + مسدس رش بـ7 أنماط + وصلات. مقاوم للالتواء، وضمان 5 سنوات.",
    "price": "185.00",
    "oldPrice": "240.00",
    "categoryId": 11,
    "brandId": 6,
    "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=70&auto=format&fit=crop",
    "stock": 45,
    "rating": "4.4",
    "reviewsCount": 41,
    "badge": null,
    "discount": 23,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "50m Garden Hose + Wall Reel + Spray Gun",
        "shortDescription": "50m • Reel • 7 spray patterns",
        "description": "50m braided hose + wall-mounted reel + 7-pattern spray gun + fittings. Kink-resistant, 5-year warranty."
      }
    }
  },
  {
    "slug": "salon-jardin-4places",
    "name": "طقم أثاث حديقة من الراتنج لأربعة أشخاص",
    "reference": "JAR-SAL04",
    "shortDescription": "4 مقاعد • وسائد • مقاوم للأشعة فوق البنفسجية",
    "description": "طقم حديقة من الراتنج المضفور لأربعة أشخاص: أريكة وكرسيان وطاولة، مع الوسائد. مقاوم للأشعة فوق البنفسجية.",
    "price": "1450.00",
    "oldPrice": "1790.00",
    "categoryId": 11,
    "brandId": 12,
    "image": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=70&auto=format&fit=crop",
    "stock": 8,
    "rating": "4.8",
    "reviewsCount": 26,
    "badge": "خارجي",
    "discount": 19,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "4-Seat Resin Garden Lounge Set",
        "shortDescription": "4 seats • Cushions • UV-resistant",
        "description": "Woven resin garden set for four: sofa, two armchairs and table, cushions included. UV-resistant.",
        "badge": "OUTDOOR"
      }
    }
  },
  {
    "slug": "kit-securite-chantier",
    "name": "طقم السلامة للورشة: خوذة + نظارات + قفازات",
    "reference": "SEC-KIT01",
    "shortDescription": "خوذة + نظارات + قفازات",
    "description": "طقم سلامة الورشة: خوذة قابلة للضبط، نظارات واقية من الرذاذ، قفازات جلدية، وسترة عاكسة صفراء. مطابق لمعايير CE.",
    "price": "65.00",
    "oldPrice": "89.00",
    "categoryId": 12,
    "brandId": 4,
    "image": "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=500&q=70&auto=format&fit=crop",
    "stock": 200,
    "rating": "4.7",
    "reviewsCount": 112,
    "badge": null,
    "discount": 27,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Site Safety Kit: Helmet + Goggles + Gloves",
        "shortDescription": "Helmet + goggles + gloves",
        "description": "Site safety kit: adjustable helmet, anti-splash goggles, leather gloves and high-visibility vest. CE compliant."
      }
    }
  },
  {
    "slug": "chaussures-securite-s3",
    "name": "حذاء أمان S3 بمقدمة فولاذية (المقاسات 40-45)",
    "reference": "SEC-CHS3",
    "shortDescription": "S3 • فولاذ • مضاد للثقب",
    "description": "حذاء أمان S3 بمقدمة فولاذية تتحمل 200 جول، ونعل مضاد للثقب، وجلد نوبك. المقاسات من 40 إلى 45.",
    "price": "165.00",
    "oldPrice": "215.00",
    "categoryId": 12,
    "brandId": 4,
    "image": "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=500&q=70&auto=format&fit=crop",
    "stock": 90,
    "rating": "4.6",
    "reviewsCount": 68,
    "badge": null,
    "discount": 23,
    "isNew": true,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "S3 Safety Shoes with Steel Toe, Sizes 40–45",
        "shortDescription": "S3 • Steel • Puncture-resistant",
        "description": "S3 safety shoes with 200J steel toe cap, puncture-resistant sole, nubuck leather. Sizes 40 to 45."
      }
    }
  },
  {
    "slug": "extincteur-6kg",
    "name": "طفاية حريق بودرة 6 كغ مع حامل",
    "reference": "SEC-EXT6",
    "shortDescription": "6 كغ • ABC • حامل",
    "description": "طفاية حريق بودرة ABC سعة 6 كغ مع مقياس الضغط وحامل حائطي. للمنزل والمحل والورشة. مُفحوصة.",
    "price": "145.00",
    "oldPrice": "185.00",
    "categoryId": 12,
    "brandId": 9,
    "image": "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500&q=70&auto=format&fit=crop",
    "stock": 60,
    "rating": "4.8",
    "reviewsCount": 44,
    "badge": "أمان",
    "discount": 22,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": true,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "6kg Powder Fire Extinguisher + Bracket",
        "shortDescription": "6kg • ABC • Bracket",
        "description": "6kg ABC powder fire extinguisher with pressure gauge and wall bracket. For home, shop or site. Inspected.",
        "badge": "SAFETY"
      }
    }
  },
  {
    "slug": "echelle-alu-2x12",
    "name": "سلم ألومنيوم قابل للتحويل 2×12 درجة بطول 6 م",
    "reference": "SEC-ECH12",
    "shortDescription": "6 م • 150 كغ • ألومنيوم",
    "description": "سلم ألومنيوم قابل للتحويل 2×12 درجة، 6 أمتار مفرودة، حمولة 150 كغ، مع مثبّت. للمحترفين وللمنزل.",
    "price": "395.00",
    "oldPrice": "495.00",
    "categoryId": 12,
    "brandId": 4,
    "image": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=70&auto=format&fit=crop",
    "stock": 28,
    "rating": "4.5",
    "reviewsCount": 37,
    "badge": null,
    "discount": 20,
    "isNew": false,
    "isPromo": true,
    "isBestSeller": false,
    "isFlash": false,
    "i18n": {
      "en": {
        "name": "Aluminium Multi-Purpose Ladder 2x12 Rungs 6m",
        "shortDescription": "6m • 150kg • Aluminium",
        "description": "Convertible aluminium ladder 2x12 rungs, 6m extended, 150kg load capacity, with stabiliser. For pros & home use."
      }
    }
  }
] satisfies SeedProduct[];
