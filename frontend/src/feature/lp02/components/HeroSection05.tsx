"use client"

import { useEffect, useState } from "react"

export default function HeroSection05() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-background/95">
      
      {/* ZIGZAGマイクロアニメーション */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          {/* メインのジグザグライン */}
          <path
            d="M0,400 L100,300 L200,500 L300,200 L400,600 L500,100 L600,700 L700,150 L800,650 L900,200 L1000,550 L1100,250 L1200,450"
            stroke="url(#zigzagGradient1)"
            strokeWidth="3"
            fill="none"
            className={`transition-all duration-2000 ${mounted ? 'opacity-60' : 'opacity-0'}`}
            style={{
              strokeDasharray: '20 10',
              animation: 'zigzagFlow 8s linear infinite'
            }}
          />
          
          {/* セカンドライン */}
          <path
            d="M0,300 L150,450 L250,150 L350,550 L450,100 L550,600 L650,200 L750,500 L850,150 L950,450 L1050,300 L1200,400"
            stroke="url(#zigzagGradient2)"
            strokeWidth="2"
            fill="none"
            className={`transition-all duration-2000 ${mounted ? 'opacity-40' : 'opacity-0'}`}
            style={{
              strokeDasharray: '15 15',
              animation: 'zigzagFlow 12s linear infinite reverse'
            }}
          />
          
          {/* サードライン */}
          <path
            d="M0,500 L120,200 L240,600 L360,300 L480,700 L600,250 L720,550 L840,300 L960,600 L1080,350 L1200,500"
            stroke="url(#zigzagGradient3)"
            strokeWidth="1.5"
            fill="none"
            className={`transition-all duration-2000 ${mounted ? 'opacity-30' : 'opacity-0'}`}
            style={{
              strokeDasharray: '10 20',
              animation: 'zigzagFlow 10s linear infinite'
            }}
          />
          
          <defs>
            <linearGradient id="zigzagGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="zigzagGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="zigzagGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.4" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 繊細な背景パターン */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-32 w-32 h-32 bg-secondary rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-secondary rounded-full blur-2xl"></div>
      </div>

      {/* 動的なZIGZAGパーティクル */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/20 rounded-full transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${(i * 8 + 10) % 90}%`,
              top: `${(i * 11 + 15) % 80}%`,
              animation: `zigzagFloat ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
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
            機構部品メーカーが届けるジャパンクオリティ。
            <br />
            小ロットから大ロットまで対応いたします。
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="px-10 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105">
            製品を見る
          </button>
          <button className="px-10 py-4 border border-foreground/20 text-foreground rounded-lg font-medium text-lg hover:bg-foreground/5 transition-all duration-300 hover:scale-105">
            お問い合わせ
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

      {/* CSSアニメーション */}
      <style jsx>{`
        @keyframes zigzagFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 60; }
        }
        @keyframes zigzagFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(8px); }
          50% { transform: translateY(-3px) translateX(-6px); }
          75% { transform: translateY(-15px) translateX(12px); }
        }
      `}</style>
    </section>
  )
}