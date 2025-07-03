"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ZigZagHeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* 派手なZIGZAG背景アニメーション */}
      <div className="absolute inset-0 opacity-30">
        {/* 大きなジグザグパターン */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform -skew-x-12 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-500/20 to-transparent transform skew-x-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* ジグザグ矢印のような形状 */}
        <div className="absolute top-1/4 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -skew-x-45 blur-sm animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-3 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 transform skew-x-45 blur-md animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transform -skew-x-45 blur-sm animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* 動的なジグザグ矢印エレメント */}
      <div className="absolute inset-0 pointer-events-none">
        {/* ジグザグ矢印群 */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`absolute transition-all duration-2000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
               style={{
                 left: `${10 + (i * 12)}%`,
                 top: `${20 + (i % 3) * 20}%`,
                 animationDelay: `${i * 0.3}s`
               }}>
            <div className="relative">
              {/* ジグザグ矢印のSVG風デザイン */}
              <div className="w-12 h-3 bg-gradient-to-r from-blue-400 to-purple-400 transform -skew-x-45 blur-[1px] animate-bounce"></div>
              <div className="w-8 h-3 bg-gradient-to-r from-purple-400 to-pink-400 transform skew-x-45 mt-1 ml-4 blur-[1px] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-12 h-3 bg-gradient-to-r from-pink-400 to-blue-400 transform -skew-x-45 mt-1 blur-[1px] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        ))}

        {/* 回転するジグザグサークル */}
        {[...Array(5)].map((_, i) => (
          <div key={`circle-${i}`} 
               className={`absolute w-20 h-20 border-2 border-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-spin transition-all duration-1500 ${mounted ? 'opacity-60' : 'opacity-0'}`}
               style={{
                 left: `${20 + (i * 15)}%`,
                 top: `${30 + (i % 2) * 40}%`,
                 animationDuration: `${3 + i}s`,
                 animationDelay: `${i * 0.5}s`
               }}>
            <div className="absolute inset-2 border border-pink-400 rounded-full animate-ping"></div>
          </div>
        ))}

        {/* 浮遊するジグザグ形状 */}
        {[...Array(12)].map((_, i) => (
          <div key={`float-${i}`}
               className={`absolute transition-all duration-1000 ${mounted ? 'opacity-100 animate-float' : 'opacity-0'}`}
               style={{
                 left: `${Math.random() * 80 + 10}%`,
                 top: `${Math.random() * 80 + 10}%`,
                 animationDelay: `${i * 0.2}s`,
                 animationDuration: `${2 + Math.random() * 3}s`
               }}>
            <div className={`w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-400 transform rotate-45 blur-[0.5px] ${i % 2 === 0 ? 'animate-pulse' : 'animate-ping'}`}></div>
          </div>
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center px-6">
        <div className={`transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* ブランドロゴ風 */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 leading-tight tracking-tight animate-pulse">
              ZIGZAGLAB
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto animate-pulse"></div>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight animate-fade-in-up">
            職人の技術が生み出す
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">世界に一つだけの特別なグッズ</span>
          </h2>
        </div>
        
        <div className={`transition-all duration-1000 ease-out delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            機構部品メーカーの精密技術による高品質製造
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">1個〜30万個まで対応</span>
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 ease-out delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="px-12 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 animate-pulse">
            無料見積もりを始める
          </button>
          <Link href="#portfolio" className="px-12 py-5 border-2 border-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl font-bold text-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/30">
            実績を見る
          </Link>
        </div>
      </div>

      {/* 派手なスクロールインジケーター */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-12 border-2 border-gradient-to-b from-blue-400 to-purple-400 rounded-full flex justify-center relative animate-pulse">
            <div className="w-2 h-4 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold tracking-wider animate-pulse">SCROLL DOWN</p>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>

      {/* CSS アニメーション */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </section>
  )
}