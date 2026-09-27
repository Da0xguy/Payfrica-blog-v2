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
  name: string;
  role: string;
  avatar: string;
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
  subtitle: string;
  excerpt: string;
  category: Exclude<CategoryType, 'All'>;
  author: Author;
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
  sections: ArticleSection[];
}
