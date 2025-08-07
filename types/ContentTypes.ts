
export interface EditableContent {
  id: string;
  type: 'text' | 'image' | 'section' | 'navigation' | 'hero';
  page: string;
  section: string;
  field: string;
  value: string | { ar?: string; fr?: string };
  label: string;
}

export interface ContentSection {
  id: string;
  title: string;
  fields: EditableContent[];
}

export interface Article {
  id: string;
  title: { ar: string; fr: string };
  content: { ar: string; fr: string };
  excerpt: { ar: string; fr: string };
  author: { ar: string; fr: string };
  authorImage?: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  publishDate: string;
  isPublished: boolean;
  createdAt: string;
}
