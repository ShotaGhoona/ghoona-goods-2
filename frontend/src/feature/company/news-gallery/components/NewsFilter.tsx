"use client"

import { useState } from "react"
import { useNewsCategories, useNewsYears } from "@/hooks/useNews"

interface NewsFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedYear: string
  onYearChange: (year: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

export default function NewsFilter({
  selectedCategory,
  onCategoryChange,
  selectedYear,
  onYearChange,
  searchTerm,
  onSearchChange
}: NewsFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Fetch categories and years from API
  const { categories: categoryData, loading: categoriesLoading, error: categoriesError } = useNewsCategories()
  const { years: yearData, loading: yearsLoading, error: yearsError } = useNewsYears()

  // Transform API data to component format
  const categories = categoryData?.categories || []
  const years = [
    { id: "all", label: "すべての年" },
    ...(yearData?.map(year => ({ id: year.toString(), label: `${year}年` })) || [])
  ]

  return (
    <section className="py-16 px-6 bg-background border-b border-border/20">
      <div className="container mx-auto max-w-7xl">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="記事を検索..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-card/50 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters Toggle */}
        <div className="text-center mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2 text-sm text-foreground/70 hover:text-foreground border border-border/30 rounded-lg hover:border-border/50 transition-all"
          >
            {isExpanded ? "フィルターを閉じる" : "詳細フィルター"}
            <svg 
              className={`inline ml-2 w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categoriesLoading ? (
              <div className="px-4 py-2 text-sm text-foreground/50">カテゴリ読み込み中...</div>
            ) : categoriesError ? (
              <div className="px-4 py-2 text-sm text-red-600">カテゴリの読み込みに失敗しました</div>
            ) : (
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'bg-card/50 text-foreground/70 hover:bg-card/80 hover:text-foreground border border-border/30'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-70">({category.count})</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Extended Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-card/20 rounded-lg border border-border/20">
            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">年度で絞り込み</label>
              <select
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
                disabled={yearsLoading}
                className="w-full px-4 py-2 bg-card/50 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {yearsLoading ? (
                  <option>読み込み中...</option>
                ) : yearsError ? (
                  <option>エラーが発生しました</option>
                ) : (
                  years.map((year) => (
                    <option key={year.id} value={year.id}>
                      {year.label}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">並び順</label>
              <select className="w-full px-4 py-2 bg-card/50 border border-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30">
                <option value="newest">新しい順</option>
                <option value="oldest">古い順</option>
                <option value="popular">人気順</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}