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
} from "drizzle-orm/pg-core";

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
});

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  logo: text("logo"),
  featured: boolean("featured").default(false),
});

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
  createdAt: timestamp("created_at").defaultNow(),
});

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
});

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 80 }).default("Tripoli"),
  phone: varchar("phone", { length: 40 }),
  hours: varchar("hours", { length: 120 }),
  lat: numeric("lat", { precision: 10, scale: 6 }),
  lng: numeric("lng", { precision: 10, scale: 6 }),
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
