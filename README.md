# TRIPO-TECH — boutique et administration

Site de matériaux de construction et d'outillage (Tripoli, Libye).

- **Langue** : arabe par défaut (mise en page RTL), anglais en secondaire. Le choix est mémorisé dans un cookie (`tt_lang`).
- **Thème** : clair ou sombre, mémorisé dans un cookie (`tt_theme`).
- **Administration** : `/admin` (mot de passe via `ADMIN_PASSWORD`). Textes du site, paramètres et accueil, diaporama, rayons, produits (images, prix, stock, descriptions, caractéristiques), marques, magasins, commandes, newsletter.

## Installation

```bash
npm install
cp .env.example .env          # puis renseigner DATABASE_URL et ADMIN_PASSWORD
npm run db:push               # crée / met à jour le schéma PostgreSQL
npm run db:seed               # données de démonstration (catalogue, rayons, magasins)
npm run dev                   # développement (http://localhost:3000)
```

En production : `npm run build` puis `npm run start`, avec `ADMIN_PASSWORD` défini (sinon l'administration est désactivée).
En développement sans `ADMIN_PASSWORD`, le mot de passe par défaut est `admin`.

## Données et traductions

- Les colonnes de base (nom, description, adresse…) contiennent l'arabe ; la colonne `i18n` contient l'anglais (`{ "en": { ... } }`). Un champ anglais vide retombe sur l'arabe.
- Les textes de l'interface sont définis dans `src/i18n/texts.ts` (clé → [groupe, arabe, anglais]). L'administration n'enregistre que les textes modifiés ; « Rétablir » restaure la valeur d'origine.
- Les paramètres (coordonnées, frais de livraison, seuil de livraison gratuite, visuels et tuiles d'accueil) sont en base, table `settings`.
- `npm run db:seed` remplace le catalogue, les rayons, les marques, le diaporama et les magasins. Commandes, newsletter, textes et paramètres ne sont pas effacés.

## Structure

- `src/app/(store)/` : pages de la boutique. `src/app/admin/` : administration (`(panel)` est protégé par session).
- `src/app/api/` : API publique (produits, commandes, newsletter, médias) et `api/admin/*` (session requise).
- `src/i18n/` : langues, textes, dictionnaire et provider côté client.
- `src/components/admin/` : composants de l'administration.

## Limites connues

- Les formulaires de contact, de compte et de demande de devis enregistrent la saisie côté navigateur uniquement : leur envoi n'est pas encore relié à un traitement serveur.
- Les images de démonstration proviennent d'Unsplash ; elles se remplacent depuis l'administration.
- La structure des pages (ordre des sections) n'est pas modifiable depuis l'administration ; tous les textes, images et réglages le sont.
