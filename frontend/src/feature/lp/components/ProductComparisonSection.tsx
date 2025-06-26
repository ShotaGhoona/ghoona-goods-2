"use client"

import { useEffect, useState } from "react"

export default function ProductComparisonSection() {
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

    const section = document.getElementById('comparison-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const comparisonData = [
    {
      category: "価格帯",
      originalBadge: "¥80〜",
      standardBadge: "¥50〜",
      acrylicStand: "¥200〜",
      acrylicKeychain: "¥120〜"
    },
    {
      category: "最小ロット",
      originalBadge: "1個〜",
      standardBadge: "10個〜",
      acrylicStand: "1個〜",
      acrylicKeychain: "1個〜"
    },
    {
      category: "納期",
      originalBadge: "5〜7営業日",
      standardBadge: "3〜5営業日",
      acrylicStand: "7〜10営業日",
      acrylicKeychain: "5〜7営業日"
    },
    {
      category: "カスタム度",
      originalBadge: "★★★★★",
      standardBadge: "★★★☆☆",
      acrylicStand: "★★★★☆",
      acrylicKeychain: "★★★★☆"
    },
    {
      category: "最適用途",
      originalBadge: "特別なイベント・記念品",
      standardBadge: "大量配布・販売用",
      acrylicStand: "ディスプレイ・コレクション",
      acrylicKeychain: "日常使い・プレゼント"
    }
  ]

  return (
    <section 
      id="comparison-section"
      className="py-24 px-6 bg-gradient-to-b from-background to-secondary/3"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-light text-foreground mb-6">
            商品<span className="font-bold text-primary">比較表</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
            用途に合わせて最適な商品をお選びいただけます
          </p>
        </div>

        {/* 比較表 */}
        <div className={`bg-card/30 backdrop-blur-sm rounded-3xl border border-border/20 overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* ヘッダー */}
          <div className="grid grid-cols-5 bg-primary/10 border-b border-border/20">
            <div className="p-6">
              <h3 className="text-lg font-medium text-foreground">比較項目</h3>
            </div>
            <div className="p-6 text-center border-l border-border/20">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="text-sm font-medium text-foreground">オリジナル缶バッジ</h4>
            </div>
            <div className="p-6 text-center border-l border-border/20">
              <div className="text-2xl mb-2">⭐</div>
              <h4 className="text-sm font-medium text-foreground">通常缶バッジ</h4>
            </div>
            <div className="p-6 text-center border-l border-border/20">
              <div className="text-2xl mb-2">🏢</div>
              <h4 className="text-sm font-medium text-foreground">アクリルスタンド</h4>
            </div>
            <div className="p-6 text-center border-l border-border/20">
              <div className="text-2xl mb-2">🔑</div>
              <h4 className="text-sm font-medium text-foreground">アクリルキーホルダー</h4>
            </div>
          </div>

          {/* 比較内容 */}
          {comparisonData.map((row, index) => (
            <div 
              key={index}
              className={`grid grid-cols-5 border-b border-border/10 hover:bg-primary/5 transition-colors duration-300 ${
                index % 2 === 0 ? 'bg-background/50' : 'bg-card/10'
              }`}
            >
              <div className="p-6">
                <p className="font-medium text-foreground">{row.category}</p>
              </div>
              <div className="p-6 text-center border-l border-border/10">
                <p className="text-sm text-foreground/80">{row.originalBadge}</p>
              </div>
              <div className="p-6 text-center border-l border-border/10">
                <p className="text-sm text-foreground/80">{row.standardBadge}</p>
              </div>
              <div className="p-6 text-center border-l border-border/10">
                <p className="text-sm text-foreground/80">{row.acrylicStand}</p>
              </div>
              <div className="p-6 text-center border-l border-border/10">
                <p className="text-sm text-foreground/80">{row.acrylicKeychain}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg text-foreground/70 mb-6 font-light">
            どの商品が最適かわからない場合は、お気軽にご相談ください
          </p>
          <button className="px-10 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105">
            商品選択のご相談はこちら
          </button>
        </div>
      </div>
    </section>
  )
}