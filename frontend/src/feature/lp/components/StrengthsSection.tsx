"use client"

import { useEffect, useState } from "react"

export default function StrengthsSection() {
  const [isVisible, setIsVisible] = useState(false)

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

    const section = document.getElementById('strengths-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const strengths = [
    {
      id: 1,
      category: "🏆 プレミアム品質",
      title: "Made in Japan",
      subtitle: "世界が認める日本品質",
      description: "機械部品製造で培った精密技術を活かし、一つひとつに職人の魂を込めてお届けします。",
      bgGradient: "from-amber-500/30 via-orange-400/20 to-red-500/10",
      borderColor: "border-amber-500/40",
      hoverBg: "hover:bg-amber-50/70",
      accentColor: "text-amber-700",
      icon: (
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <div className="w-10 h-10 bg-white/95 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">優</span>
              </div>
            </div>
          </div>
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xs font-bold">🇯🇵</span>
          </div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-amber-300/70 rounded-full blur-md animate-pulse"></div>
        </div>
      ),
      delay: "0s"
    },
    {
      id: 2,
      category: "⚡ スケーラブル",
      title: "1個〜30万個",
      subtitle: "どんなサイズでも対応",
      description: "プロトタイプから大量生産まで。お客様の成長に合わせて柔軟にスケールできます。",
      bgGradient: "from-blue-500/30 via-cyan-400/20 to-purple-500/10",
      borderColor: "border-blue-500/40",
      hoverBg: "hover:bg-blue-50/70",
      accentColor: "text-blue-700",
      icon: (
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-cyan-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <div className="grid grid-cols-3 gap-1">
              <div className="w-2 h-2 bg-white/90 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="w-2 h-2 bg-white/90 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
          <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-white text-xs font-bold">∞</span>
          </div>
          <div className="absolute -top-2 -left-2 w-7 h-7 bg-cyan-300/70 rounded-full blur-md animate-pulse"></div>
        </div>
      ),
      delay: "0.2s"
    },
    {
      id: 3,
      category: "🎨 トータルソリューション",
      title: "商品+パッケージ",
      subtitle: "ワンストップで完結",
      description: "商品制作から包装デザイン、配送まで。面倒な複数業者とのやり取りは一切不要です。",
      bgGradient: "from-emerald-500/30 via-green-400/20 to-teal-500/10",
      borderColor: "border-emerald-500/40",
      hoverBg: "hover:bg-emerald-50/70",
      accentColor: "text-emerald-700",
      icon: (
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <div className="relative">
              <div className="w-8 h-6 bg-white/90 rounded-lg flex items-center justify-center">
                <div className="w-5 h-3 bg-emerald-500/80 rounded-sm"></div>
              </div>
              <div className="absolute -top-1 -left-1 w-6 h-4 bg-white/70 rounded-md border-2 border-emerald-400/50"></div>
            </div>
          </div>
          <div className="absolute -top-3 -left-3 w-6 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg transform rotate-12 shadow-md"></div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-teal-300/70 rounded-full blur-md animate-pulse"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
        </div>
      ),
      delay: "0.4s"
    }
  ]

  return (
    <section 
      id="strengths-section"
      className="py-20 px-4 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              私たちの<span className="text-primary">強み</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              機構部品メーカーとして培った技術力と品質管理で、お客様のアイディアを最高の形で実現します。
            </p>
          </div>
        </div>

        {/* Strengths Grid - Completely Redesigned */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-10">
          {strengths.map((strength, index) => (
            <div
              key={strength.id}
              className={`group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? strength.delay : '0s' 
              }}
            >
              <div className={`relative overflow-hidden bg-gradient-to-br ${strength.bgGradient} backdrop-blur-xl border-2 ${strength.borderColor} rounded-[2rem] p-8 ${strength.hoverBg} hover:border-opacity-80 transition-all duration-700 hover:shadow-3xl hover:shadow-black/20 hover:-translate-y-6 group-hover:scale-105 cursor-pointer`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full transform translate-x-20 -translate-y-20 group-hover:translate-x-16 group-hover:-translate-y-16 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full transform -translate-x-16 translate-y-16 group-hover:-translate-x-12 group-hover:translate-y-12 transition-transform duration-700"></div>
                  <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/50 rounded-full transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                </div>
                {/* Icon */}
                <div className="relative mb-8 flex justify-center">
                  <div className="transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-700">
                    {strength.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-6 text-center">
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight group-hover:scale-105 transition-transform duration-500">
                      {strength.title}
                    </h3>
                    <p className={`text-lg font-bold ${strength.accentColor} tracking-wide`}>
                      {strength.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed opacity-90">
                    {strength.description}
                  </p>
                 {/* Category Badge */}
                  <div className="relative mb-6">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                      <span className="text-sm font-bold text-white">{strength.category}</span>
                    </div>
                </div>
                </div>

                {/* Interactive Bottom Element */}
                <div className="relative mt-8 flex justify-center">
                  <div className="h-2 w-20 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-full group-hover:w-32 group-hover:h-3 transition-all duration-700 group-hover:shadow-lg"></div>
                </div>

                {/* Floating Interactive Elements */}
                <div className="absolute top-6 right-6 w-3 h-3 bg-white/40 rounded-full group-hover:scale-200 group-hover:bg-white/60 transition-all duration-700"></div>
                <div className="absolute bottom-8 left-6 w-2 h-2 bg-white/30 rounded-full group-hover:scale-150 group-hover:bg-white/50 transition-all duration-700"></div>
                <div className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-white/20 rounded-full group-hover:scale-300 transition-all duration-700"></div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-white/5 via-white/10 to-white/5"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Next-Level Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/6 left-1/12 w-60 h-60 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-red-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/6 right-1/12 w-48 h-48 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-blue-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-r from-purple-500/10 via-blue-500/15 to-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        </div>
      </div>
    </section>
  )
}