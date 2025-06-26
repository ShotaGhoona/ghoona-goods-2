"use client"

import { useState, useEffect } from "react"
import { useCategoryStats } from "@/hooks/usePortfolio"

interface GalleryFilterProps {
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
  selectedYear?: string
  onYearChange?: (year: string) => void
  selectedIndustry?: string
  onIndustryChange?: (industry: string) => void
  searchTerm?: string
  onSearchChange?: (search: string) => void
}

export default function GalleryFilter({ 
  selectedCategory = "all", 
  onCategoryChange = () => {},
  selectedYear = "all",
  onYearChange = () => {},
  selectedIndustry = "all",
  onIndustryChange = () => {},
  searchTerm = "",
  onSearchChange = () => {}
}: GalleryFilterProps) {
  const [searchInput, setSearchInput] = useState(searchTerm)
  const { categories: categoryStatsData, loading: categoryLoading } = useCategoryStats()

  // Static categories with dynamic counts
  const categories = [
    { id: "all", name: "すべて", icon: "🎨", count: 0 },
    { id: "original-badge", name: "オリジナル缶バッジ", icon: "🎨", count: 0 },
    { id: "standard-badge", name: "通常缶バッジ", icon: "⭐", count: 0 },
    { id: "acrylic-stand", name: "アクリルスタンド", icon: "🏢", count: 0 },
    { id: "acrylic-keychain", name: "アクリルキーホルダー", icon: "🔑", count: 0 }
  ]

  // Update categories with API counts
  if (categoryStatsData?.categories) {
    const apiCategories = categoryStatsData.categories
    categories.forEach(cat => {
      if (cat.id === "all") {
        cat.count = apiCategories.reduce((sum, apiCat) => sum + apiCat.count, 0)
      } else {
        const apiCat = apiCategories.find(api => api.id === cat.id)
        cat.count = apiCat?.count || 0
      }
    })
  }

  const years = [
    { id: "all", name: "すべての年" },
    { id: "2024", name: "2024年" },
    { id: "2023", name: "2023年" },
    { id: "2022", name: "2022年" },
    { id: "2021", name: "2021年" }
  ]

  const industries = [
    { id: "all", name: "すべての業界" },
    { id: "anime", name: "アニメ・ゲーム" },
    { id: "corporate", name: "企業・団体" },
    { id: "event", name: "イベント" },
    { id: "personal", name: "個人・同人" }
  ]

  // Handle search input with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchInput)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput, onSearchChange])

  return (
    <section className="py-12 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-light text-foreground mb-2">
            実績を<span className="font-bold text-primary">絞り込む</span>
          </h3>
          <p className="text-foreground/60 text-sm">
            カテゴリや年度から、ご希望の実績をお探しください
          </p>
        </div>

        {/* メインフィルターエリア */}
        <div className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/20 p-6 mb-6">
          {/* カテゴリフィルター - タブスタイル */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="text-lg mr-2">🎨</span>
              <h4 className="text-lg font-medium text-foreground">商品カテゴリ</h4>
            </div>
            <div className="bg-card/30 rounded-xl p-2 border border-border/20">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`relative px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground hover:bg-card/60'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-base">{category.icon}</span>
                      <span className="text-xs leading-tight text-center">{category.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-foreground/10 text-foreground/60'
                      }`}>
                        {categoryLoading ? '...' : (category.count ?? 0)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 年度フィルター - ボタンスタイル */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="text-lg mr-2">📅</span>
              <h4 className="text-lg font-medium text-foreground">製造年度</h4>
            </div>
            <div className="bg-card/30 rounded-xl p-2 border border-border/20">
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <button
                    key={year.id}
                    onClick={() => onYearChange(year.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedYear === year.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground hover:bg-card/60'
                    }`}
                  >
                    {year.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 業界フィルター */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="text-lg mr-2">🏢</span>
              <h4 className="text-lg font-medium text-foreground">業界・用途</h4>
            </div>
            <div className="bg-card/30 rounded-xl p-2 border border-border/20">
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => onIndustryChange(industry.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedIndustry === industry.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground hover:bg-card/60'
                    }`}
                  >
                    {industry.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 検索フィルター */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-lg mr-2">🔍</span>
              <h4 className="text-lg font-medium text-foreground">キーワード検索</h4>
            </div>
            <div className="bg-card/30 rounded-xl p-2 border border-border/20">
              <input
                type="text"
                placeholder="製品名や説明文から検索..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-foreground placeholder-foreground/50 border-none outline-none"
              />
            </div>
          </div>
        </div>

        {/* クイックアクション */}
        <div className="flex justify-center items-center space-x-4 text-sm">
          <button 
            onClick={() => {
              onCategoryChange("all")
              onYearChange("all")
              onIndustryChange("all")
              setSearchInput("")
              onSearchChange("")
            }}
            className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors flex items-center space-x-1"
          >
            <span>🔄</span>
            <span>すべてリセット</span>
          </button>
          <div className="w-px h-4 bg-border/30"></div>
          <div className="text-foreground/60 flex items-center space-x-1">
            <span>📊</span>
            <span>
              {selectedCategory === "all" && selectedYear === "all" && selectedIndustry === "all" && !searchTerm
                ? "全ての実績を表示中" 
                : "フィルター適用中"
              }
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}