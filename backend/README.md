# CoworkSpace Backend 

## Base de données (MongoDB) et ORM (Prisma)

- Installer Prisma
```shell
- npm -i @prisma/client
```
- Initialiser Prisma
```shell
npx prisma init
```

- Générer les fichiers de migration
```shell
npx prisma migrate
```

- Pour mettre à jour la base de données
```shell
npx prisma db push
```

## API (TypeScript)

API REST TypeScript pour la plateforme de coworking CoworkSpace, développée avec une architecture en couches et un typage strict.

### 🏗️ Architecture

Ce projet suit une **architecture en couches** (layered architecture) avec **TypeScript** :

```
/backend
  /domain             # Couche domaine - logique métier
    /entities         # Entités métier (Member.ts)
    /interfaces       # Contrats des repositories (.ts)
    /services         # Services métier (.ts)

  /application        # Couche application - cas d'utilisation
    /dto              # Data Transfer Objects (.ts)
    /use-cases        # Cas d'utilisation spécifiques (.ts)
    /services         # Services d'orchestration (.ts)

  /infrastructure     # Couche infrastructure - implémentation technique
    /repositories     # Implémentation des repositories (.ts)
    /database         # Configuration base de données (.ts)
    /auth             # Services d'authentification (.ts)

  /presentation       # Couche présentation - interface HTTP
    /controllers      # Contrôleurs REST (.ts)
    /routes           # Définition des routes (.ts)
    /middlewares      # Middlewares Express (.ts)

  server.ts           # Point d'entrée
  tsconfig.json       # Configuration TypeScript
```

### 🚀 Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd coworkspace-backend-ts
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
Créer un fichier `.env` :
```env
# Serveur
PORT=3000
NODE_ENV=development

# Base de données
DATABASE_URL=mongodb://localhost:27017/coworkspace
# ou pour PostgreSQL/MySQL :
# DATABASE_URL=postgresql://user:password@localhost:5432/coworkspace

# JWT
JWT_SECRET=votre_secret_jwt_super_securise
JWT_EXPIRES_IN=24h

# Frontend
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173,http://localhost:3001

# TypeScript
TS_NODE_PROJECT=./tsconfig.json
```

4. **Vérification TypeScript**
```bash
# Vérifier les types sans compiler
npm run type-check

# Compiler le projet
npm run build
```

5. **Démarrer le serveur**
```bash
# Mode développement avec rechargement automatique (TypeScript)
npm run dev

# Mode développement avec watch
npm run dev:watch

# Mode production (après build)
npm start
```

### 📋 Fonctionnalités à implémenter

#### TypeScript & Typage
- [x] Configuration TypeScript stricte
- [x] Interfaces et types pour toutes les entités
- [x] DTOs typés pour les requêtes/réponses
- [ ] Validation avec class-validator
- [ ] Transformations avec class-transformer

#### Authentification
- [x] Structure des middlewares d'authentification typés
- [ ] Implémentation JWT avec types
- [ ] Hashage des mots de passe avec bcrypt
- [ ] Protection des routes avec types

#### Gestion des membres
- [x] Entité Member avec types stricts
- [x] Interface MemberRepository typée
- [x] Contrôleur avec DTOs typés
- [ ] CRUD complet des membres
- [ ] Filtrage par profession, type d'abonnement
- [ ] Membre aléatoire pour networking
- [ ] Validation des données avec types

#### Base de données
- [ ] Configuration MongoDB ou SQL avec types
- [ ] Modèles de données TypeScript
- [ ] Repository patterns typés
- [ ] Migrations/seeders

### 🛠️ Commandes disponibles

```bash
# Développement TypeScript
npm run dev              # Démarrer avec ts-node-dev
npm run dev:watch        # Avec surveillance des fichiers
npm run type-check       # Vérifier les types
npm run type-check:watch # Vérification continue

# Build et production
npm run build            # Compiler TypeScript -> JavaScript
npm start                # Démarrer la version compilée
npm run clean            # Nettoyer le dossier dist/

# Qualité de code
npm run lint             # Vérifier avec ESLint
npm run lint:fix         # Corriger automatiquement
npm run format           # Formater avec Prettier
npm run format:check     # Vérifier le formatage

# Tests
npm test                 # Lancer les tests TypeScript
npm run test:watch       # Tests en mode watch
npm run test:coverage    # Coverage des tests
npm run test:ci          # Tests pour CI/CD
```

### 📚 API Endpoints

#### Authentification
```typescript
POST /api/auth/login     // Connexion
GET  /api/auth/me        // Profil utilisateur
```

#### Membres
```typescript
GET    /api/members           // Liste des membres
GET    /api/members/random    // Membre aléatoire
GET    /api/members/filter    // Filtrer les membres
GET    /api/members/stats     // Statistiques communauté
GET    /api/members/:id       // Membre par ID
POST   /api/members           // Créer un membre (admin)
PUT    /api/members/:id       // Modifier un membre
DELETE /api/members/:id       // Supprimer un membre (admin)
```

#### Utilitaires
```typescript
GET /api                 // Information API
GET /api/health          // Health check
GET /api/metrics         // Métriques serveur
GET /api/docs            // Documentation (dev only)
```

### 🔒 Sécurité TypeScript

- **Typage strict** : Configuration TypeScript stricte activée
- **Validation** : Types pour toutes les entrées/sorties
- **Interfaces** : Contrats typés pour tous les services
- **DTOs** : Objets de transfert de données typés
- **Middlewares** : Authentification et autorisation typées

### 🧪 Tests TypeScript

Structure des tests recommandée :
```
/tests
  /unit              # Tests unitaires TypeScript
    /domain          # Tests des entités et services
    /application     # Tests des cas d'utilisation
  /integration       # Tests d'intégration
  /e2e              # Tests end-to-end
  jest.setup.ts          # Configuration des tests
```

Configuration Jest pour TypeScript :
- Preset `ts-jest`
- Support des modules ES6
- Coverage des fichiers TypeScript
- Types Jest inclus

### 📝 Bonnes pratiques TypeScript

1. **Typage strict** : Utilisez `strict: true` dans tsconfig.json
2. **Interfaces explicites** : Définissez des interfaces pour tous les contrats
3. **Types utilitaires** : Utilisez `Partial<T>`, `Omit<T, K>`, `Pick<T, K>`
4. **Validation runtime** : Combinez types TypeScript avec validation runtime
5. **DTOs typés** : Séparez les types de domaine des types d'API
6. **Gestion d'erreurs** : Créez des types d'erreurs spécifiques
7. **Configuration ESLint** : Règles TypeScript strictes activées

### 🎯 Objectifs pédagogiques TypeScript

- Comprendre l'architecture en couches avec TypeScript
- Maîtriser le typage strict et les interfaces
- Implémenter des patterns typés (Repository, Service)
- Gérer l'authentification JWT avec types
- Appliquer les principes SOLID avec TypeScript
- Écrire du code type-safe et maintenable
- Utiliser les outils de développement TypeScript

### 📖 Ressources TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express avec TypeScript](https://expressjs.com/en/guide/writing-middleware.html)
- [Architecture Clean TypeScript](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Jest avec TypeScript](https://jestjs.io/docs/getting-started#using-typescript)
- [ESLint TypeScript](https://typescript-eslint.io/)

### ⚡ Avantages TypeScript

- **Type Safety** : Détection d'erreurs à la compilation
- **IntelliSense** : Autocomplétion et navigation améliorées
- **Refactoring** : Refactorisation sûre et automatisée
- **Documentation** : Types comme documentation vivante
- **Maintenabilité** : Code plus robuste et évolutif
- **Équipe** : Meilleure collaboration grâce aux contrats typés

---

**Bon développement avec TypeScript ! 🚀**
