"use client"

import { useState, useEffect } from "react"
import { FaHeart, FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { inspiringQuotes } from "../data/testimonialsData"

export default function InspirationalSection() {
  const [currentQuote, setCurrentQuote] = useState(0)
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
      { threshold: 0.3 }
    )

    const element = document.getElementById('inspirational-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspiringQuotes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % inspiringQuotes.length)
  }

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + inspiringQuotes.length) % inspiringQuotes.length)
  }

  return (
    <section 
      id="inspirational-section"
      className={`py-20 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        
        {/* 背景装飾 */}
        <div className="relative">
          {/* メインコンテンツ */}
          <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl border border-primary/20 p-12 text-center relative overflow-hidden">
            
            {/* 装飾的な背景要素 */}
            <div className="absolute top-6 left-6 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-6 right-6 w-24 h-24 bg-secondary/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-2xl"></div>
            
            {/* ヘッダー */}
            <div className="relative z-10 mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl flex items-center justify-center">
                  <FaHeart className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-light text-foreground mb-4">
                私たちの<span className="font-bold text-primary">想い</span>
              </h2>
              <p className="text-foreground/70 text-lg">
                お客様の笑顔のために、心を込めて
              </p>
            </div>

            {/* 引用セクション */}
            <div className="relative z-10 mb-8">
              <div className="flex justify-center mb-6">
                <FaQuoteLeft className="w-8 h-8 text-primary/40" />
              </div>
              
              <div className="relative h-32 flex items-center justify-center">
                {inspiringQuotes.map((quote, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                      index === currentQuote 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-4'
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-4">
                        {quote.quote}
                      </p>
                      <div className="text-primary font-semibold">
                        - {quote.author}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <FaQuoteRight className="w-8 h-8 text-primary/40" />
              </div>
            </div>

            {/* ナビゲーション */}
            <div className="relative z-10 flex items-center justify-center space-x-6">
              <button
                onClick={prevQuote}
                className="w-10 h-10 bg-white/60 hover:bg-white/80 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <FaChevronLeft className="w-4 h-4 text-primary" />
              </button>
              
              <div className="flex space-x-2">
                {inspiringQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentQuote 
                        ? 'bg-primary' 
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextQuote}
                className="w-10 h-10 bg-white/60 hover:bg-white/80 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <FaChevronRight className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>

          {/* CTA セクション */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm rounded-2xl border border-border/30 p-8">
              <h3 className="text-2xl font-light text-foreground mb-4">
                あなたの想いも<span className="font-bold text-primary">カタチ</span>にしませんか？
              </h3>
              <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                お客様一人ひとりの大切な想いを、私たちの技術と情熱で形にします。
                まずはお気軽にご相談ください。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/support/contact"
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  お問い合わせ
                </a>
                <a
                  href="/portfolio"
                  className="px-8 py-3 bg-white/80 hover:bg-white text-primary border border-primary/30 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  制作実績を見る
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}