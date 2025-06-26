/**
 * News data types matching backend API responses
 */

export interface NewsImage {
  id: string;
  news_id: string;
  image_url: string;
  alt_text?: string;
  caption?: string;
  sort_order: number;
  image_type: 'featured' | 'content' | 'gallery';
  created_at: string;
  updated_at: string;
}

export interface NewsTag {
  id: string;
  news_id: string;
  tag_name: string;
  created_at: string;
}

export interface NewsView {
  id: string;
  news_id: string;
  ip_address: string;
  user_agent?: string;
  viewed_at: string;
  created_at: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color_class?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  excerpt?: string;
  content?: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  author: string;
  read_time_minutes: number;
  view_count: number;
  is_featured: boolean;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  sort_order: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  tags?: string[];
}

export interface NewsDetail extends NewsItem {
  images: NewsImage[];
  tags: NewsTag[];
}

export interface NewsFilterParams {
  page?: number;
  page_size?: number;
  category?: string;
  year?: number;
  search?: string;
  featured?: boolean;
  sort_by?: 'published_at' | 'view_count' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: PaginationMeta;
}

export interface NewsStats {
  total_news: number;
  total_views: number;
  category_stats: CategoryStat[];
}

export interface CategoryStat {
  category: string;
  count: number;
  total_views: number;
}

export interface CategoryInfo {
  id: string;
  name: string;
  count: number;
}

export interface CategoryFilterResponse {
  categories: CategoryInfo[];
}

export interface YearFilterResponse {
  success: boolean;
  message: string;
  data: number[];
}

export interface RelatedNewsResponse {
  success: boolean;
  message: string;
  data: NewsItem[];
}

export interface ViewUpdateRequest {
  user_agent?: string;
}

export interface ViewUpdateResponse {
  success: boolean;
  message: string;
  updated: boolean;
  current_view_count: number;
}

export interface NewsFilter {
  category: string;
  year: string;
  search: string;
  featured?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}