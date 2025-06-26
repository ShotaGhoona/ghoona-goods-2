"use client"

import { useEffect, useState } from "react"
import { FaStar, FaQuoteLeft, FaCheckCircle } from 'react-icons/fa'
import { featuredTestimonials } from '@/feature/company/testimonials/data/testimonialsData'

export default function TestimonialsSection() {
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

    const section = document.getElementById('testimonials-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <section 
      id="testimonials-section"
      className="py-24 px-6 bg-gradient-to-b from-background to-secondary/5"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
              <FaQuoteLeft className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-foreground mb-6">
            お客様の<span className="font-bold text-primary">声</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
            127名のお客様からいただいた信頼の証。私たちの誇りです。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredTestimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm rounded-3xl p-8 border border-border/30 transition-all duration-1000 hover:shadow-2xl hover:scale-105 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200 + 300}ms` }}
            >
              {/* ヘッダー */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
                
                {testimonial.isVerified && (
                  <div className="flex items-center space-x-1 bg-green-100/50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    <FaCheckCircle className="w-3 h-3" />
                    <span>認証済み</span>
                  </div>
                )}
              </div>

              {/* 商品タグ */}
              <div className="mb-6">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  {testimonial.product}
                </span>
              </div>

              {/* レビュー内容 */}
              <div className="mb-6">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <FaQuoteLeft className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground/80 leading-relaxed font-medium text-sm">
                  {testimonial.testimonialText}
                </p>
              </div>

              {/* ハイライト */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-foreground/60 mb-2">特に評価された点</h4>
                <div className="space-y-1">
                  {testimonial.highlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-xs text-foreground/70">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* お客様情報 */}
              <div className="border-t border-border/20 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-foreground/60">{testimonial.position}</p>
                    <p className="text-xs font-medium text-primary">{testimonial.company}</p>
                  </div>
                </div>
                
                {/* メタ情報 */}
                <div className="mt-3 text-xs text-foreground/50">
                  {testimonial.location} • {testimonial.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* もっと見るリンク */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <a
            href="/testimonials"
            className="inline-flex items-center px-8 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-semibold transition-all duration-300 hover:scale-105 group"
          >
            すべてのお客様の声を見る
            <svg 
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}