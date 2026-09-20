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
      content: [
        'Face à l\'intensification des épisodes de sécheresse en Afrique centrale, l\'équipe agronomie de l\'IRAF a mené une campagne d\'évaluation variétale sur trois années consécutives, portant sur 24 accessions de manioc collectées dans les provinces du Gabon.',
        'Trois variétés locales se sont distinguées par une tolérance marquée au stress hydrique, maintenant un rendement supérieur à 80 % de leur potentiel même après six semaines sans précipitation significative.',
        'Ces résultats ouvrent la voie à une diffusion élargie de ces variétés auprès des exploitations familiales, avec un accompagnement technique prévu dès la prochaine campagne agricole.',
      ],
      author: 'Dr. A. Moussavou',
      date: '12 avril 2025',
      readTime: '8 min de lecture',
      featured: true,
    };
  }

  getRecentArticles(): Article[] {
    return [
      {
        id: 1, tag: 'Foresterie', title: 'Dynamique de régénération des forêts secondaires en zone équatoriale',
        author: 'Dr. B. Ondo', date: '5 avril 2025', readTime: '6 min de lecture',
        content: [
          'Cette étude longitudinale suit la recolonisation végétale de parcelles forestières secondaires sur plus de dix ans, afin de mieux comprendre les trajectoires de régénération en zone équatoriale.',
          'Les résultats mettent en évidence le rôle clé des lisières forestières et des arbres semenciers résiduels dans la vitesse de reconstitution du couvert.',
          'Ces enseignements orientent désormais les recommandations de gestion post-exploitation formulées par l\'IRAF auprès des concessions forestières.',
        ],
      },
      {
        id: 2, tag: 'Biodiversité', title: 'Inventaire floristique du massif du Chaillu : nouvelles espèces découvertes',
        author: 'Pr. C. Ndong', date: '28 mars 2025', readTime: '10 min de lecture',
        content: [
          'Une mission d\'inventaire conduite dans le massif du Chaillu a permis de recenser plus de 400 espèces végétales, dont plusieurs restent à décrire formellement.',
          'Trois taxons présentent des caractères morphologiques inédits et font l\'objet d\'une description botanique en cours de publication.',
          'Ce travail renforce la base de connaissances nécessaire à la définition de nouvelles zones prioritaires de conservation.',
        ],
      },
      {
        id: 3, tag: 'Sols & Nutrition', title: 'Impact des pratiques agroforestières sur la fertilité des sols tropicaux',
        author: 'Dr. M. Bouanga', date: '20 mars 2025', readTime: '7 min de lecture',
        content: [
          'L\'étude compare la fertilité de parcelles conduites en agroforesterie avec celle de parcelles en monoculture sur un même bassin versant.',
          'Les sols agroforestiers montrent une teneur en matière organique significativement plus élevée et une meilleure rétention en eau.',
          'Ces résultats appuient les recommandations de l\'IRAF en faveur d\'une transition progressive vers des systèmes agroforestiers.',
        ],
      },
      {
        id: 4, tag: 'Politique agricole', title: 'Recommandations pour une politique semencière nationale au Gabon',
        author: 'Équipe IRAF', date: '14 mars 2025', readTime: '5 min de lecture',
        content: [
          'Ce rapport de synthèse propose un cadre de politique semencière adapté aux réalités agricoles gabonaises.',
          'Il s\'appuie sur des consultations menées auprès des producteurs, des instituts de recherche et des services techniques de l\'État.',
          'Les recommandations portent notamment sur la conservation des semences paysannes et la structuration des filières de multiplication.',
        ],
      },
    ];
  }

  getArticleById(id: number): Article | undefined {
    const all = [this.getFeaturedArticle(), ...this.getRecentArticles()];
    return all.find((a) => a.id === id);
  }

  getTopics(): string[] {
    return ['Agronomie', 'Foresterie', 'Biodiversité', 'Sols', 'Semences', 'Agroforesterie', 'Climat', 'Filières'];
  }

  getResearchers(): Researcher[] {
    return [
      { initials: 'AM', name: 'Dr. A. Moussavou',  role: 'Agronomie · Génétique végétale',                       avatarClass: 'av-green' },
      { initials: 'BO', name: 'Dr. B. Ondo',       role: 'Sciences forestières',                                  avatarClass: 'av-teal'  },
      { initials: 'CN', name: 'Pr. C. Ndong',      role: 'Botanique · Taxonomie',                                 avatarClass: 'av-amber' },
      { initials: 'JZ', name: 'Dr. J-L Zue Ondo',          role: 'Biologie · Écologie des forêts et des agrosystèmes', avatarClass: 'av-sage'  },
      { initials: 'SM', name: 'Dr. S-B Mabicka Iwangou',  role: 'Science du Bois et des Fibres',                              avatarClass: 'av-olive' },
      { initials: 'DN', name: 'Dr. D. Ndiade Bourobou',  role: 'Écologie · Ressources génétiques · Paléontologie',          avatarClass: 'av-sky'   },
    ];
  }
}
