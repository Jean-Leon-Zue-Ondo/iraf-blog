import { Injectable, WritableSignal, signal } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase-client';
import { isFirebaseConfigured } from '../firebase.config';
import { Partnership } from '../models/partnership.model';
import { Activity } from '../models/activity.model';
import { NewsItem } from '../models/news-item.model';
import { TrainingProgram } from '../models/training-program.model';
import { ResearchProgram } from '../models/research-program.model';

// Contenu de démonstration — à remplacer par les informations réelles de l'IRAF
// depuis l'espace /admin (noms d'organisations et libellés volontairement génériques).

const DEFAULT_PARTNERSHIPS: Partnership[] = [
  { id: 'p1', name: 'Institut Régional de Recherche Agro-Écologique', type: 'Recherche', country: 'Afrique centrale', description: "Collaboration sur les programmes d'amélioration variétale et d'adaptation au changement climatique." },
  { id: 'p2', name: 'Université des Sciences Naturelles d\'Afrique Centrale', type: 'Université', country: 'Gabon', description: 'Co-encadrement de thèses et accueil de stagiaires en agronomie et foresterie.' },
  { id: 'p3', name: 'Fondation Forêts & Biodiversité', type: 'ONG', country: 'International', description: "Appui aux missions d'inventaire floristique et aux programmes de conservation des espèces menacées." },
  { id: 'p4', name: 'Programme International de Coopération Agricole', type: 'Bailleur de fonds', country: 'International', description: 'Financement de projets de recherche appliquée sur la sécurité alimentaire en zone tropicale.' },
  { id: 'p5', name: 'Agropole du Centre', type: 'Entreprise', country: 'Gabon', description: 'Partenariat pour le transfert de variétés améliorées vers les exploitations agricoles.' },
];

const DEFAULT_ACTIVITIES: Activity[] = [
  { id: 'a1', title: "Mission d'inventaire floristique dans le massif du Chaillu", category: 'Mission de terrain', date: 'Mars 2025', location: 'Massif du Chaillu, Gabon', description: "Campagne de terrain de trois semaines pour recenser la flore et actualiser la base de données botanique de l'institut." },
  { id: 'a2', title: "Atelier de restitution sur l'agroforesterie", category: 'Atelier', date: 'Juin 2025', location: 'Libreville, Gabon', description: "Présentation des résultats de l'étude sur la fertilité des sols agroforestiers aux producteurs et partenaires techniques." },
  { id: 'a3', title: 'Formation interne aux outils de cartographie SIG', category: 'Formation interne', date: 'Août 2025', location: "Siège de l'IRAF", description: 'Renforcement des compétences des chercheurs en cartographie des habitats et en analyse spatiale.' },
  { id: 'a4', title: 'Participation à la conférence régionale sur la biodiversité', category: 'Conférence', date: 'Octobre 2025', location: 'Afrique centrale', description: "Présentation des travaux de l'IRAF sur la conservation des espèces forestières menacées." },
  { id: 'a5', title: "Visite d'une délégation partenaire", category: 'Visite institutionnelle', date: 'Décembre 2025', location: "Siège de l'IRAF", description: 'Accueil d\'une délégation partenaire pour discuter des perspectives de collaboration scientifique.' },
];

const DEFAULT_NEWS: NewsItem[] = [
  { id: 'n1', title: 'L\'IRAF publie son rapport annuel de recherche 2025', excerpt: "Le rapport présente les principaux résultats scientifiques et perspectives de l'institut pour l'année à venir.", date: '15 octobre 2025', category: 'Publication' },
  { id: 'n2', title: "Lancement d'un nouveau programme sur l'adaptation climatique", excerpt: 'Ce programme pluriannuel vise à renforcer la résilience des systèmes agricoles face aux changements climatiques.', date: '2 septembre 2025', category: 'Annonce' },
  { id: 'n3', title: 'Signature d\'un nouvel accord de partenariat', excerpt: "L'IRAF renforce sa coopération scientifique avec un nouveau partenaire institutionnel.", date: '18 juillet 2025', category: 'Partenariat' },
  { id: 'n4', title: "Une chercheuse de l'IRAF distinguée pour ses travaux sur la biodiversité", excerpt: 'Cette distinction récompense plusieurs années de recherche sur la conservation des espèces forestières.', date: '5 mai 2025', category: 'Distinction' },
];

const DEFAULT_TRAININGS: TrainingProgram[] = [
  { id: 't1', title: 'Doctorat en Sciences Agronomiques', level: 'Doctorat', duration: '3 ans', description: "Programme doctoral en partenariat avec des universités partenaires, orienté sur l'amélioration variétale et l'agroécologie." },
  { id: 't2', title: 'Master en Gestion des Forêts Tropicales', level: 'Master', duration: '2 ans', description: 'Formation à la gestion durable des écosystèmes forestiers tropicaux, en collaboration avec des experts de l\'institut.' },
  { id: 't3', title: 'Stage de recherche en biodiversité', level: 'Stage', duration: '3 à 6 mois', description: "Accueil d'étudiants pour des stages de terrain et de laboratoire au sein des équipes de recherche de l'IRAF." },
  { id: 't4', title: 'Formation continue en cartographie et SIG', level: 'Formation continue', duration: '1 semaine', description: 'Module de formation courte destiné aux techniciens et chercheurs souhaitant renforcer leurs compétences en analyse spatiale.' },
];

const DEFAULT_RESEARCH_PROGRAMS: ResearchProgram[] = [
  { id: 'rp1', axis: "Adaptation de l'agriculture au changement climatique", period: '2025 – 2028', objectives: 'Développer des variétés et des pratiques culturales résilientes face aux stress hydriques et thermiques.', description: "Ce programme structure les travaux de l'IRAF sur la sélection variétale, la gestion de l'eau et l'accompagnement technique des producteurs." },
  { id: 'rp2', axis: 'Gestion durable des forêts tropicales', period: '2025 – 2027', objectives: 'Améliorer les pratiques de gestion post-exploitation et renforcer la régénération naturelle des forêts secondaires.', description: 'Programme pluriannuel associant suivi de terrain, modélisation et appui aux concessions forestières.' },
  { id: 'rp3', axis: 'Conservation de la biodiversité et des espèces menacées', period: '2026 – 2029', objectives: 'Cartographier les habitats prioritaires et renforcer les inventaires floristiques et fauniques.', description: 'Ce programme vise à consolider la base de connaissances nécessaire à la définition de nouvelles zones de conservation.' },
  { id: 'rp4', axis: 'Sécurité alimentaire et filières semencières', period: '2025 – 2026', objectives: 'Structurer les filières de multiplication de semences et appuyer la politique semencière nationale.', description: 'Programme conduit en lien étroit avec les producteurs, les services techniques de l\'État et les partenaires institutionnels.' },
];

@Injectable({ providedIn: 'root' })
export class SiteSectionsService {
  private partnershipsSig = signal<Partnership[]>(DEFAULT_PARTNERSHIPS);
  private activitiesSig = signal<Activity[]>(DEFAULT_ACTIVITIES);
  private newsSig = signal<NewsItem[]>(DEFAULT_NEWS);
  private trainingsSig = signal<TrainingProgram[]>(DEFAULT_TRAININGS);
  private researchProgramsSig = signal<ResearchProgram[]>(DEFAULT_RESEARCH_PROGRAMS);

  partnerships = this.partnershipsSig.asReadonly();
  activities = this.activitiesSig.asReadonly();
  news = this.newsSig.asReadonly();
  trainings = this.trainingsSig.asReadonly();
  researchPrograms = this.researchProgramsSig.asReadonly();

  constructor() {
    if (isFirebaseConfigured()) {
      this.subscribeCollection('partnerships', this.partnershipsSig);
      this.subscribeCollection('activities', this.activitiesSig);
      this.subscribeCollection('news', this.newsSig);
      this.subscribeCollection('trainings', this.trainingsSig);
      this.subscribeCollection('researchPrograms', this.researchProgramsSig);
    }
  }

  // Contrairement à ArticlesService, cette classe ne tente jamais d'amorcer Firestore
  // depuis une session anonyme (les règles de sécurité interdisent l'écriture publique,
  // ce qui est le comportement attendu) : tant que la collection est vide, le signal
  // conserve simplement son contenu par défaut ; dès qu'un administrateur ajoute un
  // élément réel depuis /admin, il remplace ce contenu.
  private subscribeCollection<T extends { id: string }>(name: string, sig: WritableSignal<T[]>): void {
    const q = query(collection(db, name), orderBy('createdAt', 'asc'));
    onSnapshot(
      q,
      (snap) => {
        if (snap.empty) return;
        sig.set(snap.docs.map((d) => ({ ...(d.data() as Omit<T, 'id'>), id: d.id })) as T[]);
      },
      (err) => console.warn(`Firestore (${name}) indisponible, contenu par défaut conservé:`, err.message),
    );
  }

  async addPartnership(item: Omit<Partnership, 'id'>): Promise<void> {
    if (!isFirebaseConfigured()) throw new Error('Firebase non configuré — voir src/app/firebase.config.ts');
    await addDoc(collection(db, 'partnerships'), { ...item, createdAt: serverTimestamp() });
  }
  async deletePartnership(id: string): Promise<void> {
    if (!isFirebaseConfigured()) throw new Error('Firebase non configuré — voir src/app/firebase.config.ts');
    await deleteDoc(doc(db, 'partnerships', id));
  }

  async addActivity(item: Omit<Activity, 'id'>): Promise<void> {
    if (!isFirebaseConfigured()) throw new Error('Firebase non configuré — voir src/app/firebase.config.ts');
    await addDoc(collection(db, 'activities'), { ...item, createdAt: serverTimestamp() });
  }
  async deleteActivity(id: string): Promise<void> {
    if (!isFirebaseConfigured()) throw new Error('Firebase non configuré — voir src/app/firebase.config.ts');
    await deleteDoc(doc(db, 'activities', id));
  }

  async addNewsItem(item: Omit<NewsItem, 'id'>): Promise<void> {
    if (!isFirebaseConfigured()) throw new Error('Firebase non configuré — voir src/app/firebase.config.ts');
    await addDoc(collection(db, 'news'), { ...item, createdAt: serverTimestamp() });
  }
  async deleteNewsItem(id: string): Promise<void> {
    if (!isFirebaseConfigured()) throw new Error('Firebase non configuré — voir src/app/firebase.config.ts');
    await deleteDoc(doc(db, 'news', id));
  }

  async addTraining(item: Omit<TrainingProgram, 'id'>): Promise<void> {
    if (!isFirebaseConfigured()) throw new Error('Firebase non configuré — voir src/app/firebase.config.ts');
    await addDoc(collection(db, 'trainings'), { ...item, createdAt: serverTimestamp() });
  }
  async deleteTraining(id: string): Promise<void> {
    if (!isFirebaseConfigured()) throw new Error('Firebase non configuré — voir src/app/firebase.config.ts');
    await deleteDoc(doc(db, 'trainings', id));
  }

  async addResearchProgram(item: Omit<ResearchProgram, 'id'>): Promise<void> {
    if (!isFirebaseConfigured()) throw new Error('Firebase non configuré — voir src/app/firebase.config.ts');
    await addDoc(collection(db, 'researchPrograms'), { ...item, createdAt: serverTimestamp() });
  }
  async deleteResearchProgram(id: string): Promise<void> {
    if (!isFirebaseConfigured()) throw new Error('Firebase non configuré — voir src/app/firebase.config.ts');
    await deleteDoc(doc(db, 'researchPrograms', id));
  }
}
