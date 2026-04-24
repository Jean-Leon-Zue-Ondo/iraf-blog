import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { Researcher } from '../models/researcher.model';

@Injectable({ providedIn: 'root' })
export class ArticlesService {

  getStats() {
    return [
      { num: '47+', label: 'Projets actifs' },
      { num: '120', label: 'Publications' },
      { num: '32',  label: 'Chercheurs' },
      { num: '15',  label: 'Partenaires' },
    ];
  }

  getFeaturedArticle(): Article {
    return {
      id: 0,
      tag: 'Étude de cas',
      title: 'Amélioration de la résistance au stress hydrique chez le manioc au Gabon',
      excerpt: 'Nos chercheurs ont identifié trois variétés locales présentant une tolérance exceptionnelle à la sécheresse, ouvrant la voie à une agriculture plus résiliente face aux changements climatiques en Afrique centrale...',
      author: 'Dr. A. Moussavou',
      date: '12 avril 2025',
      readTime: '8 min de lecture',
      featured: true,
    };
  }

  getRecentArticles(): Article[] {
    return [
      { id: 1, tag: 'Foresterie',        title: 'Dynamique de régénération des forêts secondaires en zone équatoriale',          author: 'Dr. B. Ondo',    date: '5 avril 2025',  readTime: '6 min de lecture' },
      { id: 2, tag: 'Biodiversité',      title: 'Inventaire floristique du massif du Chaillu : nouvelles espèces découvertes',   author: 'Pr. C. Ndong',   date: '28 mars 2025',  readTime: '10 min de lecture' },
      { id: 3, tag: 'Sols & Nutrition',  title: 'Impact des pratiques agroforestières sur la fertilité des sols tropicaux',      author: 'Dr. M. Bouanga', date: '20 mars 2025',  readTime: '7 min de lecture' },
      { id: 4, tag: 'Politique agricole',title: 'Recommandations pour une politique semencière nationale au Gabon',              author: 'Équipe IRAF',    date: '14 mars 2025',  readTime: '5 min de lecture' },
    ];
  }

  getTopics(): string[] {
    return ['Agronomie', 'Foresterie', 'Biodiversité', 'Sols', 'Semences', 'Agroforesterie', 'Climat', 'Filières'];
  }

  getResearchers(): Researcher[] {
    return [
      { initials: 'AM', name: 'Dr. A. Moussavou', role: 'Agronomie · Génétique végétale', avatarClass: 'av-green' },
      { initials: 'BO', name: 'Dr. B. Ondo',      role: 'Sciences forestières',            avatarClass: 'av-teal'  },
      { initials: 'CN', name: 'Pr. C. Ndong',     role: 'Botanique · Taxonomie',           avatarClass: 'av-amber' },
    ];
  }
}
