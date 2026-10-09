/**
 * Remplit la base avec les données de démonstration (remplace l'ancien seed.sql, supprimé).
 * Usage : npm run db:seed   (DATABASE_URL doit être défini ; le schéma doit exister : npm run db:push)
 */
import "dotenv/config";
import { db, pool } from "../src/db";
import { brands, categories, products, slides, stores } from "../src/db/schema";
import { seedBrands, seedCategories, seedSlides, seedStores } from "../src/db/seed/catalog";
import { seedProducts } from "../src/db/seed/products";

async function main() {
  // Seuls le catalogue et les diaporamas/magasins sont remplacés.
  // Commandes, newsletter, textes et paramètres ne sont jamais effacés.
  console.log("Vidage des tables de catalogue…");
  await db.delete(products);
  await db.delete(categories);
  await db.delete(brands);
  await db.delete(slides);
  await db.delete(stores);

  await db.insert(categories).values(seedCategories);
  await db.insert(brands).values(seedBrands);
  await db.insert(slides).values(seedSlides);
  await db.insert(stores).values(seedStores);
  await db.insert(products).values(seedProducts);

  console.log(`OK : ${seedCategories.length} rayons, ${seedBrands.length} marques, ${seedSlides.length} diapositives, ${seedStores.length} magasins, ${seedProducts.length} produits.`);
  await pool.end();
}

main().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});
