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
  apiKey: 'AIzaSyD1JPzJ9HoReiBzw3vwvVPw1vqh7om735E',
  authDomain: 'iraf-blog.firebaseapp.com',
  projectId: 'iraf-blog',
  storageBucket: 'iraf-blog.firebasestorage.app',
  messagingSenderId: '836853684948',
  appId: '1:836853684948:web:beb1ec05cc4c5af579b941',
};

export function isFirebaseConfigured(): boolean {
  return !firebaseConfig.apiKey.startsWith('REMPLACER_');
}
