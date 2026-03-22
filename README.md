# Le Palais du Plaisir - Cercle Privé 🌹

Bienvenue dans un univers sensuel, premium et mystérieux. Ce site est conçu pour offrir une expérience immersive type club privé / cercle exclusif.

## ✨ Caractéristiques

- **Authentification Discord** : Connexion sécurisée via OAuth2.
- **Dashboard Immersif** : Profil personnalisé avec bannières style velours et avatars avec glow doré.
- **Système de Marques (Tags)** : Exprimez votre identité avec des tags élégants et éditables.
- **Rôles Exclusifs** : Badges automatiques (VIP, Élite, Âme tentée).
- **Design Premium** : Noir profond, rouge intense, touches dorées et animations fluides (Framer Motion).
- **100% Responsive** : Expérience optimisée pour PC, tablette et mobile.

## 🛠️ Stack Technique

- **Framework** : Next.js 16 (App Router)
- **Style** : Tailwind CSS 4
- **Base de données** : PostgreSQL avec Prisma
- **Auth** : NextAuth.js
- **Animations** : Framer Motion
- **Icônes** : Lucide React & React Icons

## 🚀 Installation

1. **Cloner le projet** :
   ```bash
   git clone <repository-url>
   cd site_plsr
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env` à la racine (utilisez `.env.example` comme modèle) :
   ```env
   DATABASE_URL="votre_url_postgresql"
   NEXTAUTH_SECRET="votre_secret"
   NEXTAUTH_URL="http://localhost:3000"
   DISCORD_CLIENT_ID="votre_client_id"
   DISCORD_CLIENT_SECRET="votre_client_secret"
   ```

4. **Initialiser la base de données** :
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

## 🎨 Direction Artistique

- **Couleurs** : Noir profond (`#0a0a0a`), Rouge intense (`#8b0000`), Or (`#d4af37`).
- **Typographies** : *Playfair Display* pour l'élégance des titres, *Inter* pour la modernité du texte.
- **Effets** : Glassmorphism, Soft Glow, Soft Blur.

---
*Le désir a son royaume, et vous venez d'en trouver la clé.*
