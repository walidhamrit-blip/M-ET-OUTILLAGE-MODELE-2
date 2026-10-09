import ListingClient from "@/components/ListingClient";
import { getI18n } from "@/i18n/server";

export const dynamic = "force-dynamic";

export default async function PromotionsPage() {
  const { t } = await getI18n();
  return <ListingClient initialFlag="promo" title={t("home.promosTitle")} />;
}
