export interface Activity {
  id: string;
  title: string;
  category: 'Mission de terrain' | 'Atelier' | 'Formation interne' | 'Conférence' | 'Visite institutionnelle';
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
}
