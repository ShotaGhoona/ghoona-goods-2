import { BaseService, ApiError } from './base.service'
import { ImageUploadResult, ApiResponse } from '@/types/portfolios'

export class UploadService extends BaseService {
  private readonly baseEndpoint = '/api/v1/upload'

  // Upload single file
  async uploadFile(
    file: File,
    folder: string = 'portfolios'
  ): Promise<ApiResponse<ImageUploadResult>> {
    // Validate file type
    this.validateImageFile(file)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    return this.upload<ApiResponse<ImageUploadResult>>(
      `${this.baseEndpoint}/single`,
      formData
    )
  }

  // Upload multiple files
  async uploadFiles(
    files: File[],
    folder: string = 'portfolios'
  ): Promise<ApiResponse<ImageUploadResult[]>> {
    // Validate all files
    files.forEach(file => this.validateImageFile(file))

    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    formData.append('folder', folder)

    return this.upload<ApiResponse<ImageUploadResult[]>>(
      `${this.baseEndpoint}/multiple`,
      formData
    )
  }

  // Delete uploaded file
  async deleteFile(filePath: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`${this.baseEndpoint}/file`, {
      file_path: filePath,
    } as any)
  }

  // Get file info
  async getFileInfo(filePath: string): Promise<ApiResponse<{
    url: string
    size: number
    mime_type: string
    created_at: string
  }>> {
    return this.get<ApiResponse<any>>(`${this.baseEndpoint}/info`, {
      file_path: filePath,
    })
  }

  // Validate image file
  private validateImageFile(file: File): void {
    const allowedTypes = (
      process.env.NEXT_PUBLIC_ALLOWED_IMAGE_TYPES || 
      'image/jpeg,image/png,image/webp'
    ).split(',')

    const maxSize = parseInt(
      process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760'
    ) // 10MB default

    if (!allowedTypes.includes(file.type)) {
      throw new ApiError(
        `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
      )
    }

    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / 1024 / 1024)
      throw new ApiError(`File size too large. Maximum size: ${maxSizeMB}MB`)
    }
  }

  // Generate optimized image variants
  async generateImageVariants(
    filePath: string,
    variants: Array<{
      width: number
      height?: number
      quality?: number
      format?: 'webp' | 'jpeg' | 'png'
    }>
  ): Promise<ApiResponse<{ [key: string]: string }>> {
    return this.post<ApiResponse<any>>(`${this.baseEndpoint}/variants`, {
      file_path: filePath,
      variants,
    })
  }

  // Get image metadata
  async getImageMetadata(filePath: string): Promise<ApiResponse<{
    width: number
    height: number
    format: string
    size: number
    exif?: Record<string, any>
  }>> {
    return this.get<ApiResponse<any>>(`${this.baseEndpoint}/metadata`, {
      file_path: filePath,
    })
  }
}

// Export singleton instance
export const uploadService = new UploadService()