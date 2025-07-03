"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function HeroSection04() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
      
      {/* アニメーションするZIGZAG線 - 白ベース */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          {/* メインのジグザグライン */}
          <path
            d="M0,400 L100,300 L200,500 L300,200 L400,600 L500,100 L600,700 L700,150 L800,650 L900,200 L1000,550 L1100,250 L1200,450"
            stroke="url(#zigzagGradient1White)"
            strokeWidth="4"
            fill="none"
            className={`transition-all duration-2000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{
              strokeDasharray: '20 10',
              animation: 'zigzagFlow 8s linear infinite'
            }}
          />
          
          {/* セカンドライン */}
          <path
            d="M0,300 L150,450 L250,150 L350,550 L450,100 L550,600 L650,200 L750,500 L850,150 L950,450 L1050,300 L1200,400"
            stroke="url(#zigzagGradient2White)"
            strokeWidth="3"
            fill="none"
            className={`transition-all duration-2000 ${mounted ? 'opacity-80' : 'opacity-0'}`}
            style={{
              strokeDasharray: '15 15',
              animation: 'zigzagFlow 12s linear infinite reverse'
            }}
          />
          
          {/* サードライン */}
          <path
            d="M0,500 L120,200 L240,600 L360,300 L480,700 L600,250 L720,550 L840,300 L960,600 L1080,350 L1200,500"
            stroke="url(#zigzagGradient3White)"
            strokeWidth="2"
            fill="none"
            className={`transition-all duration-2000 ${mounted ? 'opacity-60' : 'opacity-0'}`}
            style={{
              strokeDasharray: '10 20',
              animation: 'zigzagFlow 10s linear infinite'
            }}
          />
          
          <defs>
            <linearGradient id="zigzagGradient1White" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f3a522" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fb923c" stopOpacity="1" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="zigzagGradient2White" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#f3a522" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="zigzagGradient3White" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#84cc16" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f3a522" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 動的なZIGZAG背景パーティクル - 白ベース */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${(i * 7 + 10) % 90}%`,
              top: `${(i * 11 + 15) % 80}%`,
              animation: `zigzagFloat ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* 控えめな背景エフェクト - 白ベース */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-500 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* ブランドロゴ - 白ベース */}
          <div className="mb-12">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 animate-pulse">
                ZIGZAG
              </span>
              <span className="text-gray-800">LAB</span>
            </h1>
            <div className="flex justify-center">
              <div className="w-48 h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8 leading-tight">
            職人の技術が生み出す
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-700">
              世界に一つだけの特別なグッズ
            </span>
          </h2>
        </div>
        
        <div className={`transition-all duration-1000 ease-out delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            機構部品メーカーの精密技術による高品質製造
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-700 font-semibold">
              1個〜30万個まで対応
            </span>
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 ease-out delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="group px-12 py-6 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 text-white rounded-2xl font-bold text-xl hover:from-yellow-600 hover:via-orange-600 hover:to-amber-700 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/30 relative overflow-hidden">
            <span className="relative z-10">無料見積もりを始める</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <Link href="#portfolio" className="px-12 py-6 border-2 border-gray-800/30 text-gray-800 rounded-2xl font-bold text-xl hover:bg-gray-800/5 hover:border-gray-800/50 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-gray-800/20">
            実績を見る
          </Link>
        </div>
      </div>

      {/* スクロールインジケーター - 白ベース */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-14 border-2 border-gray-400/60 rounded-full flex justify-center relative">
            <div className="w-2 h-6 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-sm text-gray-500 font-medium tracking-wider">SCROLL</p>
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
          25% { transform: translateY(-15px) translateX(10px); }
          50% { transform: translateY(-5px) translateX(-8px); }
          75% { transform: translateY(-20px) translateX(15px); }
        }
      `}</style>
    </section>
  )
}