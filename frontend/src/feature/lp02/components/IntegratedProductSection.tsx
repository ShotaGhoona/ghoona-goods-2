"use client"

import { useState, useEffect } from "react"

export default function IntegratedProductSection() {
  const [selectedCategory, setSelectedCategory] = useState("缶バッジ")
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
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

    const section = document.getElementById('integrated-product-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const productCategories = {
    "缶バッジ": [
      { name: "缶バッジ", description: "推しをアピールする定番アイテム。", image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?w=600&h=400&fit=crop&crop=center" },
      { name: "ハート型缶バッジ", description: "印象的なフォルムで、存在感を演出。", image: "https://images.unsplash.com/photo-1595665593673-bf1ad45e3d30?w=600&h=400&fit=crop&crop=center" },
      { name: "スタンド付き缶バッジ", description: "展示用としても活用可能な実用性が特長。", image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?w=600&h=400&fit=crop&crop=center" },
      { name: "チャーム付き缶バッジ", description: "揺れるチャームがアクセント。", image: "https://images.unsplash.com/photo-1595665593673-bf1ad45e3d30?w=600&h=400&fit=crop&crop=center" },
      { name: "缶ストラップ", description: "持ち歩きに適したコンパクトなデザイン。", image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?w=600&h=400&fit=crop&crop=center" },
      { name: "ツインフェイスストラップ", description: "両面にデザインを施すことで視認性を向上。", image: "https://images.unsplash.com/photo-1595665593673-bf1ad45e3d30?w=600&h=400&fit=crop&crop=center" },
      { name: "連結ストラップ", description: "複数モチーフを一体化した連携型仕様。", image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?w=600&h=400&fit=crop&crop=center" }
    ],
    "アクリルグッズ": [
      { name: "アクリルスタンド", description: "安定感と透明感が特徴のディスプレイ向けアイテム。", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center" },
      { name: "アクリルキーホルダー", description: "実用性と視覚的訴求を両立したアクセサリー。", image: "https://images.unsplash.com/photo-1589992462895-d37835a9e1f8?w=600&h=400&fit=crop&crop=center" },
      { name: "アクリル観覧車", description: "可動性と装飾性を備えた立体構造。", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center" },
      { name: "アクリルメリーゴーランド", description: "繊細なデザインが魅力の回転式オブジェ。", image: "https://images.unsplash.com/photo-1589992462895-d37835a9e1f8?w=600&h=400&fit=crop&crop=center" },
      { name: "アクリルバイキング", description: "ダイナミックな演出が可能な可動タイプ。", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center" },
      { name: "アクリルブランコ", description: "柔らかな動きが視覚的効果を高めます。", image: "https://images.unsplash.com/photo-1589992462895-d37835a9e1f8?w=600&h=400&fit=crop&crop=center" }
    ],
    "周辺グッズ": [
      { name: "缶バッジスタンド_サークル", description: "丸型缶バッジの展示に最適な専用台座。", image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?w=600&h=400&fit=crop&crop=center" },
      { name: "缶バッジスタンド_ハート", description: "ハート型バッジを美しく飾る専用設計。", image: "https://images.unsplash.com/photo-1595665593673-bf1ad45e3d30?w=600&h=400&fit=crop&crop=center" }
    ]
  }

  const currentProducts = productCategories[selectedCategory as keyof typeof productCategories]
  const currentProduct = currentProducts[selectedProductIndex]

  const handlePrevious = () => {
    setSelectedProductIndex((prev) => 
      prev === 0 ? currentProducts.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setSelectedProductIndex((prev) => 
      prev === currentProducts.length - 1 ? 0 : prev + 1
    )
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedProductIndex(0)
  }

  return (
    <section 
      id="integrated-product-section"
      className="py-12 md:py-16 lg:py-24 px-4 md:px-6 bg-gradient-to-b from-primary/3 to-background relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        {/* セクションヘッダー */}
        <div className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4 md:mb-6">
            ZIGZAG<span className="font-bold text-primary">グッズ紹介</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed px-4">
            機構部品メーカーの技術力で作り上げる、高品質なオリジナルグッズ
          </p>
        </div>

        {/* カテゴリ選択タブ */}
        <div className={`flex justify-center mb-8 md:mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row bg-card/30 backdrop-blur-sm rounded-2xl border border-border/20 p-2 w-full max-w-md sm:max-w-none">
            {Object.keys(productCategories).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base md:text-lg transition-all duration-300 mb-2 sm:mb-0 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 商品詳細セクション */}
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 商品画像 */}
            <div className="relative order-1 lg:order-1">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5 relative group">
                <img 
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* 商品情報 */}
            <div className="order-2 lg:order-2">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
                  {currentProduct.name}
                </h3>
                <p className="text-base sm:text-lg text-foreground/70 leading-relaxed mb-8 font-light">
                  {currentProduct.description}
                </p>
                
                {/* インジケーター */}
                <div className="flex items-center justify-center lg:justify-start gap-5 mb-8">
                  <p className="text-sm text-foreground/60">
                    {selectedProductIndex + 1} / {currentProducts.length}
                  </p>
                  <div className="flex space-x-1">
                    {currentProducts.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === selectedProductIndex ? 'bg-primary' : 'bg-foreground/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ナビゲーションボタン */}
          <div className="flex items-center justify-between mt-8 order-3">
            <button
              onClick={handlePrevious}
              className="px-4 sm:px-6 py-3 border border-foreground/20 text-foreground rounded-lg font-medium hover:bg-foreground/5 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">← 前の商品</span>
              <span className="sm:hidden">← 前</span>
            </button>
            <button
              onClick={handleNext}
              className="px-4 sm:px-6 py-3 border border-foreground/20 text-foreground rounded-lg font-medium hover:bg-foreground/5 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">次の商品 →</span>
              <span className="sm:hidden">次 →</span>
            </button>
          </div>
        </div>


      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/6 left-1/12 w-60 h-60 bg-gradient-to-r from-primary/15 via-secondary/10 to-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/6 right-1/12 w-48 h-48 bg-gradient-to-r from-secondary/15 via-primary/10 to-secondary/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      </div>
    </section>
  )
}