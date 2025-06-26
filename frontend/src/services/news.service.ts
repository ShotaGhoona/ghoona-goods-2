/**
 * News service for API communication
 */

import { BaseService } from './base.service';
import type {
  NewsItem,
  NewsDetail,
  NewsFilterParams,
  ApiResponse,
  CategoryFilterResponse,
  YearFilterResponse,
  RelatedNewsResponse,
  ViewUpdateRequest,
  ViewUpdateResponse,
  NewsStats,
} from '@/types/news';

export class NewsService extends BaseService {
  private readonly NEWS_ENDPOINT = '/api/v1/news';

  /**
   * Get news list with filtering and pagination
   */
  async getNews(params: NewsFilterParams = {}): Promise<ApiResponse<NewsItem[]>> {
    return this.get<ApiResponse<NewsItem[]>>(this.NEWS_ENDPOINT, params);
  }

  /**
   * Get news detail by ID
   */
  async getNewsById(id: string): Promise<NewsDetail> {
    return this.get<NewsDetail>(`${this.NEWS_ENDPOINT}/${id}`);
  }

  /**
   * Get featured news only
   */
  async getFeaturedNews(limit: number = 6): Promise<ApiResponse<NewsItem[]>> {
    return this.get<ApiResponse<NewsItem[]>>(this.NEWS_ENDPOINT, { 
      featured: true,
      page: 1, 
      page_size: limit,
      sort_by: 'published_at',
      sort_order: 'desc'
    });
  }

  /**
   * Get latest news (for homepage)
   */
  async getLatestNews(limit: number = 6): Promise<ApiResponse<NewsItem[]>> {
    return this.get<ApiResponse<NewsItem[]>>(this.NEWS_ENDPOINT, { 
      page: 1, 
      page_size: limit,
      sort_by: 'published_at',
      sort_order: 'desc'
    });
  }

  /**
   * Get related news for a specific article
   */
  async getRelatedNews(id: string, limit: number = 3): Promise<RelatedNewsResponse> {
    return this.get<RelatedNewsResponse>(`${this.NEWS_ENDPOINT}/${id}/related`, { limit });
  }

  /**
   * Update view count for a news article
   */
  async updateViewCount(id: string, data: ViewUpdateRequest = {}): Promise<ViewUpdateResponse> {
    const requestData = {
      user_agent: data.user_agent || navigator.userAgent
    };
    return this.post<ViewUpdateResponse>(`${this.NEWS_ENDPOINT}/${id}/view`, requestData);
  }

  /**
   * Get categories for filtering
   */
  async getCategoriesForFilter(): Promise<CategoryFilterResponse> {
    return this.get<CategoryFilterResponse>(`${this.NEWS_ENDPOINT}/categories/filters`);
  }

  /**
   * Get available years for filtering
   */
  async getAvailableYears(): Promise<YearFilterResponse> {
    return this.get<YearFilterResponse>(`${this.NEWS_ENDPOINT}/meta/years`);
  }

  /**
   * Get category statistics
   */
  async getCategoryStats(): Promise<NewsStats> {
    return this.get<NewsStats>(`${this.NEWS_ENDPOINT}/categories/stats`);
  }

  /**
   * Health check for news service
   */
  async healthCheck(): Promise<{ success: boolean; message: string }> {
    return this.get<{ success: boolean; message: string }>(`${this.NEWS_ENDPOINT}/health`);
  }

  /**
   * Build pagination parameters
   */
  buildPaginationParams(page: number = 1, pageSize: number = 12): Partial<NewsFilterParams> {
    return {
      page,
      page_size: pageSize
    };
  }

  /**
   * Build filter parameters
   */
  buildFilterParams(filters: {
    category?: string;
    year?: number;
    search?: string;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Partial<NewsFilterParams> {
    const params: Partial<NewsFilterParams> = {};

    if (filters.category && filters.category !== 'all') {
      params.category = filters.category;
    }

    if (filters.year && filters.year !== 0) {
      params.year = filters.year;
    }

    if (filters.search && filters.search.trim() !== '') {
      params.search = filters.search.trim();
    }

    if (filters.featured !== undefined) {
      params.featured = filters.featured;
    }

    if (filters.sortBy) {
      params.sort_by = filters.sortBy as 'published_at' | 'view_count' | 'created_at';
    }

    if (filters.sortOrder) {
      params.sort_order = filters.sortOrder;
    }

    return params;
  }

  /**
   * Combine pagination and filter parameters
   */
  buildRequestParams(
    filters: {
      category?: string;
      year?: number;
      search?: string;
      featured?: boolean;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    },
    page: number = 1,
    pageSize: number = 12
  ): NewsFilterParams {
    return {
      ...this.buildFilterParams(filters),
      ...this.buildPaginationParams(page, pageSize)
    };
  }
}

// Export singleton instance
export const newsService = new NewsService();