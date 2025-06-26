/**
 * Portfolio React hooks using service layer
 */

import { useState, useEffect, useCallback } from 'react';
import { portfolioService } from '@/services/portfolio.service';
import {
  Portfolio,
  PortfolioDetail,
  PortfolioFilterParams,
  PortfolioStats,
  CategoryStatsResponse,
  PaginationMeta,
} from '@/types/portfolio';
import { ApiError } from '@/services/base.service';

interface UsePortfoliosResult {
  portfolios: Portfolio[];
  pagination: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
}

interface UsePortfolioDetailResult {
  portfolio: PortfolioDetail | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UsePortfolioStatsResult {
  stats: PortfolioStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseCategoryStatsResult {
  categories: CategoryStatsResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching portfolios with filtering and pagination
 */
export function usePortfolios(
  initialFilters: PortfolioFilterParams = {}
): UsePortfoliosResult {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PortfolioFilterParams>(initialFilters);

  const fetchPortfolios = useCallback(async (newFilters?: PortfolioFilterParams) => {
    const currentFilters = newFilters || filters;
    setLoading(true);
    setError(null);

    try {
      const response = await portfolioService.getPortfolios(currentFilters);
      setPortfolios(response.data);
      setPagination(response.pagination || null);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch portfolios';
      setError(errorMessage);
      console.error('Error fetching portfolios:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const refetch = useCallback(() => fetchPortfolios(), [fetchPortfolios]);

  const loadMore = useCallback(async () => {
    if (!pagination?.has_next || loading) return;

    const nextPageFilters = {
      ...filters,
      page: pagination.page + 1,
    };

    try {
      setLoading(true);
      const response = await portfolioService.getPortfolios(nextPageFilters);
      setPortfolios(prev => [...prev, ...response.data]);
      setPagination(response.pagination || null);
      setFilters(nextPageFilters);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to load more portfolios';
      setError(errorMessage);
      console.error('Error loading more portfolios:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination, loading, filters]);

  useEffect(() => {
    fetchPortfolios(initialFilters);
  }, []);

  // Update filters and refetch when filters change
  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(initialFilters)) {
      setFilters(initialFilters);
      fetchPortfolios(initialFilters);
    }
  }, [initialFilters, filters, fetchPortfolios]);

  return {
    portfolios,
    pagination,
    loading,
    error,
    refetch,
    loadMore,
  };
}

/**
 * Hook for fetching a single portfolio by ID
 */
export function usePortfolioDetail(id?: string): UsePortfolioDetailResult {
  const [portfolio, setPortfolio] = useState<PortfolioDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await portfolioService.getPortfolioById(id);
      setPortfolio(response.data);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch portfolio';
      setError(errorMessage);
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const refetch = useCallback(() => fetchPortfolio(), [fetchPortfolio]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return {
    portfolio,
    loading,
    error,
    refetch,
  };
}

/**
 * Hook for fetching portfolio statistics
 */
export function usePortfolioStats(): UsePortfolioStatsResult {
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await portfolioService.getPortfolioStats();
      setStats(response.data);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch portfolio stats';
      setError(errorMessage);
      console.error('Error fetching portfolio stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => fetchStats(), [fetchStats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch,
  };
}

/**
 * Hook for fetching category statistics
 */
export function useCategoryStats(): UseCategoryStatsResult {
  const [categories, setCategories] = useState<CategoryStatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await portfolioService.getCategoryStats();
      setCategories(response.data);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch category stats';
      setError(errorMessage);
      console.error('Error fetching category stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => fetchCategories(), [fetchCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch,
  };
}

/**
 * Hook for portfolios optimized for landing page
 */
export function usePortfoliosForLandingPage(limit: number = 6): UsePortfoliosResult {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolios = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await portfolioService.getPortfoliosForLandingPage(limit);
      setPortfolios(response.data);
      setPagination(response.pagination || null);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch portfolios for landing page';
      setError(errorMessage);
      console.error('Error fetching portfolios for landing page:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const refetch = useCallback(() => fetchPortfolios(), [fetchPortfolios]);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  return {
    portfolios,
    pagination,
    loading,
    error,
    refetch,
    loadMore: async () => {}, // Not applicable for landing page
  };
}