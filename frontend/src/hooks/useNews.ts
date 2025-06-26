/**
 * News React hooks using service layer
 */

import { useState, useEffect, useCallback } from 'react';
import { newsService } from '@/services/news.service';
import {
  NewsItem,
  NewsDetail,
  NewsFilterParams,
  CategoryFilterResponse,
  NewsStats,
  PaginationMeta,
  ViewUpdateRequest,
} from '@/types/news';
import { ApiError } from '@/services/base.service';

interface UseNewsResult {
  news: NewsItem[];
  pagination: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
}

interface UseNewsDetailResult {
  news: NewsDetail | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateViewCount: () => Promise<void>;
}

interface UseNewsCategoriesResult {
  categories: CategoryFilterResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseNewsYearsResult {
  years: number[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseNewsStatsResult {
  stats: NewsStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching news with filtering and pagination
 */
export function useNews(
  initialFilters: NewsFilterParams = {}
): UseNewsResult {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<NewsFilterParams>(initialFilters);

  const fetchNews = useCallback(async (newFilters?: NewsFilterParams) => {
    const currentFilters = newFilters || filters;
    setLoading(true);
    setError(null);

    try {
      const response = await newsService.getNews(currentFilters);
      setNews(response.data);
      setPagination(response.pagination || null);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch news';
      setError(errorMessage);
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const refetch = useCallback(() => fetchNews(), [fetchNews]);

  const loadMore = useCallback(async () => {
    if (!pagination?.has_next || loading) return;

    const nextPageFilters = {
      ...filters,
      page: pagination.page + 1,
    };

    try {
      setLoading(true);
      const response = await newsService.getNews(nextPageFilters);
      setNews(prev => [...prev, ...response.data]);
      setPagination(response.pagination || null);
      setFilters(nextPageFilters);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to load more news';
      setError(errorMessage);
      console.error('Error loading more news:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination, loading, filters]);

  useEffect(() => {
    fetchNews(initialFilters);
  }, []);

  // Update filters and refetch when filters change
  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(initialFilters)) {
      setFilters(initialFilters);
      fetchNews(initialFilters);
    }
  }, [initialFilters, filters, fetchNews]);

  return {
    news,
    pagination,
    loading,
    error,
    refetch,
    loadMore,
  };
}

/**
 * Hook for fetching a single news article by ID
 */
export function useNewsDetail(id?: string): UseNewsDetailResult {
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await newsService.getNewsById(id);
      setNews(response);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch news';
      setError(errorMessage);
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const updateViewCount = useCallback(async () => {
    if (!id) return;

    try {
      const request: ViewUpdateRequest = {
        user_agent: navigator.userAgent
      };
      await newsService.updateViewCount(id, request);
      // Optionally update the view count in the local state
      if (news) {
        setNews(prev => prev ? {
          ...prev,
          view_count: prev.view_count + 1
        } : null);
      }
    } catch (err) {
      console.error('Error updating view count:', err);
      // Don't show error to user for view count updates
    }
  }, [id, news]);

  const refetch = useCallback(() => fetchNews(), [fetchNews]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    news,
    loading,
    error,
    refetch,
    updateViewCount,
  };
}

/**
 * Hook for fetching featured news
 */
export function useFeaturedNews(limit: number = 6): UseNewsResult {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await newsService.getFeaturedNews(limit);
      setNews(response.data);
      setPagination(response.pagination || null);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch featured news';
      setError(errorMessage);
      console.error('Error fetching featured news:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const refetch = useCallback(() => fetchNews(), [fetchNews]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    news,
    pagination,
    loading,
    error,
    refetch,
    loadMore: async () => {}, // Not applicable for featured news
  };
}

/**
 * Hook for fetching latest news (for homepage)
 */
export function useLatestNews(limit: number = 6): UseNewsResult {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await newsService.getLatestNews(limit);
      setNews(response.data);
      setPagination(response.pagination || null);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch latest news';
      setError(errorMessage);
      console.error('Error fetching latest news:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const refetch = useCallback(() => fetchNews(), [fetchNews]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    news,
    pagination,
    loading,
    error,
    refetch,
    loadMore: async () => {}, // Not applicable for latest news
  };
}

/**
 * Hook for fetching related news
 */
export function useRelatedNews(id?: string, limit: number = 3): UseNewsResult {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await newsService.getRelatedNews(id, limit);
      setNews(response.data);
      setPagination(null); // Related news doesn't have pagination
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch related news';
      setError(errorMessage);
      console.error('Error fetching related news:', err);
    } finally {
      setLoading(false);
    }
  }, [id, limit]);

  const refetch = useCallback(() => fetchNews(), [fetchNews]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    news,
    pagination,
    loading,
    error,
    refetch,
    loadMore: async () => {}, // Not applicable for related news
  };
}

/**
 * Hook for fetching news categories for filtering
 */
export function useNewsCategories(): UseNewsCategoriesResult {
  const [categories, setCategories] = useState<CategoryFilterResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await newsService.getCategoriesForFilter();
      setCategories(response);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch news categories';
      setError(errorMessage);
      console.error('Error fetching news categories:', err);
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
 * Hook for fetching available years for filtering
 */
export function useNewsYears(): UseNewsYearsResult {
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchYears = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await newsService.getAvailableYears();
      setYears(response.data);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch available years';
      setError(errorMessage);
      console.error('Error fetching available years:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => fetchYears(), [fetchYears]);

  useEffect(() => {
    fetchYears();
  }, [fetchYears]);

  return {
    years,
    loading,
    error,
    refetch,
  };
}

/**
 * Hook for fetching news statistics
 */
export function useNewsStats(): UseNewsStatsResult {
  const [stats, setStats] = useState<NewsStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await newsService.getCategoryStats();
      setStats(response);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch news stats';
      setError(errorMessage);
      console.error('Error fetching news stats:', err);
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