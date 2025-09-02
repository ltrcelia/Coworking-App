# Multi-stage build pour optimiser la taille de l'image
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY tsconfig.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Compiler TypeScript
RUN npm run build

# Stage de production
FROM node:18-alpine AS production

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S coworkspace -u 1001

# Définir le répertoire de travail
WORKDIR /app

# Copier les dépendances depuis le stage builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Changer le propriétaire des fichiers
RUN chown -R coworkspace:nodejs /app
USER coworkspace

# Exposer le port
EXPOSE 3000

# Commande de santé
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Commande de démarrage
CMD ["node", "dist/server.js"]