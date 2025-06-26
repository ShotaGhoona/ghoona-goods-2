"use client"

import { useState, useEffect } from "react"
import { FaHome, FaCog, FaQuestionCircle, FaRocket } from 'react-icons/fa'
import { MdEngineering, MdBuild } from 'react-icons/md'

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)

  const errorMessages = [
    "404 - ページが見つかりません",
    "お探しのページは存在しないようです",
    "機構部品のように精密に探しましたが...",
    "このURLは製造中止になりました"
  ]

  const quickLinks = [
    { href: "/", icon: FaHome, label: "ホームページ", description: "トップページに戻る" },
    { href: "/testimonials", icon: FaQuestionCircle, label: "お客様の声", description: "信頼の証をご覧ください" },
    { href: "/portfolio", icon: FaRocket, label: "制作実績", description: "私たちの技術力を確認" },
    { href: "/contact", icon: MdEngineering, label: "お問い合わせ", description: "何かお困りですか？" }
  ]

  useEffect(() => {
    setIsVisible(true)
    
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % errorMessages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [errorMessages.length])

  useEffect(() => {
    // パーティクルアニメーション用の要素を動的に生成
    const container = document.getElementById('particles-container')
    if (container) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: hsl(var(--primary));
          border-radius: 50%;
          opacity: 0.3;
          animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 2}s;
        `
        container.appendChild(particle)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* 背景パーティクル */}
      <div id="particles-container" className="absolute inset-0 pointer-events-none">
        {/* パーティクルは動的に生成 */}
      </div>

      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* メインビジュアル */}
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
                  <MdBuild className="w-16 h-16 text-primary animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                
                {/* 周りを回る小さなアイコン */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <FaCog className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 text-secondary" />
                  <FaCog className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                  <FaCog className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-5 text-secondary" />
                  <FaCog className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                </div>
              </div>
            </div>

            {/* エラーメッセージローテーション */}
            <div className="h-20 flex items-center justify-center mb-8">
              {errorMessages.map((message, index) => (
                <h1
                  key={index}
                  className={`absolute text-4xl md:text-6xl font-light text-foreground transition-all duration-500 ${
                    index === currentMessage 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-4'
                  }`}
                >
                  <span className="font-bold text-primary">404</span>
                  <span className="hidden md:inline"> - ページが見つかりません</span>
                </h1>
              ))}
            </div>

            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-8">
              申し訳ございません。お探しのページは移動または削除された可能性があります。<br />
            </p>
          </div>

          {/* クイックリンク */}
          <div className="mb-12">
            <h2 className="text-2xl font-light text-foreground mb-8">
              どちらをお探しでしたか？
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:shadow-xl hover:scale-105 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150 + 600}ms` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary/20 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
                      <link.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{link.label}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
      `}</style>
    </div>
  )
}