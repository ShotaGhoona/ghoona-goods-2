"use client"

import { useState, useEffect } from "react"
import { FaStar, FaQuoteLeft, FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa'
import { Testimonial } from "../data/testimonialsData"

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
  featured?: boolean
}

export default function TestimonialCard({ testimonial, index, featured = false }: TestimonialCardProps) {
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

    const element = document.getElementById(`testimonial-${testimonial.id}`)
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [testimonial.id])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  const cardSizeClass = featured 
    ? "md:col-span-2 lg:col-span-3" 
    : "md:col-span-1"

  return (
    <div
      id={`testimonial-${testimonial.id}`}
      className={`${cardSizeClass} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm rounded-3xl border border-border/30 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 group h-full ${
        featured ? 'border-primary/30 shadow-xl' : ''
      }`}>
        
        {/* フィーチャードバッジ */}
        {featured && (
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
              <FaStar className="w-4 h-4 mr-2" />
              フィーチャード
            </div>
          </div>
        )}

        {/* 引用アイコンとレーティング */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <FaQuoteLeft className="w-6 h-6 text-primary" />
            </div>
            <div className="flex items-center space-x-1">
              {renderStars(testimonial.rating)}
            </div>
          </div>
          
          {testimonial.isVerified && (
            <div className="flex items-center space-x-1 bg-green-100/50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
              <FaCheckCircle className="w-3 h-3" />
              <span>認証済み</span>
            </div>
          )}
        </div>

        {/* カテゴリータグ */}
        <div className="mb-6">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            {testimonial.product}
          </span>
        </div>

        {/* メインテキスト */}
        <div className="mb-8">
          <p className={`text-foreground/80 leading-relaxed font-medium ${
            featured ? 'text-lg' : 'text-base'
          }`}>
            "{testimonial.testimonialText}"
          </p>
        </div>

        {/* ハイライト */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-foreground/70 mb-3">お客様が特に評価された点</h4>
          <div className="space-y-2">
            {testimonial.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center text-sm text-foreground/70">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 注文詳細 */}
        <div className="mb-8 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
          <h4 className="text-sm font-bold text-foreground/70 mb-3">ご注文詳細</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-foreground/50">数量</span>
              <div className="font-semibold text-foreground">{testimonial.orderDetails.quantity}個</div>
            </div>
            <div>
              <span className="text-foreground/50">納期</span>
              <div className="font-semibold text-foreground">{testimonial.orderDetails.deliveryTime}</div>
            </div>
            <div>
              <span className="text-foreground/50">満足度</span>
              <div className="font-semibold text-primary">{testimonial.orderDetails.satisfaction}</div>
            </div>
          </div>
        </div>

        {/* 顧客情報 */}
        <div className="border-t border-border/20 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <FaUser className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-bold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-foreground/60">{testimonial.position}</div>
                <div className="text-sm font-medium text-primary">{testimonial.company}</div>
              </div>
            </div>
          </div>
          
          {/* メタ情報 */}
          <div className="mt-4 flex items-center justify-between text-xs text-foreground/50">
            <div className="flex items-center space-x-1">
              <FaMapMarkerAlt className="w-3 h-3" />
              <span>{testimonial.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaCalendarAlt className="w-3 h-3" />
              <span>{testimonial.date}</span>
            </div>
          </div>

          {/* タグ */}
          <div className="mt-4 flex flex-wrap gap-2">
            {testimonial.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="bg-foreground/10 text-foreground/70 px-2 py-1 rounded-md text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}