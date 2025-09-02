# Makefile pour CoworkSpace - Gestion Docker simplifiée

.PHONY: help dev prod stop clean logs db test install

# Couleurs pour l'affichage
GREEN=\033[0;32m
YELLOW=\033[1;33m
RED=\033[0;31m
NC=\033[0m # No Color

# Afficher l'aide
help:
	@echo "$(GREEN)CoworkSpace - Commandes Docker disponibles:$(NC)"
	@echo ""
	@echo "$(YELLOW)🚀 Démarrage:$(NC)"
	@echo "  make dev     - Démarrer en mode développement (hot reload)"
	@echo "  make prod    - Démarrer en mode production"
	@echo ""
	@echo "$(YELLOW)⚙️ Gestion:$(NC)"
	@echo "  make stop    - Arrêter tous les conteneurs"
	@echo "  make clean   - Nettoyer conteneurs, volumes et images"
	@echo "  make restart - Redémarrer tous les services"
	@echo ""
	@echo "$(YELLOW)📊 Monitoring:$(NC)"
	@echo "  make logs    - Afficher les logs en temps réel"
	@echo "  make status  - Voir le statut des conteneurs"
	@echo ""
	@echo "$(YELLOW)🗄️ Base de données:$(NC)"
	@echo "  make db      - Se connecter à MongoDB"
	@echo "  make db-gui  - Ouvrir Adminer (interface web DB)"
	@echo ""
	@echo "$(YELLOW)🧪 Tests et qualité:$(NC)"
	@echo "  make test    - Lancer les tests"
	@echo "  make lint    - Vérifier le code"
	@echo "  make install - Installer les dépendances"

# Mode développement avec hot reload
dev:
	@echo "$(GREEN)🚀 Démarrage en mode développement...$(NC)"
	@docker-compose -f docker-compose.dev.yml up --build
	@echo "$(GREEN)✅ Services démarrés !$(NC)"
	@echo "$(YELLOW)🌐 Frontend: http://localhost:5173$(NC)"
	@echo "$(YELLOW)🔌 API: http://localhost:3000/api$(NC)"
	@echo "$(YELLOW)🗄️ Adminer: http://localhost:8080$(NC)"

# Mode production
prod:
	@echo "$(GREEN)🚀 Démarrage en mode production...$(NC)"
	@docker-compose up --build -d
	@echo "$(GREEN)✅ Application démarrée !$(NC)"
	@echo "$(YELLOW)🌐 Frontend: http://localhost:3001$(NC)"
	@echo "$(YELLOW)🔌 API: http://localhost:3000/api$(NC)"

# Arrêter tous les services
stop:
	@echo "$(YELLOW)⏹️ Arrêt des conteneurs...$(NC)"
	@docker-compose down
	@docker-compose -f docker-compose.dev.yml down
	@echo "$(GREEN)✅ Tous les conteneurs arrêtés$(NC)"

# Redémarrer tous les services
restart: stop dev

# Nettoyer complètement
clean:
	@echo "$(RED)🧹 Nettoyage des conteneurs et volumes...$(NC)"
	@docker-compose down -v --rmi all
	@docker-compose -f docker-compose.dev.yml down -v --rmi all
	@docker system prune -f
	@echo "$(GREEN)✅ Nettoyage terminé$(NC)"

# Afficher les logs en temps réel
logs:
	@echo "$(YELLOW)📋 Logs en temps réel (Ctrl+C pour arrêter):$(NC)"
	@docker-compose logs -f

# Voir le statut des conteneurs
status:
	@echo "$(YELLOW)📊 Statut des conteneurs:$(NC)"
	@docker-compose ps

# Se connecter à MongoDB
db:
	@echo "$(YELLOW)🗄️ Connexion à MongoDB...$(NC)"
	@docker exec -it coworkspace-db-dev mongosh -u admin -p password

# Ouvrir Adminer (interface web pour la DB)
db-gui:
	@echo "$(YELLOW)🌐 Ouverture d'Adminer...$(NC)"
	@echo "$(GREEN)Interface disponible sur: http://localhost:8080$(NC)"
	@echo "$(YELLOW)Serveur: database$(NC)"
	@echo "$(YELLOW)Utilisateur: admin$(NC)"
	@echo "$(YELLOW)Mot de passe: password$(NC)"

# Lancer les tests
test:
	@echo "$(YELLOW)🧪 Lancement des tests...$(NC)"
	@docker-compose exec backend npm run test

# Vérifier le code (lint)
lint:
	@echo "$(YELLOW)🔍 Vérification du code...$(NC)"
	@docker-compose exec backend npm run lint

# Installer les dépendances
install:
	@echo "$(YELLOW)📦 Installation des dépendances...$(NC)"
	@docker-compose exec backend npm install
	@docker-compose exec frontend npm install

# Construire les images sans démarrer
build:
	@echo "$(YELLOW)🔨 Construction des images Docker...$(NC)"
	@docker-compose build

# Voir les logs d'un service spécifique
logs-backend:
	@docker-compose logs -f backend

logs-frontend:
	@docker-compose logs -f frontend

logs-db:
	@docker-compose logs -f database

# Commandes de maintenance
backup-db:
	@echo "$(YELLOW)💾 Sauvegarde de la base de données...$(NC)"
	@docker exec coworkspace-db-dev mongodump --username admin --password password --authenticationDatabase admin --out /backup
	@docker cp coworkspace-db-dev:/backup ./backup-$(shell date +%Y%m%d-%H%M%S)

# Mise à jour des images
update:
	@echo "$(YELLOW)🔄 Mise à jour des images Docker...$(NC)"
	@docker-compose pull
	@docker-compose build --pull

# Afficher les informations système Docker
info:
	@echo "$(YELLOW)ℹ️ Informations Docker:$(NC)"
	@echo "$(GREEN)Images CoworkSpace:$(NC)"
	@docker images | grep coworkspace
	@echo ""
	@echo "$(GREEN)Volumes CoworkSpace:$(NC)"
	@docker volume ls | grep coworkspace
	@echo ""
	@echo "$(GREEN)Réseaux CoworkSpace:$(NC)"
	@docker network ls | grep coworkspace
