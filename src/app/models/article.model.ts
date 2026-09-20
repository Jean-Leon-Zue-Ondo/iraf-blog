export interface Article {
  id: number;
  tag: string;
  title: string;
  excerpt?: string;
  content?: string[];
  author: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  featured?: boolean;
}
