/**
 * Crédit de réalisation « Website by Nukhba » à poser dans le pied de page.
 * Extrait officiel : https://nokhba.net.ly/badge
 * Variante claire du SVG, prévue pour les pieds de page sombres.
 */
const BADGE_HREF = "https://nokhba.net.ly/badge";
const BADGE_SRC = "https://nokhba.net.ly/badge/nukhba-badge-light.svg";

export default function NukhbaBadge() {
  return (
    <a
      href={BADGE_HREF}
      target="_blank"
      rel="sponsored nofollow noopener"
      title="نخبة"
      className="inline-flex flex-col items-center gap-1.5 group"
    >
      <img
        src={BADGE_SRC}
        alt="نخبة | Website by Nukhba"
        width={176}
        height={44}
        loading="lazy"
        decoding="async"
        className="block w-[176px] h-auto"
      />
      <span className="text-[12px] leading-[1.4] text-[#9C9A94] group-hover:text-white transition">
        نخبة · Website by Nukhba
      </span>
    </a>
  );
}
