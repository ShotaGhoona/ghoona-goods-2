"use client"

import { useState } from "react"
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa'
import { TestimonialCategory, testimonialCategoryLabels } from "../data/testimonialsData"

interface TestimonialFilterProps {
  selectedCategory: TestimonialCategory | 'all'
  searchQuery: string
  onCategoryChange: (category: TestimonialCategory | 'all') => void
  onSearchChange: (query: string) => void
  totalResults: number
}

export default function TestimonialFilter({
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  totalResults
}: TestimonialFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categories: Array<{ key: TestimonialCategory | 'all', label: string }> = [
    { key: 'all', label: 'すべて' },
    { key: 'quality', label: testimonialCategoryLabels.quality },
    { key: 'delivery', label: testimonialCategoryLabels.delivery },
    { key: 'customer-service', label: testimonialCategoryLabels['customer-service'] },
    { key: 'design', label: testimonialCategoryLabels.design },
    { key: 'value', label: testimonialCategoryLabels.value }
  ]

  const clearFilters = () => {
    onCategoryChange('all')
    onSearchChange('')
  }

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery

  return (
    <div className="bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm rounded-2xl border border-border/30 p-6 mb-12">
      
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <FaFilter className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">フィルター & 検索</h3>
            <p className="text-sm text-foreground/60">
              {totalResults}件のお客様の声から絞り込み
            </p>
          </div>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <FaTimes className="w-4 h-4" />
            <span className="text-sm font-medium">クリア</span>
          </button>
        )}
      </div>

      {/* 検索バー */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input
            type="text"
            placeholder="お客様の声を検索... (会社名、商品、内容など)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/60 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors duration-200"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* カテゴリーフィルター */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-foreground/80">カテゴリー</h4>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center space-x-2 text-primary text-sm"
          >
            <span>{isFilterOpen ? '閉じる' : '開く'}</span>
            <FaFilter className="w-3 h-3" />
          </button>
        </div>
        
        <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => onCategoryChange(category.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.key
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white/60 text-foreground/70 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* アクティブフィルター表示 */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-border/20">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-foreground/60">アクティブなフィルター:</span>
            
            {selectedCategory !== 'all' && (
              <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span>
                  カテゴリー: {categories.find(c => c.key === selectedCategory)?.label}
                </span>
                <button
                  onClick={() => onCategoryChange('all')}
                  className="hover:text-primary/80 transition-colors duration-200"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {searchQuery && (
              <div className="flex items-center space-x-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                <span>検索: "{searchQuery}"</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="hover:text-secondary/80 transition-colors duration-200"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}