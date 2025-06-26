import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UploadOptions {
  folder?: string
  filename?: string
  upsert?: boolean
}

export interface UploadResult {
  url: string
  path: string
  fullPath: string
}

export class ImageUploadService {
  private readonly bucketName = 'portfolio-images'
  private readonly maxFileSize = 10 * 1024 * 1024 // 10MB
  private readonly allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

  /**
   * Upload a single image to Supabase storage
   */
  async uploadImage(
    file: File,
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    // Validate file
    this.validateFile(file)

    // Generate file path
    const filePath = this.generateFilePath(file, options)

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: options.upsert || false,
        contentType: file.type,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      throw new Error(`Failed to upload image: ${error.message}`)
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(this.bucketName)
      .getPublicUrl(data.path)

    return {
      url: urlData.publicUrl,
      path: data.path,
      fullPath: data.fullPath,
    }
  }

  /**
   * Upload multiple images
   */
  async uploadImages(
    files: File[],
    options: UploadOptions = {}
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map(file => 
      this.uploadImage(file, options)
    )

    try {
      return await Promise.all(uploadPromises)
    } catch (error) {
      // If any upload fails, clean up successfully uploaded files
      console.error('Batch upload failed:', error)
      throw error
    }
  }

  /**
   * Delete an image from storage
   */
  async deleteImage(path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(this.bucketName)
      .remove([path])

    if (error) {
      console.error('Supabase delete error:', error)
      throw new Error(`Failed to delete image: ${error.message}`)
    }
  }

  /**
   * Delete multiple images
   */
  async deleteImages(paths: string[]): Promise<void> {
    const { error } = await supabase.storage
      .from(this.bucketName)
      .remove(paths)

    if (error) {
      console.error('Supabase batch delete error:', error)
      throw new Error(`Failed to delete images: ${error.message}`)
    }
  }

  /**
   * Get a signed URL for private files (if needed in the future)
   */
  async getSignedUrl(path: string, expiresIn = 3600): Promise<string> {
    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .createSignedUrl(path, expiresIn)

    if (error) {
      throw new Error(`Failed to get signed URL: ${error.message}`)
    }

    return data.signedUrl
  }

  /**
   * Validate file before upload
   */
  private validateFile(file: File): void {
    // Check file size
    if (file.size > this.maxFileSize) {
      throw new Error(
        `File size too large. Maximum size is ${this.maxFileSize / 1024 / 1024}MB`
      )
    }

    // Check file type
    if (!this.allowedTypes.includes(file.type)) {
      throw new Error(
        `Invalid file type. Allowed types: ${this.allowedTypes.join(', ')}`
      )
    }
  }

  /**
   * Generate unique file path
   */
  private generateFilePath(file: File, options: UploadOptions): string {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    
    // Get file extension
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    
    // Use custom filename or generate one
    const filename = options.filename || 
      `${timestamp}-${randomString}.${fileExt}`
    
    // Add folder prefix if specified
    const folder = options.folder || 'portfolios'
    
    return `${folder}/${filename}`
  }

  /**
   * Extract path from Supabase URL
   */
  static extractPathFromUrl(url: string): string | null {
    try {
      const urlParts = url.split('/storage/v1/object/public/portfolio-images/')
      return urlParts[1] || null
    } catch {
      return null
    }
  }

  /**
   * Check if URL is a Supabase storage URL
   */
  static isSupabaseUrl(url: string): boolean {
    return url.includes('/storage/v1/object/public/portfolio-images/')
  }

  /**
   * Compress image before upload (optional enhancement)
   */
  private async compressImage(file: File, quality = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions (max 1920px width)
        const maxWidth = 1920
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
        
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio

        // Draw and compress
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            } else {
              resolve(file) // Fall back to original if compression fails
            }
          },
          file.type,
          quality
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }
}

// Export singleton instance
export const imageUploadService = new ImageUploadService()