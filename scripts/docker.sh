#!/bin/bash

# Scripts de gestion Docker pour CoworkSpace

case "$1" in
  "dev")
    echo "🚀 Démarrage en mode développement..."
    docker-compose -f docker-compose.dev.yml up --build
    ;;
  "prod")
    echo "🚀 Démarrage en mode production..."
    docker-compose up --build -d
    ;;
  "stop")
    echo "⏹️ Arrêt des conteneurs..."
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    ;;
  "clean")
    echo "🧹 Nettoyage des conteneurs et volumes..."
    docker-compose down -v --rmi all
    docker-compose -f docker-compose.dev.yml down -v --rmi all
    docker system prune -f
    ;;
  "logs")
    echo "📋 Affichage des logs..."
    docker-compose logs -f
    ;;
  "db")
    echo "🗄️ Connexion à la base de données..."
    docker exec -it coworkspace-db-dev mongosh -u admin -p password
    ;;
  *)
    echo "Usage: $0 {dev|prod|stop|clean|logs|db}"
    echo ""
    echo "Commandes disponibles:"
    echo "  dev    - Démarrer en mode développement"
    echo "  prod   - Démarrer en mode production"
    echo "  stop   - Arrêter tous les conteneurs"
    echo "  clean  - Nettoyer conteneurs et volumes"
    echo "  logs   - Afficher les logs"
    echo "  db     - Se connecter à la base de données"
    ;;
esac