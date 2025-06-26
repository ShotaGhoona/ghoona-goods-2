/**
 * Base service for HTTP client and error handling
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class BaseService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        let errorDetails;
        
        try {
          errorDetails = await response.json();
          errorMessage = errorDetails.message || errorDetails.detail || errorMessage;
        } catch {
          // If response is not JSON, use the default error message
        }
        
        throw new ApiError(errorMessage, response.status, errorDetails);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        undefined,
        error
      );
    }
  }

  protected buildQueryString(params: Record<string, unknown>): string {
    const filteredParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => [key, String(value)]);
    
    if (filteredParams.length === 0) {
      return '';
    }
    
    const searchParams = new URLSearchParams(filteredParams);
    return `?${searchParams.toString()}`;
  }

  protected async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    const queryString = params ? this.buildQueryString(params) : '';
    return this.request<T>(`${endpoint}${queryString}`);
  }

  protected async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}