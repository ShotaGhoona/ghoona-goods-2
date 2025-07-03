"use client"

import { useEffect, useState } from "react"

export default function HeroSection05() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-background/95">
      
      {/* 大胆なZIGZAGアニメーション */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 2000 1000" preserveAspectRatio="none">
          {/* メインZigZag */}
          <path
            d="M-200,500 L200,200 L600,800 L1000,200 L1400,800 L1800,200 L2200,600"
            fill="none"
            stroke="url(#zigzagGradient1)"
            strokeWidth="120"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={`transition-all duration-2000 ${mounted ? 'opacity-100' : 'opacity-0'} hidden md:block`}
            style={{
              animation: 'zigzagSweep 20s linear infinite'
            }}
          />
          
          {/* セカンダリZigZag */}
          <path
            d="M-100,600 L300,250 L700,850 L1100,250 L1500,850 L1900,250 L2300,700"
            fill="none"
            stroke="url(#zigzagGradient2)"
            strokeWidth="60"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={`transition-all duration-2000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{
              animation: 'zigzagSweep 15s linear infinite reverse'
            }}
          />
          
          {/* アクセントZigZag */}
          <path
            d="M-300,400 L100,150 L500,750 L900,150 L1300,750 L1700,150 L2100,550"
            fill="none"
            stroke="url(#zigzagGradient3)"
            strokeWidth="200"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={`transition-all duration-2000 ${mounted ? 'opacity-100' : 'opacity-0'} hidden sm:block`}
            style={{
              animation: 'zigzagSweep 25s linear infinite'
            }}
          />
          
          {/* モバイル用簡素化ZigZag */}
          <path
            d="M-100,500 L300,300 L700,700 L1100,300 L1500,700 L1900,300 L2300,500"
            fill="none"
            stroke="url(#zigzagGradient1)"
            strokeWidth="80"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={`transition-all duration-2000 ${mounted ? 'opacity-100' : 'opacity-0'} block md:hidden`}
            style={{
              animation: 'zigzagSweep 18s linear infinite'
            }}
          />
          
          <defs>
            <linearGradient id="zigzagGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(156, 163, 175, 0)" />
              <stop offset="30%" stopColor="rgba(156, 163, 175, 0.3)" />
              <stop offset="70%" stopColor="rgba(156, 163, 175, 0.3)" />
              <stop offset="100%" stopColor="rgba(156, 163, 175, 0)" />
            </linearGradient>
            <linearGradient id="zigzagGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(107, 114, 128, 0)" />
              <stop offset="40%" stopColor="rgba(107, 114, 128, 0.2)" />
              <stop offset="60%" stopColor="rgba(107, 114, 128, 0.2)" />
              <stop offset="100%" stopColor="rgba(107, 114, 128, 0)" />
            </linearGradient>
            <linearGradient id="zigzagGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(209, 213, 219, 0)" />
              <stop offset="40%" stopColor="rgba(209, 213, 219, 0.08)" />
              <stop offset="60%" stopColor="rgba(209, 213, 219, 0.08)" />
              <stop offset="100%" stopColor="rgba(209, 213, 219, 0)" />
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
        {/* 移動をスムーズにしたい */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
            <button className="px-10 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            onClick={() => {
              const section = document.getElementById('integrated-product-section')
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            >
              製品を見る
            </button>
          
            <button className="px-10 py-4 border border-foreground/20 text-foreground rounded-lg font-medium text-lg hover:bg-foreground/5 transition-all duration-300 hover:scale-105"
            onClick={() => {
              const section = document.getElementById('contact-section')
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            >
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
        @keyframes zigzagSweep {
          0% { 
            transform: translateX(-15%);
            opacity: 0;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(15%);
            opacity: 0;
          }
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