"use client"

import { useEffect, useState } from "react"
import { usePortfolioStats } from "@/hooks/usePortfolio"

export default function GalleryStats() {
  const [isVisible, setIsVisible] = useState(false)
  const { stats: portfolioStats, loading, error } = usePortfolioStats()

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

    const section = document.getElementById('stats-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  // Static stats structure with dynamic data
  const getStatsData = () => {
    if (!portfolioStats) return []

    const categoryMap: Record<string, { icon: string; color: string; name: string }> = {
      'original-badge': { icon: '🎨', color: 'from-blue-500 to-blue-600', name: 'オリジナル缶バッジ' },
      'standard-badge': { icon: '⭐', color: 'from-green-500 to-green-600', name: 'スタンダード缶バッジ' },
      'acrylic-stand': { icon: '🏢', color: 'from-purple-500 to-purple-600', name: 'アクリルスタンド' },
      'acrylic-keychain': { icon: '🔑', color: 'from-orange-500 to-orange-600', name: 'アクリルキーホルダー' }
    }

    return portfolioStats.category_stats.map(stat => ({
      category: categoryMap[stat.category]?.name || stat.category,
      count: stat.total_quantity.toLocaleString(),
      icon: categoryMap[stat.category]?.icon || '📦',
      color: categoryMap[stat.category]?.color || 'from-gray-500 to-gray-600'
    }))
  }

  const stats = getStatsData()

  // Debug logging
  console.log('GalleryStats Debug:', {
    loading,
    error,
    portfolioStats,
    statsLength: stats.length,
    categoryStats: portfolioStats?.category_stats
  })

  // Show loading state
  if (loading) {
    return (
      <section id="stats-section" className="py-16 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground/60">統計データを読み込み中...</p>
          </div>
        </div>
      </section>
    )
  }

  // Show error state
  if (error) {
    return (
      <section id="stats-section" className="py-16 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-8">
            <div className="text-4xl text-red-500/20 mb-4">⚠️</div>
            <p className="text-foreground/60">統計データの読み込みに失敗しました: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  // Show empty state - but let's be more specific about what's missing
  if (!portfolioStats) {
    return (
      <section id="stats-section" className="py-16 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-8">
            <p className="text-foreground/60">統計データが見つかりません</p>
          </div>
        </div>
      </section>
    )
  }

  if (stats.length === 0) {
    return (
      <section id="stats-section" className="py-16 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-8">
            <p className="text-foreground/60">統計データが空です</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      id="stats-section"
      className="py-24 px-6 bg-gradient-to-b from-primary/5 to-background"
    >
      <div className="container mx-auto max-w-6xl">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150 + 300}ms` }}
            >
              <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/20 p-8 hover:bg-card/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {stat.count}
                  <span className="text-lg text-primary font-medium">個</span>
                </h3>
                <p className="text-foreground/70 font-medium">
                  {stat.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card/20 backdrop-blur-sm rounded-2xl border border-border/20 p-8">
            <h3 className="text-2xl font-light text-foreground mb-4">
              総製造実績
            </h3>
            <p className="text-5xl font-bold text-primary mb-2">
              {portfolioStats.total_quantity.toLocaleString()}<span className="text-2xl">個</span>
            </p>
            <p className="text-foreground/60 font-light">
              全{portfolioStats.total_portfolios}プロジェクトの累計製造数
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}