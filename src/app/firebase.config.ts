/**
 * Configuration Firebase du site IRAF.
 *
 * Pour activer la persistance des données (articles, chercheurs) et la page
 * admin, crée un projet Firebase gratuit (plan Spark, aucune carte bancaire
 * requise) puis remplace les valeurs ci-dessous par celles de ton projet :
 *
 *   1. https://console.firebase.google.com/ → "Ajouter un projet"
 *   2. Dans le projet : icône "</>" (Ajouter une application Web) → copie
 *      l'objet firebaseConfig fourni et colle-le ci-dessous.
 *   3. Activer "Firestore Database" (mode production) et "Authentication"
 *      → méthode "E-mail/Mot de passe" → créer ton compte admin.
 *   4. Dans Firestore → Règles, restreindre l'écriture aux utilisateurs
 *      authentifiés uniquement (lecture publique) :
 *
 *      rules_version = '2';
 *      service cloud.firestore {
 *        match /databases/{database}/documents {
 *          match /{document=**} {
 *            allow read: if true;
 *            allow write: if request.auth != null;
 *          }
 *        }
 *      }
 *
 * Tant que ces valeurs restent à "REMPLACER_...", le site continue de
 * fonctionner avec son contenu par défaut (aucune casse), mais la page
 * /admin restera inutilisable.
 */
export const firebaseConfig = {
  apiKey: 'REMPLACER_API_KEY',
  authDomain: 'REMPLACER_PROJET.firebaseapp.com',
  projectId: 'REMPLACER_PROJET',
  storageBucket: 'REMPLACER_PROJET.appspot.com',
  messagingSenderId: 'REMPLACER_SENDER_ID',
  appId: 'REMPLACER_APP_ID',
};

export function isFirebaseConfigured(): boolean {
  return !firebaseConfig.apiKey.startsWith('REMPLACER_');
}
