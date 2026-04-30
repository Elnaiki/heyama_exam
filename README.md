# Heyama Naiki prospere

## Stack technique
**API** : NestJS + MongoDB Atlas + Cloudflare R2 + Socket.IO
**Web** : Next.js + shadcn/ui + Socket.IO
**Mobile** : React Native + Expo + Socket.IO

## Prérequis
Node.js v18+
Expo Go sur le téléphone

## Lancer le projet

### 1. API NestJS
```bash
cd api
npm install
npm run start:dev
```
API disponible sur http://localhost:3000

### 2. Web Next.js
```bash
cd web
npm install
npm run dev
```
Web disponible sur http://localhost:3000

### 3. Mobile Expo
```bash
cd mobile
npm install
npx expo start
```
Scanner le QR code avec Expo Go

## Fonctionnalités
- Créer un objet (titre, description, image)
- Lister les objets
- Voir le détail d'un objet
- Supprimer un objet
- Temps réel Socket.IO (création + suppression)
- Upload images vers Cloudflare R2

## Variables d'environnement
Le fichier `.env` est disponible dans le dossier `api/`.