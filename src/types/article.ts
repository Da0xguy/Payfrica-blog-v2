export const CATEGORIES = [
  'All',
  'Crypto',
  'Payments',
  'Africa',
  'Stablecoins',
  'Sui',
  'Guides',
  'Product',
  'Company',
] as const;

export type CategoryType = (typeof CATEGORIES)[number];

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
}

export interface ArticleSection {
  heading?: string;
  content: string[];
  pullQuote?: string;
  callout?: {
    title: string;
    description: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category: Exclude<CategoryType, 'All'>;
  author: Author;
  authorId: string;
  date: string;
  readTime: string;
  image: string;
  coverImage?: string;
  imageCaption?: string;
  featured?: boolean;
  editorsPick?: boolean;
  isGuide?: boolean;
  isAfricaBuilding?: boolean;
  tags: string[];
  sections?: ArticleSection[];
  views?: number;
  claps?: number;
  isPublished?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  textColor: string;
  description: string;
}
