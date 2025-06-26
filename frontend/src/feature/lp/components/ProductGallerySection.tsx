"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ProductGallerySection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

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

    const section = document.getElementById('gallery-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const categories = [
    { id: "all", name: "すべて", icon: "🎨" },
    { id: "original-badge", name: "オリジナル缶バッジ", icon: "🎨" },
    { id: "standard-badge", name: "通常缶バッジ", icon: "⭐" },
    { id: "acrylic-stand", name: "アクリルスタンド", icon: "🏢" },
    { id: "acrylic-keychain", name: "アクリルキーホルダー", icon: "🔑" }
  ]

  const galleryItems = [
    {
      id: 1,
      category: "original-badge",
      title: "アニメキャラクター缶バッジ",
      description: "細かなディテールまで再現された高品質オリジナル缶バッジ",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=400&fit=crop&crop=center",
      tags: ["オリジナル", "アニメ", "高精細"]
    },
    {
      id: 2,
      category: "standard-badge", 
      title: "企業ロゴ缶バッジ",
      description: "シンプルで洗練された企業ロゴの缶バッジ",
      image: "https://images.unsplash.com/photo-1561070791-36a3b21592c0?w=400&h=400&fit=crop&crop=center",
      tags: ["企業", "ロゴ", "シンプル"]
    },
    {
      id: 3,
      category: "acrylic-stand",
      title: "キャラクターアクリルスタンド",
      description: "透明感が美しいアクリルスタンド",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
      tags: ["キャラクター", "透明", "立体"]
    },
    {
      id: 4,
      category: "acrylic-keychain",
      title: "オリジナルキーホルダー",
      description: "携帯しやすいサイズのアクリルキーホルダー",
      image: "https://images.unsplash.com/photo-1589992462895-d37835a9e1f8?w=400&h=400&fit=crop&crop=center",
      tags: ["携帯", "カスタム", "実用的"]
    },
    {
      id: 5,
      category: "original-badge",
      title: "イベント記念缶バッジ",
      description: "特別なイベント用の記念缶バッジ",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop&crop=center",
      tags: ["イベント", "記念", "限定"]
    },
    {
      id: 6,
      category: "acrylic-stand",
      title: "フォトスタンド",
      description: "写真やイラストを美しく飾るアクリルスタンド",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
      tags: ["写真", "ディスプレイ", "インテリア"]
    }
  ]

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <section 
      id="gallery-section"
      className="py-24 px-6 bg-gradient-to-b from-secondary/3 to-background"
    >
      <div className="container mx-auto max-w-7xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-light text-foreground mb-6">
            制作<span className="font-bold text-primary">実績</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
            お客様にお届けした実際の作品をご紹介します
          </p>
        </div>

        {/* カテゴリフィルター */}
        <div className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border/30 bg-card/20 text-foreground hover:border-primary/50 hover:bg-card/40'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* ギャラリーグリッド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className={`group bg-card/30 backdrop-blur-sm rounded-2xl border border-border/20 overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* ホバー時の詳細表示 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-lg font-medium text-foreground hover:bg-white transition-colors">
                    詳細を見る
                  </button>
                </div>

                {/* カテゴリバッジ */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium">
                    {categories.find(cat => cat.id === item.category)?.name || "その他"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/70 mb-4 font-light leading-relaxed">
                  {item.description}
                </p>
                
                {/* タグ */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 bg-foreground/5 text-foreground/60 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* もっと見るボタン */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/portfolio" className="px-8 py-4 border border-primary/30 text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            制作実績をもっと見る
          </Link>
        </div>
      </div>
    </section>
  )
}