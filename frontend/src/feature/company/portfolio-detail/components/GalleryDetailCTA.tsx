"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function GalleryDetailCTA() {
  const router = useRouter()
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

    const section = document.getElementById('detail-cta')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: "⚡",
      title: "迅速対応",
      description: "最短15営業日での納品が可能"
    },
    {
      icon: "🎯",
      title: "高品質",
      description: "厳格な品質管理で99%以上の合格率"
    },
    {
      icon: "💡",
      title: "提案力",
      description: "お客様の要望を超える提案力"
    },
    {
      icon: "💰",
      title: "適正価格",
      description: "コストパフォーマンスに優れた価格設定"
    }
  ]

  return (
    <section id="detail-cta" className="py-20 px-6 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
            あなたの<span className="font-bold text-primary">アイデア</span>を<br />
            <span className="font-bold text-primary">カタチ</span>にしませんか？
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            この実績と同様の高品質な製品を、あなたのプロジェクトでも実現できます。<br />
            まずはお気軽にご相談ください。
          </p>
        </div>

        {/* 特徴 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/20 p-6 hover:bg-card/60 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/70">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAボタン */}
        <div className={`text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/20 p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* お見積もり */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-foreground">
                  無料お見積もり
                </h3>
                <p className="text-foreground/70 text-sm">
                  具体的なご要望をお聞かせください。<br />
                  24時間以内にお見積もりをお送りします。
                </p>
                <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
                  見積もり依頼
                </button>
              </div>

              {/* お問い合わせ */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-foreground">
                  お気軽にご相談
                </h3>
                <p className="text-foreground/70 text-sm">
                  どんな小さなことでもお気軽に。<br />
                  専門スタッフが丁寧にお答えします。
                </p>
                <button className="w-full px-6 py-3 bg-card border border-border text-foreground rounded-xl font-medium hover:bg-card/80 transition-colors">
                  お問い合わせ
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/20">
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-foreground/60">
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>03-1234-5678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✉️</span>
                  <span>info@ghoonagoods.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>⏰</span>
                  <span>平日 9:00-18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button 
            onClick={() => router.push('/gallery')}
            className="px-6 py-3 text-foreground/60 hover:text-foreground transition-colors flex items-center space-x-2 mx-auto"
          >
            <span>←</span>
            <span>製造実績一覧に戻る</span>
          </button>
        </div>
      </div>
    </section>
  )
}