"use client"

import { useState } from "react"

interface ProductShowcaseProps {
  selectedProduct: string
}

export default function ProductShowcase({ selectedProduct }: ProductShowcaseProps) {
  const [selectedShape, setSelectedShape] = useState("circle")

  const shapes = {
    circle: {
      name: "丸型",
      clipPath: "circle(50%)",
      description: "最もポピュラーな形状"
    },
    star: {
      name: "星形",
      clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      description: "目を引く星の形状"
    },
    square: {
      name: "正方形",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      description: "シンプルな四角形"
    },
    rectangle: {
      name: "長方形", 
      clipPath: "polygon(10% 0%, 90% 0%, 90% 100%, 10% 100%)",
      description: "横長のスタイリッシュな形"
    },
    heart: {
      name: "ハート型",
      clipPath: "path('M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z')",
      description: "可愛らしいハート形状"
    },
    hexagon: {
      name: "六角形",
      clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
      description: "洗練された多角形"
    }
  }

  const productContent = {
    "original-badge": {
      title: "オリジナル缶バッジ",
      subtitle: "Ghoona Goods缶バッジのここがすごい",
      features: [
        {
          title: "高精細印刷技術",
          description: "機構部品メーカーの精密技術を活用した、業界最高レベルの印刷品質を実現"
        },
        {
          title: "耐久性抜群の素材",
          description: "長期使用に耐える特殊コーティングで、色褪せや傷に強い仕上がり"
        },
        {
          title: "完全オーダーメイド",
          description: "1個からオーダー可能。お客様のデザインを完璧に再現いたします"
        }
      ]
    },
    "standard-badge": {
      title: "通常缶バッジ",
      subtitle: "スタンダード缶バッジの特徴",
      features: [
        {
          title: "コストパフォーマンス",
          description: "高品質ながらリーズナブルな価格設定で大量発注にも対応"
        },
        {
          title: "豊富なサイズ展開",
          description: "25mm〜76mmまで幅広いサイズをご用意"
        },
        {
          title: "短納期対応",
          description: "標準仕様なら最短3営業日での納品が可能"
        }
      ]
    },
    "acrylic-stand": {
      title: "アクリルスタンド", 
      subtitle: "高品質アクリルスタンドの魅力",
      features: [
        {
          title: "透明度抜群",
          description: "高品質アクリル素材使用で、クリアで美しい仕上がり"
        },
        {
          title: "安定した自立設計",
          description: "独自の台座設計で、しっかりと自立する安定感"
        },
        {
          title: "UV印刷対応",
          description: "フルカラー印刷で鮮やかな色彩を実現"
        }
      ]
    },
    "acrylic-keychain": {
      title: "アクリルキーホルダー",
      subtitle: "携帯アクセサリーとしての魅力", 
      features: [
        {
          title: "軽量で丈夫",
          description: "持ち運びに便利な軽量設計ながら、高い耐久性を実現"
        },
        {
          title: "両面印刷対応",
          description: "表裏で異なるデザインも可能な両面印刷技術"
        },
        {
          title: "豊富な金具選択",
          description: "ナスカン、ボールチェーンなど用途に応じた金具をご用意"
        }
      ]
    }
  }

  const currentProduct = productContent[selectedProduct as keyof typeof productContent] || productContent["original-badge"]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Shape Selector */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              {currentProduct.title}
            </h2>
            
            {(selectedProduct === "original-badge" || selectedProduct === "standard-badge") && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-foreground mb-6">形状を選択</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(shapes).map(([key, shape]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedShape(key)}
                      className={`group p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedShape === key
                          ? 'border-primary bg-primary/5'
                          : 'border-border/50 hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-16 h-16 mx-auto mb-3 bg-primary transition-all duration-300 ${
                        selectedShape === key ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'
                      }`}
                      style={{ clipPath: shape.clipPath }}
                      ></div>
                      <p className={`text-sm font-medium ${
                        selectedShape === key ? 'text-foreground' : 'text-foreground/70'
                      }`}>
                        {shape.name}
                      </p>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm text-foreground/60 text-center">
                  {shapes[selectedShape as keyof typeof shapes]?.description}
                </p>
              </div>
            )}

            {/* Large Preview */}
            <div className="flex justify-center">
              <div className="relative">
                <div 
                  className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 shadow-2xl shadow-primary/30"
                  style={{ 
                    clipPath: selectedProduct.includes('badge') 
                      ? shapes[selectedShape as keyof typeof shapes]?.clipPath 
                      : selectedProduct === 'acrylic-stand' 
                        ? 'polygon(20% 0%, 80% 0%, 80% 80%, 20% 80%)'
                        : 'polygon(20% 0%, 80% 0%, 90% 20%, 90% 80%, 80% 100%, 20% 100%, 10% 80%, 10% 20%)'
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Sample</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {currentProduct.subtitle}
            </h3>
            <div className="w-16 h-1 bg-primary rounded-full mb-8"></div>
            
            <div className="space-y-8">
              {currentProduct.features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-foreground/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                この商品で見積もり
              </button>
              <button className="px-8 py-4 border border-foreground/20 text-foreground rounded-lg font-semibold hover:bg-foreground/5 transition-colors">
                詳細を見る
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}