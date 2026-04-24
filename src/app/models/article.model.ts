export interface Article {
  id: number;
  tag: string;
  title: string;
  excerpt?: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  featured?: boolean;
}
