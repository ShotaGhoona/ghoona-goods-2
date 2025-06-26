// Portfolio types for admin interface
export interface Portfolio {
  id: string
  title: string
  category: 'original-badge' | 'standard-badge' | 'acrylic-stand' | 'acrylic-keychain'
  industry: 'anime' | 'corporate' | 'event' | 'personal'
  year: number
  quantity: number
  description?: string
  long_description?: string
  status: 'active' | 'draft' | 'archived'
  sort_order: number
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface PortfolioImage {
  id: string
  portfolio_id: string
  image_url: string
  alt_text?: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface PortfolioTag {
  id: string
  portfolio_id: string
  tag_name: string
  created_at: string
}

export interface PortfolioSpecification {
  id: string
  portfolio_id: string
  size?: string
  material?: string
  printing?: string
  finishing?: string
  delivery_time?: string
  price?: string
  created_at: string
  updated_at: string
}

export interface PortfolioDetail extends Portfolio {
  images: PortfolioImage[]
  tags: PortfolioTag[]
  specifications?: PortfolioSpecification
}

// Form data types
export interface CreatePortfolioData {
  title: string
  category: Portfolio['category']
  industry: Portfolio['industry']
  year: number
  quantity: number
  description?: string
  long_description?: string
  status: Portfolio['status']
  sort_order: number
  tags?: string[]
  specifications?: Omit<PortfolioSpecification, 'id' | 'portfolio_id' | 'created_at' | 'updated_at'>
}

export interface UpdatePortfolioData extends Partial<CreatePortfolioData> {
  id: string
}

// Filter and pagination types
export interface PortfolioFilterParams {
  page?: number
  page_size?: number
  category?: Portfolio['category']
  industry?: Portfolio['industry']
  status?: Portfolio['status']
  year?: number
  search?: string
  sort_by?: 'created_at' | 'updated_at' | 'title' | 'year' | 'quantity'
  sort_order?: 'asc' | 'desc'
}

export interface PortfolioListResponse {
  data: Portfolio[]
  pagination: {
    page: number
    page_size: number
    total_items: number
    total_pages: number
    has_next: boolean
    has_previous: boolean
  }
}

// Upload types
export interface ImageUploadResult {
  url: string
  path: string
  filename: string
}

export interface PortfolioImageUpload {
  file: File
  alt_text?: string
  sort_order: number
}

// API response types
export interface ApiResponse<T> {
  data: T
  message?: string
}