export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'Annonce' | 'Événement' | 'Partenariat' | 'Distinction' | 'Publication';
  imageUrl?: string;
}
