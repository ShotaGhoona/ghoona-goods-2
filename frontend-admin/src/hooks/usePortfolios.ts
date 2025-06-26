'use client'

import { useState, useEffect, useCallback } from 'react'
import { portfolioService } from '@/services/api/portfolios.service'
import {
  Portfolio,
  PortfolioDetail,
  PortfolioListResponse,
  PortfolioFilterParams,
  CreatePortfolioData,
  UpdatePortfolioData,
} from '@/types/portfolios'

// Hook for portfolio list
export function usePortfolios(initialFilters: PortfolioFilterParams = {}) {
  const [data, setData] = useState<PortfolioListResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PortfolioFilterParams>(initialFilters)

  const fetchPortfolios = useCallback(async (newFilters?: PortfolioFilterParams) => {
    setLoading(true)
    setError(null)
    
    try {
      const currentFilters = newFilters || filters
      const response = await portfolioService.getPortfolios(currentFilters)
      setData(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolios')
    } finally {
      setLoading(false)
    }
  }, [filters])

  const updateFilters = useCallback((newFilters: Partial<PortfolioFilterParams>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    fetchPortfolios(updatedFilters)
  }, [filters, fetchPortfolios])

  const refresh = useCallback(() => {
    fetchPortfolios()
  }, [fetchPortfolios])

  useEffect(() => {
    fetchPortfolios()
  }, []) // Only run on mount

  return {
    data,
    portfolios: data?.data || [],
    pagination: data?.pagination,
    loading,
    error,
    filters,
    updateFilters,
    refresh,
  }
}

// Hook for single portfolio
export function usePortfolio(id: string | null) {
  const [portfolio, setPortfolio] = useState<PortfolioDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPortfolio = useCallback(async () => {
    if (!id) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await portfolioService.getPortfolio(id)
      setPortfolio(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio')
    } finally {
      setLoading(false)
    }
  }, [id])

  const refresh = useCallback(() => {
    fetchPortfolio()
  }, [fetchPortfolio])

  useEffect(() => {
    fetchPortfolio()
  }, [fetchPortfolio])

  return {
    portfolio,
    loading,
    error,
    refresh,
  }
}

// Hook for portfolio mutations
export function usePortfolioMutations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createPortfolio = useCallback(async (data: CreatePortfolioData): Promise<Portfolio | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await portfolioService.createPortfolio(data)
      return response.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create portfolio')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePortfolio = useCallback(async (
    id: string, 
    data: Partial<UpdatePortfolioData>
  ): Promise<Portfolio | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await portfolioService.updatePortfolio(id, data)
      return response.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update portfolio')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePortfolio = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    
    try {
      await portfolioService.deletePortfolio(id)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete portfolio')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const bulkDeletePortfolios = useCallback(async (ids: string[]): Promise<boolean> => {
    setLoading(true)
    setError(null)
    
    try {
      await portfolioService.bulkDeletePortfolios(ids)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete portfolios')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePortfolioStatus = useCallback(async (
    id: string, 
    status: Portfolio['status']
  ): Promise<Portfolio | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await portfolioService.updatePortfolioStatus(id, status)
      return response.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update portfolio status')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const duplicatePortfolio = useCallback(async (id: string): Promise<Portfolio | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await portfolioService.duplicatePortfolio(id)
      return response.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to duplicate portfolio')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    bulkDeletePortfolios,
    updatePortfolioStatus,
    duplicatePortfolio,
  }
}

// Hook for portfolio stats
export function usePortfolioStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await portfolioService.getPortfolioStats()
      setStats(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    refresh: fetchStats,
  }
}