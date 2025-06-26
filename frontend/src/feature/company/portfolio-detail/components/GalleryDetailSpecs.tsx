"use client"

import { useState, useEffect } from "react"
import { PortfolioDetail } from "@/types/portfolio"

interface GalleryDetailSpecsProps {
  item: PortfolioDetail
}

export default function GalleryDetailSpecs({ item }: GalleryDetailSpecsProps) {
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

    const section = document.getElementById('detail-specs')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const getSpecs = () => {
    const specs = []
    
    if (item.specifications?.size) {
      specs.push({
        icon: "📏",
        label: "サイズ",
        value: item.specifications.size,
        color: "from-blue-500 to-blue-600"
      })
    }
    
    if (item.specifications?.material) {
      specs.push({
        icon: "🧪",
        label: "素材",
        value: item.specifications.material,
        color: "from-green-500 to-green-600"
      })
    }
    
    if (item.specifications?.printing) {
      specs.push({
        icon: "🎨",
        label: "印刷方式",
        value: item.specifications.printing,
        color: "from-purple-500 to-purple-600"
      })
    }
    
    if (item.specifications?.finishing) {
      specs.push({
        icon: "✨",
        label: "仕上げ",
        value: item.specifications.finishing,
        color: "from-orange-500 to-orange-600"
      })
    }
    
    if (item.specifications?.delivery_time) {
      specs.push({
        icon: "⏱️",
        label: "納期",
        value: item.specifications.delivery_time,
        color: "from-red-500 to-red-600"
      })
    }
    
    if (item.specifications?.price) {
      specs.push({
        icon: "💰",
        label: "価格",
        value: item.specifications.price,
        color: "from-yellow-500 to-yellow-600"
      })
    }
    
    return specs
  }

  const specs = getSpecs()

  // Don't render if no specifications
  if (specs.length === 0) {
    return null
  }

  return (
    <section id="detail-specs" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-light text-foreground mb-4">
            製品<span className="font-bold text-primary">仕様</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            このプロジェクトで使用した素材、印刷方式、仕上げ方法などの詳細仕様をご紹介します
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec, index) => (
            <div
              key={index}
              className={`bg-card/30 backdrop-blur-sm rounded-2xl border border-border/20 p-6 hover:bg-card/50 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${spec.color} rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0`}>
                  {spec.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {spec.label}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {spec.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 注意事項 */}
        <div className={`mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">💡</div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-2">
                  仕様に関する注意事項
                </h4>
                <div className="text-sm text-foreground/70 space-y-2">
                  <p>• 表示価格は参考価格です。数量やオプションにより変動する場合があります。</p>
                  <p>• 納期は通常時の目安です。繁忙期や特殊仕様の場合は別途ご相談ください。</p>
                  <p>• 素材や印刷方式はお客様のご要望に応じてカスタマイズ可能です。</p>
                  <p>• より詳細な仕様については、お気軽にお問い合わせください。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}