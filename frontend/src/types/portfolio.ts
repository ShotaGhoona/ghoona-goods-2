/**
 * Portfolio data types matching backend API responses
 */

export interface PortfolioImage {
  id: string;
  portfolio_id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  is_thumbnail: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortfolioTag {
  id: string;
  portfolio_id: string;
  tag_name: string;
  created_at: string;
}

export interface PortfolioSpecification {
  id: string;
  portfolio_id: string;
  size?: string;
  material?: string;
  printing?: string;
  finishing?: string;
  delivery_time?: string;
  price?: string;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  title: string;
  category: 'original-badge' | 'standard-badge' | 'acrylic-stand' | 'acrylic-keychain';
  industry: 'anime' | 'corporate' | 'event' | 'personal';
  year: number;
  quantity: number;
  description?: string;
  long_description?: string;
  status: 'active' | 'draft' | 'archived';
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PortfolioDetail extends Portfolio {
  images: PortfolioImage[];
  tags: PortfolioTag[];
  specifications?: PortfolioSpecification;
}

export interface PortfolioFilterParams {
  page?: number;
  page_size?: number;
  category?: string;
  industry?: string;
  year?: number;
  status?: string;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  [key: string]: unknown;
}

export interface PaginationMeta {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  timestamp: string;
  data: T;
  pagination?: PaginationMeta;
}

export interface PortfolioStats {
  total_portfolios: number;
  total_quantity: number;
  category_stats: CategoryStat[];
  industry_stats: IndustryStat[];
  year_stats: YearStat[];
}

export interface CategoryStat {
  category: string;
  count: number;
  total_quantity: number;
}

export interface IndustryStat {
  industry: string;
  count: number;
  total_quantity: number;
}

export interface YearStat {
  year: number;
  count: number;
  total_quantity: number;
}

export interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface CategoryStatsResponse {
  categories: CategoryInfo[];
}