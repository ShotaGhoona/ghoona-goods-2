"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PortfolioDetail } from "@/types/portfolio"

interface GalleryDetailHeroProps {
  item: PortfolioDetail
}

export default function GalleryDetailHero({ item }: GalleryDetailHeroProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'original-badge': return 'オリジナル缶バッジ'
      case 'standard-badge': return 'スタンダード缶バッジ'
      case 'acrylic-stand': return 'アクリルスタンド'
      case 'acrylic-keychain': return 'アクリルキーホルダー'
      default: return category
    }
  }

  const getIndustryName = (industry: string) => {
    switch (industry) {
      case 'anime': return 'アニメ・ゲーム'
      case 'corporate': return '企業・団体'
      case 'event': return 'イベント'
      case 'personal': return '個人・同人'
      default: return industry
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'original-badge': return '🎨'
      case 'standard-badge': return '⭐'
      case 'acrylic-stand': return '🏢'
      case 'acrylic-keychain': return '🔑'
      default: return '📦'
    }
  }

  // Get images for display (placeholder for now)
  const getDisplayImages = () => {
    if (item.images && item.images.length > 0) {
      return item.images.map(img => img.image_url)
    }
    return ["/api/placeholder/600/400"] // fallback
  }

  const displayImages = getDisplayImages()

  // Get tags for display
  const getDisplayTags = () => {
    if (item.tags && item.tags.length > 0) {
      return item.tags.map(tag => tag.tag_name)
    }
    return [getCategoryName(item.category), getIndustryName(item.industry)] // fallback
  }

  const displayTags = getDisplayTags()

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-primary/5 pt-20">
      {/* 背景パターン */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-32 w-32 h-32 bg-secondary rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左側：テキスト情報 */}
          <div className="space-y-6">
            {/* パンくずナビ */}
            <div className={`transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <nav className="flex items-center space-x-2 text-sm text-foreground/60 mb-6">
                <button 
                  onClick={() => router.push('/gallery')}
                  className="hover:text-primary transition-colors"
                >
                  製造実績
                </button>
                <span>›</span>
                <span className="text-foreground">{getCategoryName(item.category)}</span>
                <span>›</span>
                <span className="text-foreground">{item.title}</span>
              </nav>
            </div>

            {/* カテゴリバッジ */}
            <div className={`transition-all duration-1000 ease-out delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center space-x-1">
                  <span>{getCategoryIcon(item.category)}</span>
                  <span>{getCategoryName(item.category)}</span>
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                  {item.year}年
                </span>
                <span className="px-3 py-1 bg-card/30 text-foreground rounded-full text-sm font-medium">
                  {getIndustryName(item.industry)}
                </span>
              </div>
            </div>

            {/* タイトル */}
            <div className={`transition-all duration-1000 ease-out delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4 leading-tight">
                {item.title}
              </h1>
            </div>

            {/* 製造情報 */}
            <div className={`transition-all duration-1000 ease-out delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="bg-card/20 backdrop-blur-sm rounded-xl border border-border/20 p-4">
                <div className="text-center">
                  <p className="text-sm text-foreground/60 mb-1">製造数量</p>
                  <p className="font-medium text-foreground text-xl">
                    {item.quantity.toLocaleString()}<span className="text-sm text-foreground/70">個</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 説明 */}
            <div className={`transition-all duration-1000 ease-out delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-lg text-foreground/70 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* タグ */}
            <div className={`transition-all duration-1000 ease-out delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex flex-wrap gap-2">
                {displayTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/5 text-primary border border-primary/20 rounded-lg text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 右側：画像ギャラリー */}
          <div className={`transition-all duration-1000 ease-out delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="relative">
              {/* メイン画像 */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-border/20 aspect-[4/3] overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl opacity-30 mb-4">
                      {getCategoryIcon(item.category)}
                    </div>
                    <p className="text-foreground/40 font-medium">
                      {getCategoryName(item.category)}
                    </p>
                    <p className="text-xs text-foreground/30 mt-2">
                      画像 {currentImageIndex + 1} / {displayImages.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* 画像ナビゲーション */}
              {displayImages.length > 1 && (
                <div className="flex space-x-2 justify-center">
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-12 h-12 rounded-lg border border-border/20 transition-all duration-200 ${
                        currentImageIndex === index
                          ? 'bg-primary/20 border-primary/50'
                          : 'bg-card/20 hover:bg-card/40'
                      }`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-foreground/60">
                          {index + 1}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {/* 装飾要素 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}