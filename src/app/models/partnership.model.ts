export interface Partnership {
  id: string;
  name: string;
  type: 'Recherche' | 'Université' | 'ONG' | 'Bailleur de fonds' | 'Entreprise' | 'Institution publique';
  country: string;
  description: string;
  websiteUrl?: string;
}
