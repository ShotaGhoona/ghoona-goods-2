'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, X, Eye, EyeOff, Loader2 } from 'lucide-react'
import { usePortfolioMutations } from '@/hooks/usePortfolios'
import { Portfolio, CreatePortfolioData, UpdatePortfolioData } from '@/types/portfolios'
import { imageUploadService } from '@/services/storage/image-upload.service'

const formSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200, 'タイトルは200文字以内で入力してください'),
  description: z.string().optional(),
  category: z.enum(['original-badge', 'standard-badge', 'acrylic-stand', 'acrylic-keychain']),
  industry: z.enum(['anime', 'corporate', 'event', 'personal']),
  year: z.coerce.number().min(2000, '2000年以降を入力してください').max(new Date().getFullYear() + 1, '未来の年は入力できません'),
  quantity: z.coerce.number().min(1, '1以上の数値を入力してください').max(1000000, '100万以下の数値を入力してください'),
  status: z.enum(['active', 'draft', 'archived']).default('draft'),
  client_name: z.string().optional(),
  project_duration_days: z.coerce.number().optional(),
  materials: z.string().optional(),
  special_features: z.string().optional(),
  challenges: z.string().optional(),
  solutions: z.string().optional(),
  client_feedback: z.string().optional(),
  tags: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const categoryOptions = [
  { value: 'original-badge', label: 'オリジナル缶バッジ' },
  { value: 'standard-badge', label: 'スタンダード缶バッジ' },
  { value: 'acrylic-stand', label: 'アクリルスタンド' },
  { value: 'acrylic-keychain', label: 'アクリルキーホルダー' },
] as const

const industryOptions = [
  { value: 'anime', label: 'アニメ・ゲーム' },
  { value: 'corporate', label: '企業・団体' },
  { value: 'event', label: 'イベント' },
  { value: 'personal', label: '個人・同人' },
] as const

const statusOptions = [
  { value: 'draft', label: '下書き' },
  { value: 'active', label: '公開中' },
  { value: 'archived', label: 'アーカイブ' },
] as const

interface PortfolioFormProps {
  portfolio?: Portfolio
  mode: 'create' | 'edit'
  onSuccess?: (portfolio: Portfolio) => void
  onCancel?: () => void
}

interface ImageFile {
  file?: File
  preview: string
  uploading?: boolean
  url?: string // For existing images
  isExisting?: boolean
}

export function PortfolioForm({ portfolio, mode, onSuccess, onCancel }: PortfolioFormProps) {
  const router = useRouter()
  const { createPortfolio, updatePortfolio, loading, error } = usePortfolioMutations()
  const [images, setImages] = useState<ImageFile[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [, setUploadProgress] = useState<{ [key: number]: number }>({})

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: portfolio?.title || '',
      description: portfolio?.description || '',
      category: portfolio?.category || 'original-badge',
      industry: portfolio?.industry || 'anime',
      year: portfolio?.year || new Date().getFullYear(),
      quantity: portfolio?.quantity || 1,
      status: portfolio?.status || 'draft',
      client_name: portfolio?.client_name || '',
      project_duration_days: portfolio?.project_duration_days || undefined,
      materials: portfolio?.materials || '',
      special_features: portfolio?.special_features || '',
      challenges: portfolio?.challenges || '',
      solutions: portfolio?.solutions || '',
      client_feedback: portfolio?.client_feedback || '',
      tags: portfolio?.tags?.join(', ') || '',
    },
  })

  // Load existing images for edit mode
  useEffect(() => {
    if (mode === 'edit' && portfolio) {
      const existingImages: ImageFile[] = []
      
      if (portfolio.main_image) {
        existingImages.push({
          preview: portfolio.main_image,
          url: portfolio.main_image,
          isExisting: true,
        })
      }
      
      if (portfolio.additional_images) {
        portfolio.additional_images.forEach(imageUrl => {
          existingImages.push({
            preview: imageUrl,
            url: imageUrl,
            isExisting: true,
          })
        })
      }
      
      setImages(existingImages)
    }
  }, [mode, portfolio])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        // Validate file
        try {
          // Basic validation (size, type)
          const maxSize = 10 * 1024 * 1024 // 10MB
          if (file.size > maxSize) {
            alert(`ファイルサイズが大きすぎます。${file.name} は ${maxSize / 1024 / 1024}MB 以下にしてください。`)
            return
          }

          const preview = URL.createObjectURL(file)
          setImages(prev => [...prev, { file, preview, uploading: false }])
        } catch (error) {
          console.error('File validation error:', error)
          alert(`画像の追加に失敗しました: ${file.name}`)
        }
      }
    })
    
    // Reset input
    event.target.value = ''
  }

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const onSubmit = async (data: FormData) => {
    try {
      // Upload new images first
      const imageUrls = await uploadImages()
      
      const portfolioData: CreatePortfolioData | UpdatePortfolioData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        main_image: imageUrls.length > 0 ? imageUrls[0] : undefined,
        additional_images: imageUrls.length > 1 ? imageUrls.slice(1) : undefined,
      }

      let result: Portfolio | null = null

      if (mode === 'create') {
        result = await createPortfolio(portfolioData as CreatePortfolioData)
      } else if (portfolio) {
        result = await updatePortfolio(portfolio.id, portfolioData)
      }

      if (result) {
        onSuccess?.(result)
        
        if (mode === 'create') {
          router.push('/portfolios')
        }
      }
    } catch (err) {
      console.error('Form submission error:', err)
    }
  }

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = []
    
    // Process existing images (already have URLs)
    images.forEach(image => {
      if (image.isExisting && image.url) {
        uploadedUrls.push(image.url)
      }
    })
    
    // Upload new images
    const newImages = images.filter(image => image.file && !image.isExisting)
    
    if (newImages.length > 0) {
      try {
        for (let i = 0; i < newImages.length; i++) {
          const image = newImages[i]
          if (image.file) {
            setUploadProgress(prev => ({ ...prev, [i]: 0 }))
            
            // Mark as uploading
            setImages(prev => prev.map((img) => 
              img === image ? { ...img, uploading: true } : img
            ))
            
            const uploadResult = await imageUploadService.uploadImage(image.file, {
              folder: 'portfolios',
            })
            
            uploadedUrls.push(uploadResult.url)
            
            // Mark as completed
            setImages(prev => prev.map((img) => 
              img === image ? { 
                ...img, 
                uploading: false, 
                url: uploadResult.url,
                isExisting: true 
              } : img
            ))
            
            setUploadProgress(prev => ({ ...prev, [i]: 100 }))
          }
        }
      } catch (error) {
        console.error('Image upload error:', error)
        throw new Error('画像のアップロードに失敗しました')
      }
    }
    
    return uploadedUrls
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      router.back()
    }
  }

  // Toggle advanced fields visibility
  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Portfolio を作成' : 'Portfolio を編集'}
          </h1>
          <p className="text-gray-500">
            {mode === 'create' 
              ? '新しい製造実績を登録します' 
              : 'Portfolio の情報を更新します'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleAdvanced}
            className="text-sm"
          >
            {showAdvanced ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
            {showAdvanced ? '詳細を非表示' : '詳細を表示'}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タイトル *</FormLabel>
                    <FormControl>
                      <Input placeholder="例: アニメキャラクター缶バッジセット" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>説明</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Portfolio の詳細説明を入力してください"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>カテゴリ *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="カテゴリを選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>業界 *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="業界を選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {industryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>製造年 *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>製造数 *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ステータス *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="ステータスを選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>画像</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Image Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600 hover:underline">
                        クリックして画像をアップロード
                      </span>
                      {' '}または画像をドラッグ&ドロップ
                    </div>
                    <div className="text-xs text-gray-500">
                      PNG, JPG, WebP 形式 (最大10MB)
                    </div>
                  </label>
                </div>

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={image.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Upload progress overlay */}
                          {image.uploading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <div className="text-white text-center">
                                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                                <div className="text-sm">アップロード中...</div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          disabled={image.uploading}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        
                        {/* Main image badge */}
                        {index === 0 && (
                          <Badge className="absolute bottom-2 left-2 bg-blue-500">
                            メイン画像
                          </Badge>
                        )}
                        
                        {/* Existing image badge */}
                        {image.isExisting && (
                          <Badge className="absolute top-2 left-2 bg-green-500">
                            既存
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Advanced Fields */}
          {showAdvanced && (
            <Card>
              <CardHeader>
                <CardTitle>詳細情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="client_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>クライアント名</FormLabel>
                      <FormControl>
                        <Input placeholder="株式会社○○" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="project_duration_days"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>プロジェクト期間（日数）</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="30" {...field} />
                      </FormControl>
                      <FormDescription>
                        受注から納品までの日数
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="materials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>使用素材</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="例: スチール、透明アクリル、UV印刷"
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="special_features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>特徴・セールスポイント</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="例: 特殊印刷技術により鮮やかな発色を実現"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="challenges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>課題・困難</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="プロジェクトで直面した課題"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="solutions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>解決策・工夫</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="課題に対してどのように解決したか"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="client_feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>クライアントフィードバック</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="クライアントからの評価やコメント"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>タグ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="例: アニメ, キャラクター, イベント限定"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        カンマ区切りで複数のタグを入力
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="text-red-600">
                  <p className="text-sm font-medium">エラーが発生しました</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '保存中...' : mode === 'create' ? '作成' : '更新'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}