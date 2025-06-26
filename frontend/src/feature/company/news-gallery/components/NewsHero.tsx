"use client"

import { useEffect, useState } from "react"

export default function NewsHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative py-32 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-foreground mb-8">
            最新<span className="font-bold text-primary">ニュース</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            Ghoona Goodsの製品情報、技術革新、キャンペーン情報など<br />
            最新のニュースをお届けします
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-foreground/60 uppercase tracking-wide">記事数</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5</div>
              <div className="text-sm text-foreground/60 uppercase tracking-wide">カテゴリー</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2024</div>
              <div className="text-sm text-foreground/60 uppercase tracking-wide">最新年度</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}