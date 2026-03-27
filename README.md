# Backend - Mini Service de Messages

Ce dossier contient le serveur Node.js/Express qui gère l'API de messagerie.

## Contenu
- `index.js` : code du serveur
- `package.json` : dépendances

## Lancement
Installer les dépendances puis lancer le serveur :

```
npm install
node index.js
```

## Fonctionnalités
- Stockage des messages en mémoire (tableau)
- API REST pour récupérer, ajouter, supprimer des messages
- Micro-service compteur (routes /cpt)

Le serveur écoute sur le port 8080.
