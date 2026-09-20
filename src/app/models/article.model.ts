export interface Article {
  id: string;
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
