/**
 * Paramètres du site, modifiables depuis l'administration.
 * Ce module ne dépend pas de la base de données : il peut être importé côté client.
 */
export type Bilingual = { ar: string; en: string };

export type HomeTile = {
  img: string;
  link: string;
  tag: string;
  title: Bilingual;
  desc: Bilingual;
};

export type SiteSettings = {
  company: {
    name: string;
    phone: string;
    emailContact: string;
    emailQuotes: string;
    emailHR: string;
    address: Bilingual;
  };
  delivery: {
    fee: number;
    freeThreshold: number;
  };
  home: {
    bannerImage: string;
    storeImage: string;
    tiles: HomeTile[];
  };
};

export const DEFAULT_SETTINGS: SiteSettings = {
  company: {
    name: "TRIPO-TECH",
    phone: "+218 21 444 44 44",
    emailContact: "contact@tripo-tech.ly",
    emailQuotes: "devis@tripo-tech.ly",
    emailHR: "rh@tripo-tech.ly",
    address: {
      ar: "طريق المطار، كم 7، طرابلس، ليبيا",
      en: "Airport Road, Km 7, Tripoli, Libya",
    },
  },
  delivery: {
    fee: 25,
    freeThreshold: 500,
  },
  home: {
    bannerImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=70&auto=format&fit=crop",
    storeImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=70&auto=format&fit=crop",
    tiles: [
      {
        img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=70&auto=format&fit=crop",
        link: "/categorie/outillage-electrique",
        tag: "-30%",
        title: { ar: "أدوات احترافية", en: "Pro Tools" },
        desc: { ar: "مثاقب، مطاحن، حقائب أدوات", en: "Drills, grinders, toolkits" },
      },
      {
        img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=70&auto=format&fit=crop",
        link: "/categorie/peinture-droguerie",
        tag: "TOP",
        title: { ar: "دهانات وديكور", en: "Paint & Decor" },
        desc: { ar: "Jotun وCoral وSika", en: "Jotun, Coral, Sika" },
      },
      {
        img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=70&auto=format&fit=crop",
        link: "/categorie/groupes-electrogenes",
        tag: "-15%",
        title: { ar: "مولدات الكهرباء", en: "Generators" },
        desc: { ar: "لا تبقَ بدون كهرباء أبداً", en: "Never be left without power" },
      },
    ],
  },
};

type Partialish<T> = { [K in keyof T]?: Partial<T[K]> };

/** Fusionne les valeurs enregistrées avec les valeurs par défaut (au premier niveau de chaque section). */
export function mergeSettings(stored: Partialish<SiteSettings> | null | undefined): SiteSettings {
  const base = DEFAULT_SETTINGS;
  if (!stored) return structuredClone(base);
  return {
    company: { ...base.company, ...(stored.company ?? {}) } as SiteSettings["company"],
    delivery: { ...base.delivery, ...(stored.delivery ?? {}) } as SiteSettings["delivery"],
    home: {
      ...base.home,
      ...(stored.home ?? {}),
      tiles: stored.home?.tiles ?? base.home.tiles,
    } as SiteSettings["home"],
  };
}
