"use client"

import { useState, useEffect, useCallback } from "react"
import { FaStar, FaChartBar, FaHeart, FaUsers, FaTrophy } from 'react-icons/fa'
import { TestimonialStats as StatsType, testimonialCategoryLabels } from "../data/testimonialsData"

interface TestimonialStatsProps {
  stats: StatsType
}

export default function TestimonialStats({ stats }: TestimonialStatsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    satisfactionRate: 0
  })

  const animateNumbers = useCallback(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        averageRating: Number((stats.averageRating * progress).toFixed(1)),
        totalReviews: Math.floor(stats.totalReviews * progress),
        satisfactionRate: Number((stats.satisfactionRate * progress).toFixed(1))
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedStats({
          averageRating: stats.averageRating,
          totalReviews: stats.totalReviews,
          satisfactionRate: stats.satisfactionRate
        })
      }
    }, stepDuration)
  }, [stats])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            animateNumbers()
          }
        })
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('testimonial-stats')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [animateNumbers])

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={i} className="w-6 h-6 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <FaStar className="w-6 h-6 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <FaStar className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        )}
        {Array.from({ length: 5 - Math.ceil(rating) }, (_, i) => (
          <FaStar key={`empty-${i}`} className="w-6 h-6 text-gray-300" />
        ))}
      </div>
    )
  }

  return (
    <section 
      id="testimonial-stats"
      className={`py-20 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
              <FaTrophy className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl font-light text-foreground mb-4">
            お客様満足度<span className="font-bold text-primary">統計</span>
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            127名のお客様からいただいた貴重なお声から見える、私たちの実績と信頼
          </p>
        </div>

        {/* メイン統計 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          
          {/* 平均評価 */}
          <div className="bg-gradient-to-br from-yellow-50/80 to-orange-50/80 backdrop-blur-sm rounded-3xl border border-yellow-200/30 p-8 text-center hover:shadow-xl transition-all duration-500">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center">
                <FaStar className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-yellow-800 mb-2">
                {animatedStats.averageRating}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(stats.averageRating)}
              </div>
              <div className="text-sm text-yellow-700 font-medium">平均評価</div>
            </div>
            <p className="text-yellow-600 text-sm leading-relaxed">
              5つ星中{stats.averageRating}の高評価をいただいています
            </p>
          </div>

          {/* 総レビュー数 */}
          <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-3xl border border-blue-200/30 p-8 text-center hover:shadow-xl transition-all duration-500">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center">
                <FaUsers className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-blue-800 mb-2">
                {animatedStats.totalReviews}
              </div>
              <div className="text-sm text-blue-700 font-medium">お客様の声</div>
            </div>
            <p className="text-blue-600 text-sm leading-relaxed">
              多くのお客様から信頼をいただいています
            </p>
          </div>

          {/* 満足度 */}
          <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-3xl border border-green-200/30 p-8 text-center hover:shadow-xl transition-all duration-500">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-400/20 rounded-2xl flex items-center justify-center">
                <FaHeart className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-green-800 mb-2">
                {animatedStats.satisfactionRate}%
              </div>
              <div className="text-sm text-green-700 font-medium">満足度</div>
            </div>
            <p className="text-green-600 text-sm leading-relaxed">
              お客様の期待を上回る品質をお届け
            </p>
          </div>
        </div>

        {/* カテゴリー別統計 */}
        <div className="bg-gradient-to-br from-white/60 to-gray-50/60 backdrop-blur-sm rounded-3xl border border-border/30 p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <FaChartBar className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-light text-foreground mb-2">
              カテゴリー別<span className="font-bold text-primary">評価</span>
            </h3>
            <p className="text-foreground/70">各分野での詳細な評価をご覧ください</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.categoryBreakdown.filter(cat => cat.category !== 'overall').map((category, index) => (
              <div 
                key={category.category}
                className="bg-white/50 backdrop-blur-sm rounded-2xl border border-border/20 p-6 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">
                    {testimonialCategoryLabels[category.category]}
                  </h4>
                  <div className="flex items-center space-x-1">
                    <FaStar className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-bold text-foreground">
                      {category.averageRating}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-foreground/70 mb-1">
                    <span>評価数</span>
                    <span>{category.count}件</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: isVisible ? `${(category.count / stats.totalReviews) * 100}%` : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-xs text-foreground/60">
                  全体の{Math.round((category.count / stats.totalReviews) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 信頼メッセージ */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-primary/20 p-8 max-w-4xl mx-auto">
            <p className="text-lg text-foreground/80 leading-relaxed font-medium">
              &ldquo;お客様の声は私たちの財産です。一つひとつのご意見を大切に、
              <span className="text-primary font-bold">さらなる品質向上</span>に努めています。&rdquo;
            </p>
            <div className="mt-4 text-primary font-semibold">
              - GhoonaGoods 品質管理部門一同
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}