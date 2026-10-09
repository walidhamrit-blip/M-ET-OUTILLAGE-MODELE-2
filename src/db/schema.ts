import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  numeric,
  jsonb,
  customType,
} from "drizzle-orm/pg-core";

/**
 * Convention de traduction
 * ------------------------
 * Les colonnes "de base" (name, description, address, ...) contiennent la langue
 * principale : l'arabe. La colonne `i18n` contient les traductions anglaises sous
 * la forme `{ en: { <champ>: valeur } }`. Un champ vide retombe sur l'arabe.
 */
export type I18nOverrides<T> = { en?: Partial<T> };

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  icon: varchar("icon", { length: 60 }),
  image: text("image"),
  parentId: integer("parent_id"),
  order: integer("order").default(0),
  featured: boolean("featured").default(false),
  productCount: integer("product_count").default(0),
  subcategories: jsonb("subcategories").$type<string[]>().default([]),
  i18n: jsonb("i18n").$type<I18nOverrides<{ name: string; subcategories: string[] }>>(),
});

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  logo: text("logo"),
  color: varchar("color", { length: 20 }).default("#2f3d4c"),
  featured: boolean("featured").default(false),
});

export type ProductI18n = {
  name: string;
  shortDescription: string;
  description: string;
  badge: string;
  specs: Record<string, string>;
};

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  reference: varchar("reference", { length: 60 }),
  description: text("description"),
  shortDescription: varchar("short_description", { length: 500 }),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  oldPrice: numeric("old_price", { precision: 12, scale: 2 }),
  categoryId: integer("category_id"),
  brandId: integer("brand_id"),
  image: text("image"),
  images: jsonb("images").$type<string[]>(),
  stock: integer("stock").default(50),
  rating: numeric("rating", { precision: 2, scale: 1 }).default("4.5"),
  reviewsCount: integer("reviews_count").default(12),
  badge: varchar("badge", { length: 40 }),
  discount: integer("discount").default(0),
  isNew: boolean("is_new").default(false),
  isPromo: boolean("is_promo").default(false),
  isBestSeller: boolean("is_best_seller").default(false),
  isFlash: boolean("is_flash").default(false),
  specs: jsonb("specs").$type<Record<string, string>>(),
  i18n: jsonb("i18n").$type<I18nOverrides<ProductI18n>>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type SlideI18n = { title: string; subtitle: string };

export const slides = pgTable("slides", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  subtitle: varchar("subtitle", { length: 255 }),
  image: text("image"),
  mobileImage: text("mobile_image"),
  link: varchar("link", { length: 255 }),
  bgColor: varchar("bg_color", { length: 20 }),
  order: integer("order").default(0),
  active: boolean("active").default(true),
  i18n: jsonb("i18n").$type<I18nOverrides<SlideI18n>>(),
});

export type StoreI18n = { address: string; hours: string; tag: string; city: string };

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 80 }).default("Tripoli"),
  phone: varchar("phone", { length: 40 }),
  hours: varchar("hours", { length: 120 }),
  lat: numeric("lat", { precision: 10, scale: 6 }),
  lng: numeric("lng", { precision: 10, scale: 6 }),
  image: text("image"),
  tag: varchar("tag", { length: 80 }),
  order: integer("order").default(0),
  i18n: jsonb("i18n").$type<I18nOverrides<StoreI18n>>(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 30 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 150 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 40 }).notNull(),
  customerEmail: varchar("customer_email", { length: 150 }),
  city: varchar("city", { length: 80 }),
  address: text("address"),
  notes: text("notes"),
  paymentMethod: varchar("payment_method", { length: 50 }).default("cod"),
  subtotal: numeric("subtotal", { precision: 12, scale: 2 }),
  delivery: numeric("delivery", { precision: 12, scale: 2 }).default("0"),
  total: numeric("total", { precision: 12, scale: 2 }),
  status: varchar("status", { length: 30 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id"),
  productName: varchar("product_name", { length: 255 }),
  productImage: text("product_image"),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 12, scale: 2 }),
});

export const newsletter = pgTable("newsletter", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

/** Surcharges des textes de l'interface (seules les valeurs modifiées sont stockées). */
export const uiTexts = pgTable("ui_texts", {
  key: varchar("key", { length: 160 }).primaryKey(),
  ar: text("ar"),
  en: text("en"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/** Paramètres du site (entreprise, livraison, accueil...), une ligne par clé. */
export const settings = pgTable("settings", {
  key: varchar("key", { length: 80 }).primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/** Images téléversées depuis l'administration. */
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(),
  mime: varchar("mime", { length: 60 }).notNull(),
  size: integer("size").notNull(),
  data: bytea("data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/** Demandes envoyées depuis le formulaire de contact ou la demande de devis entreprise. */
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  kind: varchar("kind", { length: 20 }).notNull().default("contact"),
  fullName: varchar("full_name", { length: 150 }).notNull(),
  company: varchar("company", { length: 150 }),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: varchar("email", { length: 150 }),
  subject: varchar("subject", { length: 120 }),
  message: text("message").notNull(),
  handled: boolean("handled").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
