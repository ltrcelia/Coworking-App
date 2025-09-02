// Script d'initialisation MongoDB pour CoworkSpace

// Créer la base de données
db = db.getSiblingDB('coworkspace');

// Créer un utilisateur pour l'application
db.createUser({
  user: 'coworkspace_user',
  pwd: 'coworkspace_password',
  roles: [
    {
      role: 'readWrite',
      db: 'coworkspace'
    }
  ]
});

// Créer les collections
db.createCollection('members');

// Insérer les données initiales depuis le fichier JSON
// (Les données du fichier data/members.json seront chargées automatiquement)

print('✅ Base de données CoworkSpace initialisée');