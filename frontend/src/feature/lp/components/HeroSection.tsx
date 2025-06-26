"use client"

import { useEffect, useState } from "react"

export default function RefinedHeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-background/95">
      {/* 繊細な背景パターン */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-32 w-32 h-32 bg-secondary rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-secondary rounded-full blur-2xl"></div>
      </div>

      {/* 優雅な浮遊要素 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 控えめなサークル */}
        <div 
          className={`absolute top-1/4 left-1/4 w-3 h-3 bg-primary/20 rounded-full transition-all duration-1000 ${
            mounted ? 'animate-float-slow opacity-100' : 'opacity-0'
          }`}
          style={{ animationDelay: '0s' }}
        ></div>
        <div 
          className={`absolute top-1/3 right-1/3 w-2 h-2 bg-secondary/30 rounded-full transition-all duration-1000 ${
            mounted ? 'animate-float-slow opacity-100' : 'opacity-0'
          }`}
          style={{ animationDelay: '1s' }}
        ></div>
        <div 
          className={`absolute bottom-1/3 left-1/3 w-4 h-4 bg-primary/15 rounded-full transition-all duration-1000 ${
            mounted ? 'animate-float-slow opacity-100' : 'opacity-0'
          }`}
          style={{ animationDelay: '2s' }}
        ></div>

        {/* 繊細な商品アイコン */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/6 left-1/5 w-6 h-6 bg-primary/40 rounded-full"></div>
          <div className="absolute top-2/5 right-1/6 w-4 h-4 bg-secondary/50 rounded-full"></div>
          <div className="absolute bottom-1/6 left-1/3 w-8 h-8 bg-primary/30 rounded-full"></div>
          <div className="absolute top-1/3 left-2/3 w-5 h-8 bg-primary/25 rounded-sm"></div>
          <div className="absolute bottom-1/3 right-1/5 w-4 h-6 bg-secondary/35 rounded-sm"></div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center px-6">
        <div className={`transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-light text-foreground mb-8 leading-tight tracking-tight">
            そのアイディア
            <br />
            <span className="font-bold text-primary">形にします</span>
          </h1>
        </div>
        
        <div className={`transition-all duration-1000 ease-out delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            機構部品メーカーが届ける完全メイドインジャパンクオリティ。
            <br />
            小ロットから大ロットまで対応いたします。
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="px-10 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105">
            製品を見る
          </button>
          <button className="px-10 py-4 border border-foreground/20 text-foreground rounded-lg font-medium text-lg hover:bg-foreground/5 transition-all duration-300 hover:scale-105">
            お見積り依頼
          </button>
        </div>
      </div>

      {/* エレガントなスクロールインジケーター */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-6 h-10 border border-foreground/20 rounded-full flex justify-center relative">
            <div className="w-1 h-3 bg-foreground/30 rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-xs text-foreground/40 font-light tracking-wider">SCROLL</p>
        </div>
      </div>
    </section>
  )
}