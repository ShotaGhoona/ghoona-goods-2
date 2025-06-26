"use client"

import { useEffect, useState } from "react"

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

  const testimonials = [
    {
      name: "田中 美咲",
      company: "イベント企画会社",
      role: "代表取締役",
      content: "品質の高さに驚きました。細かいデザインも鮮明に再現され、お客様からも大変好評をいただいています。リピート注文は間違いなくお願いします。",
      rating: 5
    },
    {
      name: "佐藤 健太",
      company: "アニメ制作会社",
      role: "グッズ企画担当",
      content: "小ロットから対応していただき、テスト販売から本格展開まで一貫してサポートしていただきました。品質管理も徹底されており安心です。",
      rating: 5
    },
    {
      name: "山田 花子",
      company: "同人サークル",
      role: "サークル代表",
      content: "個人での注文でしたが、丁寧に対応していただきました。仕上がりのクオリティが想像以上で、次回のイベントでもお願いしたいと思います。",
      rating: 5
    }
  ]

  return (
    <section 
      id="testimonials-section"
      className="py-24 px-6 bg-gradient-to-b from-background to-secondary/5"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-light text-foreground mb-6">
            お客様の<span className="font-bold text-primary">声</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
            信頼いただいているお客様からの貴重なお声をご紹介します。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/20 transition-all duration-1000 hover:shadow-lg hover:shadow-primary/5 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200 + 300}ms` }}
            >
              {/* 星評価 */}
              <div className="flex space-x-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <div key={i} className="w-5 h-5 text-primary">★</div>
                ))}
              </div>

              {/* レビュー内容 */}
              <p className="text-foreground/80 leading-relaxed mb-8 font-light">
                "{testimonial.content}"
              </p>

              {/* お客様情報 */}
              <div className="border-t border-border/20 pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.company}</p>
                    <p className="text-xs text-foreground/50">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}