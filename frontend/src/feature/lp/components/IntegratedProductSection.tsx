"use client"

import { useState, useEffect } from "react"

export default function IntegratedProductSection() {
  const [selectedProduct, setSelectedProduct] = useState("original-badge")
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

  const products = {
    "original-badge": {
      name: "オリジナル缶バッジ",
      subtitle: "あなただけのデザインで作る特別なバッジ",
      description: "職人の技と最先端技術が融合した、世界に一つだけのマスターピース。あなたの創想を、最高品質で形にします。",
      heroImage: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: [
        {
          icon: "🔬",
          title: "ミクロン精度の精密印刷",
          description: "機械部品製造で培った0.001mm精度の技術で、毛穴まで完美に再現"
        },
        {
          icon: "🚀",
          title: "航空宇宙グレード素材",
          description: "NASA採用素材を使用。100年後も色あせない特殊コーティング"
        },
        {
          icon: "🌈",
          title: "インフィニティカスタマイズ",
          description: "1個から100万個まで。どんな形、どんなサイズでも実現可能"
        }
      ],
      shapes: [
        { name: "クラシックサークル", preview: "○" },
        { name: "スターシェイプ", preview: "★" },
        { name: "スクエアフォーム", preview: "■" },
        { name: "ラブリーハート", preview: "♥" }
      ],
      priceRange: "¥180〜",
      minOrder: "1個からOK",
      deliveryTime: "特急3日〜"
    },
    "standard-badge": {
      name: "缶バッジ",
      subtitle: "高品質でリーズナブルな定番商品",
      description: "ビジネスを加速させるスマートチョイス。高品質を保ちながら、コストを大幅圧縮。大量発注に最適化されたソリューションです。",
      heroImage: "https://images.unsplash.com/photo-1595665593673-bf1ad45e3d30?w=800&h=600&fit=crop&crop=center",
      features: [
        {
          icon: "📈",
          title: "ROI最大化システム",
          description: "高品質を保ちながらコストを70%削減。投資対効果を最大化"
        },
        {
          icon: "🎨",
          title: "マルチサイズシリーズ",
          description: "超ミニ20mmからメガサイズ100mmまで、あらゆるニーズに対応"
        },
        {
          icon: "🏆",
          title: "スピードデリバリー",
          description: "特急サービスで最短24時間内出荷。緊急案件もお任せください"
        }
      ],
      shapes: [
        { name: "クラシック", preview: "○" },
        { name: "モダンスクエア", preview: "■" },
        { name: "ワイドレクタングル", preview: "▬" },
        { name: "ヘキサゴン", preview: "⬡" }
      ],
      priceRange: "¥48〜",
      minOrder: "10個から",
      deliveryTime: "最速1日"
    },
    "acrylic-stand": {
      name: "アクリルスタンド",
      subtitle: "透明感が美しい自立型ディスプレイ",
      description: "最高級光学アクリルと精密加工技術が生み出す、まるで魔法のような立体体験。あなたの大切なキャラクターが、現実世界に蘇び出します。",
      heroImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
      features: [
        {
          icon: "🔮",
          title: "クリスタルグレード透明度",
          description: "宝石レベルのクリア度。光を美しく屈折させ、キャラクターが輝く"
        },
        {
          icon: "🏢",
          title: "エンジニアリング設計",
          description: "地震にも耐える工学的設計。永久に安定した美しい姿勢をキープ"
        },
        {
          icon: "🌈",
          title: "4KウルトラHD印刷",
          description: "最新UV技術で、アニメより鮮明な色彩と細部を完全再現"
        }
      ],
      shapes: [
        { name: "長方形", preview: "▭" },
        { name: "正方形", preview: "■" },
        { name: "円形", preview: "●" },
        { name: "カスタム形状", preview: "◈" }
      ],
      priceRange: "¥380〜",
      minOrder: "1個から",
      deliveryTime: "作品グレード7日"
    },
    "acrylic-keychain": {
      name: "アクリルキーホルダー",
      subtitle: "持ち運びやすく軽量なキーホルダー",
      description: "あなたのポケットに小さな奇跡を。毎日、いつでも、どこでも一緒にいる特別な存在。軽やかで丈夫、そして美しい——日常をキラキラに変える、あなただけのコンパニオンです。",
      heroImage: "https://images.unsplash.com/photo-1589992462895-d37835a9e1f8?w=800&h=600&fit=crop&crop=center",
      features: [
        {
          icon: "🌬️",
          title: "フェザーウェイト設計",
          description: "羽毛のように軽いのにダイヤモンド並みの耐久性。ポケットに入れても気づかない"
        },
        {
          icon: "🌀",
          title: "ツインフェイスマジック",
          description: "表裏で異なる世界を描く、魔法のような両面印刷技術"
        },
        {
          icon: "⚙️",
          title: "プロフェッショナルハードウェア",
          description: "プロが選んだ精密金具。アクセサリーから実用品まで多彩なオプション"
        }
      ],
      shapes: [
        { name: "長方形", preview: "◊" },
        { name: "正方形", preview: "■" },
        { name: "円形", preview: "●" },
        { name: "ハート形", preview: "♥" },
        { name: "カスタム形状", preview: "◈" }
      ],
      priceRange: "¥180〜",
      minOrder: "1個から",
      deliveryTime: "スペシャル5日"
    }
  }

  const currentProduct = products[selectedProduct as keyof typeof products]

  return (
    <section 
      id="integrated-product-section"
      className="py-24 px-6 bg-gradient-to-b from-primary/3 to-background relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        {/* セクションヘッダー - Enhanced */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-pink-600 mb-8 leading-tight">
              🌟 究極の商品体験
            </h2>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full blur-sm"></div>
          </div>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto font-medium leading-relaxed mb-8">
            ✨ あなたの想像を超える品質と体験がここに。一つひとつが特別な物語を紡ぎます。
          </p>
          <div className="flex justify-center space-x-4">
            <div className="h-1 w-12 bg-primary rounded-full"></div>
            <div className="h-1 w-8 bg-primary/60 rounded-full"></div>
            <div className="h-1 w-4 bg-primary/30 rounded-full"></div>
          </div>
        </div>

        {/* 商品選択タブ - Completely Redesigned */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {Object.entries(products).map(([key, product], index) => (
            <button
              key={key}
              onClick={() => setSelectedProduct(key)}
              className={`group relative p-8 rounded-3xl border-3 transition-all duration-700 transform ${
                selectedProduct === key
                  ? 'border-primary bg-gradient-to-br from-primary/20 via-primary/10 to-transparent shadow-2xl shadow-primary/30 scale-110 -translate-y-2'
                  : 'border-border/20 bg-gradient-to-br from-card/30 to-card/10 hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/5 hover:scale-105 hover:-translate-y-1'
              } backdrop-blur-sm cursor-pointer overflow-hidden`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full transform translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full transform -translate-x-8 translate-y-8"></div>
              </div>

              <div className="relative text-center">
                <div className={`text-5xl mb-4 transition-all duration-500 ${
                  selectedProduct === key ? 'scale-125 rotate-6' : 'group-hover:scale-110 group-hover:rotate-3'
                }`}>
                  {key === 'original-badge' && '🎨'}
                  {key === 'standard-badge' && '⚡'}
                  {key === 'acrylic-stand' && '🌆'}
                  {key === 'acrylic-keychain' && '🔑'}
                </div>
                
                <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${
                  selectedProduct === key ? 'text-primary scale-105' : 'text-foreground group-hover:text-primary/80'
                }`}>
                  {product.name}
                </h3>
                
                <p className={`text-sm font-medium transition-all duration-300 leading-relaxed ${
                  selectedProduct === key ? 'text-foreground/90' : 'text-foreground/70 group-hover:text-foreground/80'
                }`}>
                  {product.subtitle}
                </p>

                {/* Price Preview */}
                <div className={`mt-4 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedProduct === key 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'bg-gray-100/50 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary/80'
                }`}>
                  {product.priceRange}
                </div>
              </div>

              {/* Active Indicator */}
              {selectedProduct === key && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                </div>
              )}

              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl transition-all duration-700 ${
                selectedProduct === key ? 'bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5' : 'opacity-0 group-hover:opacity-100 group-hover:bg-gradient-to-r group-hover:from-primary/3 group-hover:via-primary/5 group-hover:to-primary/3'
              }`}></div>

              {/* Bottom Accent */}
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full transition-all duration-500 ${
                selectedProduct === key ? 'w-3/4 opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-60'
              }`}></div>
            </button>
          ))}
        </div>

        {/* 形状選択セクション */}
        <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {currentProduct.shapes.map((shape, index) => (
              <div 
                key={index}
                className="group relative p-6 bg-gradient-to-br from-card/30 to-card/10 rounded-2xl border-2 border-border/20 hover:border-primary/40 transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-1 backdrop-blur-sm"
              >
                <div className="text-center">
                  <div className="text-4xl text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                    {shape.preview}
                  </div>
                  <p className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {shape.name}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 商品詳細セクション */}
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* ヒーローエリア */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* 右側：商品説明 */}
            <div>
              <h3 className="text-4xl font-light text-foreground mb-4">
                {currentProduct.name}
              </h3>
              <h4 className="text-xl text-primary font-medium mb-6">
                {currentProduct.subtitle}
              </h4>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8 font-light">
                {currentProduct.description}
              </p>
              {/* 特徴リスト - Enhanced */}
              <div className="space-y-8 mb-10">
                {currentProduct.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="group flex items-start space-x-6 p-4 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-500 cursor-pointer"
                    style={{
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center text-3xl border border-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                        {feature.icon}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary/30 rounded-full blur-sm group-hover:scale-150 transition-transform duration-500"></div>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h5>
                      <p className="text-foreground/80 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                        {feature.description}
                      </p>
                      <div className="mt-3 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent group-hover:w-24 transition-all duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 左側：画像とビジュアル */}
            <div className="relative flex flex-col gap-6">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10 relative group cursor-pointer transform transition-all duration-700 hover:scale-105">
                <img 
                  src={currentProduct.heroImage}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-primary/10"></div>
                
                {/* Interactive Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                {/* 価格とロット数の表示 - Enhanced */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center transform transition-all duration-500 hover:scale-105 hover:bg-primary/5">
                      <p className="text-xs font-semibold text-primary/80 mb-2 uppercase tracking-wider">💰 価格</p>
                      <p className="text-xl font-black text-primary">{currentProduct.priceRange}</p>
                    </div>
                    <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center transform transition-all duration-500 hover:scale-105 hover:bg-blue-50/50">
                      <p className="text-xs font-semibold text-blue-600/80 mb-2 uppercase tracking-wider">📦 最小ロット</p>
                      <p className="text-xl font-black text-blue-700">{currentProduct.minOrder}</p>
                    </div>
                    <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center transform transition-all duration-500 hover:scale-105 hover:bg-green-50/50">
                      <p className="text-xs font-semibold text-green-600/80 mb-2 uppercase tracking-wider">⚡ 納期</p>
                      <p className="text-xl font-black text-green-700">{currentProduct.deliveryTime}</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 right-4 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>
              {/* アクション - Enhanced */}
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group relative px-10 py-5 bg-gradient-to-r from-primary via-primary to-primary/90 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 transform">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <span>🚀 この商品で見積もり</span>
                  </div>
                </button>
                <button className="group px-10 py-5 border-2 border-primary/40 text-primary rounded-2xl font-bold text-lg hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-500 hover:scale-105 hover:border-primary/60 backdrop-blur-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <span>📄 詳細資料をダウンロード</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/6 left-1/12 w-60 h-60 bg-gradient-to-r from-primary/15 via-purple-500/10 to-pink-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/6 right-1/12 w-48 h-48 bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-primary/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-r from-green-500/10 via-emerald-500/15 to-teal-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary/30 rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-purple-500/30 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-pink-500/30 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
      </div>
    </section>
  )
}