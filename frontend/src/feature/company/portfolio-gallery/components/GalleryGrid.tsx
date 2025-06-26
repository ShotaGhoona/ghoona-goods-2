"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePortfolios } from "@/hooks/usePortfolio"
import { PortfolioFilterParams } from "@/types/portfolio"

interface GalleryGridProps {
  selectedCategory?: string
  selectedYear?: string
  selectedIndustry?: string
  searchTerm?: string
}

export default function GalleryGrid({ 
  selectedCategory = "all", 
  selectedYear = "all",
  selectedIndustry = "all",
  searchTerm = ""
}: GalleryGridProps) {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  // Build filter parameters
  const filters: PortfolioFilterParams = {
    page: 1,
    page_size: 20,
    ...(selectedCategory !== "all" && { category: selectedCategory }),
    ...(selectedYear !== "all" && { year: parseInt(selectedYear) }),
    ...(selectedIndustry !== "all" && { industry: selectedIndustry }),
    ...(searchTerm && { search: searchTerm }),
    sort_by: "sort_order",
    sort_order: "asc"
  }

  const { portfolios, loading, error, refetch } = usePortfolios(filters)


  // Helper function to get category display name
  const getCategoryDisplayName = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'original-badge': 'オリジナル缶バッジ',
      'standard-badge': 'スタンダード缶バッジ',
      'acrylic-stand': 'アクリルスタンド',
      'acrylic-keychain': 'アクリルキーホルダー'
    }
    return categoryMap[category] || category
  }

  // Helper function to get industry display name
  const getIndustryDisplayName = (industry: string): string => {
    const industryMap: Record<string, string> = {
      'anime': 'アニメ・ゲーム',
      'corporate': '企業・団体',
      'event': 'イベント',
      'personal': '個人・同人'
    }
    return industryMap[industry] || industry
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('gallery-grid')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="gallery-grid" className="py-16 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground/60">製造実績を読み込み中...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="text-6xl text-red-500/20 mb-4">⚠️</div>
            <h3 className="text-xl font-medium text-foreground mb-2">
              データの読み込みに失敗しました
            </h3>
            <p className="text-foreground/60 mb-4">{error}</p>
            <button 
              onClick={refetch}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              再試行
            </button>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && (
          <>
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-3xl font-light text-foreground mb-4">
                製造実績 <span className="font-bold text-primary">{portfolios.length}</span> 件
              </h3>
              <p className="text-foreground/60">
                お客様のご要望にお応えした製品をご紹介します
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/portfolio/${item.id}`)}
                  className={`group bg-card/30 backdrop-blur-sm rounded-2xl border border-border/20 overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 cursor-pointer ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* 画像エリア */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                        {item.year}年
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-card/80 backdrop-blur-sm text-foreground text-xs rounded-full font-medium">
                        {item.quantity.toLocaleString()}個
                      </span>
                    </div>
                    {/* プレースホルダー画像の代わりに背景パターン */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <div className="text-6xl opacity-30">
                        {item.category === 'original-badge' && '🎨'}
                        {item.category === 'standard-badge' && '⭐'}
                        {item.category === 'acrylic-stand' && '🏢'}
                        {item.category === 'acrylic-keychain' && '🔑'}
                      </div>
                    </div>
                  </div>

                  {/* コンテンツエリア */}
                  <div className="p-6">
                    <h4 className="text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* タグ (現在は未実装のため簡易版) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
                        {getCategoryDisplayName(item.category)}
                      </span>
                      <span className="px-2 py-1 bg-secondary/10 text-secondary-foreground text-xs rounded-md font-medium">
                        {getIndustryDisplayName(item.industry)}
                      </span>
                    </div>

                    {/* カテゴリと業界 */}
                    <div className="flex justify-between text-xs text-foreground/50">
                      <span>{getCategoryDisplayName(item.category)}</span>
                      <span>{getIndustryDisplayName(item.industry)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 結果が0件の場合 */}
            {portfolios.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl text-foreground/20 mb-4">🔍</div>
                <h3 className="text-xl font-medium text-foreground mb-2">
                  該当する実績が見つかりませんでした
                </h3>
                <p className="text-foreground/60">
                  フィルター条件を変更してお試しください
                </p>
              </div>
            )}
          </>
        )}

        {/* お問い合わせCTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-border/20 p-8">
            <h3 className="text-2xl font-light text-foreground mb-4">
              あなたのアイデアを<span className="font-bold text-primary">カタチ</span>にしませんか？
            </h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              お客様のご要望に合わせて、オリジナルの缶バッジやアクリル製品を製作いたします。
              小ロットから大量生産まで、幅広く対応可能です。
            </p>
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
              製作のご相談はこちら
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}