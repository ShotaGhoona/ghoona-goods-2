import { BaseService, ApiError } from './base.service'
import {
  Portfolio,
  PortfolioDetail,
  PortfolioListResponse,
  PortfolioFilterParams,
  CreatePortfolioData,
  UpdatePortfolioData,
  ApiResponse,
  ImageUploadResult,
} from '@/types/portfolios'

export class PortfolioService extends BaseService {
  private readonly adminEndpoint = '/api/v1/admin/portfolios'
  private readonly publicEndpoint = '/api/v1/public/portfolios'
  private readonly usePublicFallback = process.env.NODE_ENV === 'development'

  // Get authenticated token helper
  private async getAuthToken(): Promise<string | undefined> {
    try {
      const { auth } = await import('@clerk/nextjs')
      const { getToken } = auth()
      return await getToken()
    } catch (error) {
      console.warn('Clerk authentication not available:', error)
      return undefined
    }
  }

  // Get endpoint based on auth availability
  private async getEndpoint(): Promise<{ endpoint: string; token?: string }> {
    const token = await this.getAuthToken()
    
    if (token) {
      return { endpoint: this.adminEndpoint, token }
    } else if (this.usePublicFallback) {
      console.warn('Using public endpoint as fallback in development')
      return { endpoint: this.publicEndpoint }
    } else {
      throw new Error('Authentication required')
    }
  }

  // Get portfolios list with filters and pagination
  async getPortfolios(
    filters: PortfolioFilterParams = {}
  ): Promise<PortfolioListResponse> {
    const defaultFilters = {
      page: 1,
      page_size: 20,
      sort_by: 'created_at',
      sort_order: 'desc',
      ...filters,
    }

    const { endpoint, token } = await this.getEndpoint()
    return this.get<PortfolioListResponse>(endpoint, defaultFilters, token)
  }

  // Get single portfolio by ID
  async getPortfolio(id: string): Promise<PortfolioDetail> {
    const { endpoint, token } = await this.getEndpoint()
    return this.get<PortfolioDetail>(`${endpoint}/${id}`, undefined, token)
  }

  // Create new portfolio
  async createPortfolio(data: CreatePortfolioData): Promise<ApiResponse<Portfolio>> {
    const token = await this.getAuthToken()
    if (!token) throw new Error('Authentication required for portfolio creation')
    return this.post<ApiResponse<Portfolio>>(this.adminEndpoint, data, token)
  }

  // Update existing portfolio
  async updatePortfolio(
    id: string,
    data: Partial<UpdatePortfolioData>
  ): Promise<ApiResponse<Portfolio>> {
    const token = await this.getAuthToken()
    if (!token) throw new Error('Authentication required for portfolio updates')
    return this.put<ApiResponse<Portfolio>>(`${this.adminEndpoint}/${id}`, data, token)
  }

  // Delete portfolio (soft delete)
  async deletePortfolio(id: string): Promise<ApiResponse<void>> {
    const token = await this.getAuthToken()
    if (!token) throw new Error('Authentication required for portfolio deletion')
    return this.delete<ApiResponse<void>>(`${this.adminEndpoint}/${id}`, token)
  }

  // Bulk delete portfolios
  async bulkDeletePortfolios(ids: string[]): Promise<ApiResponse<void>> {
    const token = await this.getAuthToken()
    if (!token) throw new Error('Authentication required for bulk deletion')
    return this.post<ApiResponse<void>>(`${this.adminEndpoint}/bulk-delete`, {
      portfolio_ids: ids,
    }, token)
  }

  // Update portfolio status
  async updatePortfolioStatus(
    id: string,
    status: Portfolio['status']
  ): Promise<ApiResponse<Portfolio>> {
    const token = await this.getAuthToken()
    if (!token) throw new Error('Authentication required for status updates')
    return this.patch<ApiResponse<Portfolio>>(`${this.adminEndpoint}/${id}/status`, {
      status,
    }, token)
  }

  // Duplicate portfolio
  async duplicatePortfolio(id: string): Promise<ApiResponse<Portfolio>> {
    const token = await this.getAuthToken()
    if (!token) throw new Error('Authentication required for duplication')
    return this.post<ApiResponse<Portfolio>>(`${this.adminEndpoint}/${id}/duplicate`, undefined, token)
  }

  // Upload portfolio image
  async uploadPortfolioImage(
    portfolioId: string,
    file: File,
    altText?: string,
    sortOrder?: number
  ): Promise<ApiResponse<ImageUploadResult>> {
    const token = await this.getAuthToken()
    if (!token) throw new Error('Authentication required for image upload')
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('portfolio_id', portfolioId)
    
    if (altText) {
      formData.append('alt_text', altText)
    }
    
    if (sortOrder !== undefined) {
      formData.append('sort_order', sortOrder.toString())
    }

    return this.upload<ApiResponse<ImageUploadResult>>(
      `${this.adminEndpoint}/${portfolioId}/images`,
      formData,
      token
    )
  }

  // Delete portfolio image
  async deletePortfolioImage(
    portfolioId: string,
    imageId: string
  ): Promise<ApiResponse<void>> {
    const token = await this.getAuthToken()
    if (!token) throw new Error('Authentication required for image deletion')
    return this.delete<ApiResponse<void>>(
      `${this.adminEndpoint}/${portfolioId}/images/${imageId}`,
      token
    )
  }

  // Update image order
  async updateImageOrder(
    portfolioId: string,
    imageOrders: { image_id: string; sort_order: number }[]
  ): Promise<ApiResponse<void>> {
    const token = await this.getAuthToken()
    if (!token) throw new Error('Authentication required for image reordering')
    return this.put<ApiResponse<void>>(
      `${this.adminEndpoint}/${portfolioId}/images/order`,
      { image_orders: imageOrders },
      token
    )
  }

  // Get portfolio stats
  async getPortfolioStats(): Promise<ApiResponse<{
    total_portfolios: number
    total_quantity: number
    category_stats: Array<{
      category: string
      count: number
      total_quantity: number
    }>
    status_stats: Array<{
      status: string
      count: number
    }>
  }>> {
    const { endpoint, token } = await this.getEndpoint()
    return this.get<ApiResponse<any>>(`${endpoint}/stats/overview`, undefined, token)
  }

  // Search portfolios
  async searchPortfolios(
    query: string,
    filters: Partial<PortfolioFilterParams> = {}
  ): Promise<PortfolioListResponse> {
    return this.getPortfolios({
      ...filters,
      search: query,
    })
  }

  // Export portfolios
  async exportPortfolios(
    format: 'csv' | 'excel',
    filters: PortfolioFilterParams = {}
  ): Promise<Blob> {
    const token = await this.getAuthToken()
    if (!token) throw new Error('Authentication required for portfolio export')
    
    const searchParams = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })
    
    searchParams.append('format', format)

    const headers: Record<string, string> = {
      'Accept': format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Authorization': `Bearer ${token}`
    }

    const response = await fetch(
      `${this.baseUrl}${this.adminEndpoint}/export?${searchParams.toString()}`,
      {
        method: 'GET',
        headers,
      }
    )

    if (!response.ok) {
      throw new Error(`Export failed: ${response.statusText}`)
    }

    return response.blob()
  }
}

// Export singleton instance
export const portfolioService = new PortfolioService()