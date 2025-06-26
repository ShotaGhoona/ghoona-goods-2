'use client'

import { useState, useCallback } from 'react'
import { uploadService } from '@/services/api/upload.service'
import { portfolioService } from '@/services/api/portfolios.service'
import { ImageUploadResult } from '@/types/portfolios'

export interface UploadProgress {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  result?: ImageUploadResult
  error?: string
}

// Hook for general file upload
export function useFileUpload() {
  const [uploads, setUploads] = useState<Map<string, UploadProgress>>(new Map())
  const [loading, setLoading] = useState(false)

  const uploadFile = useCallback(async (
    file: File,
    folder: string = 'portfolios'
  ): Promise<ImageUploadResult | null> => {
    const fileId = `${file.name}-${Date.now()}`
    
    setUploads(prev => new Map(prev.set(fileId, {
      file,
      progress: 0,
      status: 'uploading'
    })))
    
    setLoading(true)

    try {
      // Update progress (simulated - real progress would need server support)
      setUploads(prev => new Map(prev.set(fileId, {
        ...prev.get(fileId)!,
        progress: 50
      })))

      const response = await uploadService.uploadFile(file, folder)
      
      setUploads(prev => new Map(prev.set(fileId, {
        ...prev.get(fileId)!,
        progress: 100,
        status: 'success',
        result: response.data
      })))

      return response.data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      
      setUploads(prev => new Map(prev.set(fileId, {
        ...prev.get(fileId)!,
        status: 'error',
        error: errorMessage
      })))

      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const uploadFiles = useCallback(async (
    files: File[],
    folder: string = 'portfolios'
  ): Promise<ImageUploadResult[]> => {
    setLoading(true)
    const results: ImageUploadResult[] = []

    for (const file of files) {
      const result = await uploadFile(file, folder)
      if (result) {
        results.push(result)
      }
    }

    setLoading(false)
    return results
  }, [uploadFile])

  const clearUploads = useCallback(() => {
    setUploads(new Map())
  }, [])

  const removeUpload = useCallback((fileId: string) => {
    setUploads(prev => {
      const newMap = new Map(prev)
      newMap.delete(fileId)
      return newMap
    })
  }, [])

  return {
    uploads: Array.from(uploads.values()),
    loading,
    uploadFile,
    uploadFiles,
    clearUploads,
    removeUpload,
  }
}

// Hook for portfolio image upload
export function usePortfolioImageUpload(portfolioId?: string) {
  const [uploads, setUploads] = useState<Map<string, UploadProgress>>(new Map())
  const [loading, setLoading] = useState(false)

  const uploadPortfolioImage = useCallback(async (
    file: File,
    altText?: string,
    sortOrder?: number
  ): Promise<ImageUploadResult | null> => {
    if (!portfolioId) {
      throw new Error('Portfolio ID is required')
    }

    const fileId = `${file.name}-${Date.now()}`
    
    setUploads(prev => new Map(prev.set(fileId, {
      file,
      progress: 0,
      status: 'uploading'
    })))
    
    setLoading(true)

    try {
      const response = await portfolioService.uploadPortfolioImage(
        portfolioId,
        file,
        altText,
        sortOrder
      )
      
      setUploads(prev => new Map(prev.set(fileId, {
        ...prev.get(fileId)!,
        progress: 100,
        status: 'success',
        result: response.data
      })))

      return response.data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      
      setUploads(prev => new Map(prev.set(fileId, {
        ...prev.get(fileId)!,
        status: 'error',
        error: errorMessage
      })))

      return null
    } finally {
      setLoading(false)
    }
  }, [portfolioId])

  const uploadMultipleImages = useCallback(async (
    files: Array<{
      file: File
      altText?: string
      sortOrder?: number
    }>
  ): Promise<ImageUploadResult[]> => {
    setLoading(true)
    const results: ImageUploadResult[] = []

    for (const { file, altText, sortOrder } of files) {
      const result = await uploadPortfolioImage(file, altText, sortOrder)
      if (result) {
        results.push(result)
      }
    }

    setLoading(false)
    return results
  }, [uploadPortfolioImage])

  const deletePortfolioImage = useCallback(async (
    imageId: string
  ): Promise<boolean> => {
    if (!portfolioId) {
      throw new Error('Portfolio ID is required')
    }

    setLoading(true)

    try {
      await portfolioService.deletePortfolioImage(portfolioId, imageId)
      return true
    } catch (error) {
      console.error('Failed to delete image:', error)
      return false
    } finally {
      setLoading(false)
    }
  }, [portfolioId])

  const updateImageOrder = useCallback(async (
    imageOrders: { image_id: string; sort_order: number }[]
  ): Promise<boolean> => {
    if (!portfolioId) {
      throw new Error('Portfolio ID is required')
    }

    setLoading(true)

    try {
      await portfolioService.updateImageOrder(portfolioId, imageOrders)
      return true
    } catch (error) {
      console.error('Failed to update image order:', error)
      return false
    } finally {
      setLoading(false)
    }
  }, [portfolioId])

  const clearUploads = useCallback(() => {
    setUploads(new Map())
  }, [])

  return {
    uploads: Array.from(uploads.values()),
    loading,
    uploadPortfolioImage,
    uploadMultipleImages,
    deletePortfolioImage,
    updateImageOrder,
    clearUploads,
  }
}