/**
 * Portfolio service for API interactions
 */

import { BaseService } from './base.service';
import {
  Portfolio,
  PortfolioDetail,
  PortfolioFilterParams,
  PortfolioStats,
  CategoryStatsResponse,
  ApiResponse,
} from '@/types/portfolio';

export class PortfolioService extends BaseService {
  private readonly baseEndpoint = '/api/v1/portfolios';

  /**
   * Get portfolios with filtering and pagination
   */
  async getPortfolios(
    filters: PortfolioFilterParams = {}
  ): Promise<ApiResponse<Portfolio[]>> {
    const defaultFilters: PortfolioFilterParams = {
      page: 1,
      page_size: 20,
      status: 'active',
      sort_by: 'created_at',
      sort_order: 'desc',
      ...filters,
    };

    return this.get<ApiResponse<Portfolio[]>>(this.baseEndpoint, defaultFilters);
  }

  /**
   * Get portfolio by ID with full details
   */
  async getPortfolioById(id: string): Promise<ApiResponse<PortfolioDetail>> {
    return this.get<ApiResponse<PortfolioDetail>>(`${this.baseEndpoint}/${id}`);
  }

  /**
   * Get portfolio statistics overview
   */
  async getPortfolioStats(): Promise<ApiResponse<PortfolioStats>> {
    return this.get<ApiResponse<PortfolioStats>>(`${this.baseEndpoint}/stats/overview`);
  }

  /**
   * Get category statistics
   */
  async getCategoryStats(): Promise<ApiResponse<CategoryStatsResponse>> {
    return this.get<ApiResponse<CategoryStatsResponse>>(`${this.baseEndpoint}/stats/categories`);
  }

  /**
   * Get portfolios for landing page (limited results)
   */
  async getPortfoliosForLandingPage(limit: number = 6): Promise<ApiResponse<Portfolio[]>> {
    return this.getPortfolios({
      page_size: limit,
      sort_by: 'sort_order',
      sort_order: 'asc',
    });
  }

  /**
   * Search portfolios by title or description
   */
  async searchPortfolios(
    searchTerm: string,
    filters: Omit<PortfolioFilterParams, 'search'> = {}
  ): Promise<ApiResponse<Portfolio[]>> {
    return this.getPortfolios({
      ...filters,
      search: searchTerm,
    });
  }

  /**
   * Get portfolios by category
   */
  async getPortfoliosByCategory(
    category: string,
    filters: Omit<PortfolioFilterParams, 'category'> = {}
  ): Promise<ApiResponse<Portfolio[]>> {
    return this.getPortfolios({
      ...filters,
      category,
    });
  }

  /**
   * Get portfolios by industry
   */
  async getPortfoliosByIndustry(
    industry: string,
    filters: Omit<PortfolioFilterParams, 'industry'> = {}
  ): Promise<ApiResponse<Portfolio[]>> {
    return this.getPortfolios({
      ...filters,
      industry,
    });
  }

  /**
   * Get portfolios by year
   */
  async getPortfoliosByYear(
    year: number,
    filters: Omit<PortfolioFilterParams, 'year'> = {}
  ): Promise<ApiResponse<Portfolio[]>> {
    return this.getPortfolios({
      ...filters,
      year,
    });
  }
}

// Export singleton instance
export const portfolioService = new PortfolioService();