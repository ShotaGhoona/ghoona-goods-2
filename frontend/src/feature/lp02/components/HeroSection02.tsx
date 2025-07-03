"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function HeroSection02() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-900">
      
      {/* 3D風ジグザグブロック */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute transition-all duration-2000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${5 + (i * 4.5) % 90}%`,
              top: `${10 + (i * 7) % 80}%`,
              transform: `rotate(${45 + (i * 15)}deg)`,
              animationDelay: `${i * 0.1}s`
            }}
          >
            <div className={`w-16 h-4 bg-gradient-to-r ${
              i % 4 === 0 ? 'from-blue-500 to-cyan-400' :
              i % 4 === 1 ? 'from-purple-500 to-pink-400' :
              i % 4 === 2 ? 'from-green-500 to-emerald-400' :
              'from-orange-500 to-yellow-400'
            } transform skew-x-12 blur-[0.5px] animate-pulse`}
              style={{ 
                animationDuration: `${2 + (i % 3)}s`,
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
            <div className={`w-16 h-4 bg-gradient-to-r ${
              i % 4 === 0 ? 'from-cyan-400 to-blue-600' :
              i % 4 === 1 ? 'from-pink-400 to-purple-600' :
              i % 4 === 2 ? 'from-emerald-400 to-green-600' :
              'from-yellow-400 to-orange-600'
            } transform -skew-x-12 mt-1 ml-2 blur-[0.5px] animate-pulse`}
              style={{ 
                animationDuration: `${2.5 + (i % 3)}s`,
                animationDelay: `${i * 0.2 + 0.5}s`
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* ジグザグボーダーパターン */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left"
             style={{
               clipPath: 'polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0, 100% 100%, 0 100%)'
             }}></div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transform origin-left"
             style={{
               clipPath: 'polygon(0 100%, 5% 0, 10% 100%, 15% 0, 20% 100%, 25% 0, 30% 100%, 35% 0, 40% 100%, 45% 0, 50% 100%, 55% 0, 60% 100%, 65% 0, 70% 100%, 75% 0, 80% 100%, 85% 0, 90% 100%, 95% 0, 100% 100%, 100% 0, 0 0)'
             }}></div>
      </div>

      {/* 回転するジグザグホイール */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`wheel-${i}`}
            className={`absolute w-32 h-32 transition-all duration-1500 ${mounted ? 'opacity-40' : 'opacity-0'}`}
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + ((i % 2) * 60)}%`,
              animation: `zigzagSpin ${4 + i}s linear infinite`,
              animationDelay: `${i * 0.8}s`
            }}
          >
            <div className="relative w-full h-full">
              {[...Array(8)].map((_, j) => (
                <div
                  key={j}
                  className={`absolute w-4 h-16 bg-gradient-to-b ${
                    j % 2 === 0 ? 'from-blue-400 to-purple-400' : 'from-purple-400 to-pink-400'
                  } origin-bottom`}
                  style={{
                    left: '50%',
                    bottom: '50%',
                    transform: `translateX(-50%) rotate(${j * 45}deg)`,
                    clipPath: 'polygon(30% 0%, 70% 0%, 90% 100%, 10% 100%)'
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* アニメーションするブランドロゴ */}
          <div className="mb-12 relative">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black mb-6 leading-none relative">
              <span className="inline-block relative">
                {['Z', 'I', 'G', 'Z', 'A', 'G'].map((letter, i) => (
                  <span
                    key={i}
                    className={`inline-block text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 animate-bounce`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '2s'
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              <br />
              <span className="text-white font-light">LAB</span>
            </h1>
            
            {/* ジグザグアンダーライン */}
            <div className="flex justify-center">
              <svg width="300" height="20" className="animate-pulse">
                <path
                  d="M10,15 L30,5 L50,15 L70,5 L90,15 L110,5 L130,15 L150,5 L170,15 L190,5 L210,15 L230,5 L250,15 L270,5 L290,15"
                  stroke="url(#underlineGradient)"
                  strokeWidth="3"
                  fill="none"
                />
                <defs>
                  <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            職人の技術が生み出す
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              世界に一つだけの特別なグッズ
            </span>
          </h2>
        </div>
        
        <div className={`transition-all duration-1000 ease-out delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
            機構部品メーカーの精密技術による高品質製造
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 font-semibold">
              1個〜30万個まで対応
            </span>
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 ease-out delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-2xl font-bold text-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50">
            <span className="relative z-10">無料見積もりを始める</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
          </button>
          <Link href="#portfolio" className="px-12 py-6 border-2 border-cyan-400/50 text-cyan-300 rounded-2xl font-bold text-xl hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-400/30">
            実績を見る
          </Link>
        </div>
      </div>

      {/* ジグザグスクロールインジケーター */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-8 h-14 border-2 border-cyan-400/40 rounded-full flex justify-center relative">
              <div className="w-2 h-6 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mt-2 animate-bounce"></div>
            </div>
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
          </div>
          <p className="text-sm text-cyan-300/80 font-medium tracking-wider">SCROLL</p>
          <svg width="30" height="10" className="animate-pulse">
            <path
              d="M2,5 L8,2 L14,8 L20,2 L26,8"
              stroke="#22d3ee"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* CSSアニメーション */}
      <style jsx>{`
        @keyframes zigzagSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </section>
  )
}