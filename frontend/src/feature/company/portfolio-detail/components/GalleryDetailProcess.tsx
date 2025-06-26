"use client"

import { useState, useEffect } from "react"

export default function GalleryDetailProcess() {
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

    const section = document.getElementById('detail-process')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const processSteps = [
    {
      number: "01",
      title: "お打ち合わせ",
      description: "お客様のご要望を詳しくヒアリングし、最適な製品仕様をご提案いたします。",
      icon: "💬",
      duration: "1-2日"
    },
    {
      number: "02", 
      title: "デザイン制作",
      description: "専門デザイナーがお客様のイメージを形にし、印刷に最適なデータを作成します。",
      icon: "🎨",
      duration: "3-5日"
    },
    {
      number: "03",
      title: "サンプル確認",
      description: "実際の素材でサンプルを制作し、色味や質感をご確認いただきます。",
      icon: "🔍",
      duration: "2-3日"
    },
    {
      number: "04",
      title: "量産製造",
      description: "品質管理を徹底した工場で、高品質な製品を大量生産いたします。",
      icon: "🏭",
      duration: "7-10日"
    },
    {
      number: "05",
      title: "検品・梱包",
      description: "全数検品を行い、丁寧に梱包してお客様にお届けいたします。",
      icon: "📦",
      duration: "1-2日"
    }
  ]

  return (
    <section id="detail-process" className="py-20 px-6 bg-gradient-to-b from-primary/3 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-light text-foreground mb-4">
            製造<span className="font-bold text-primary">プロセス</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            お客様にご満足いただける製品をお届けするための、当社の製造プロセスをご紹介します
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-6"></div>
        </div>

        {/* プロセスタイムライン */}
        <div className="relative">
          {/* タイムライン線 */}
          <div className="absolute left-8 md:left-1/2 top-12 bottom-12 w-px bg-primary/20 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* ステップ番号（中央） */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center z-10">
                    <span className="text-primary-foreground font-bold text-lg">{step.number}</span>
                  </div>

                  {/* コンテンツカード */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto ml-24 md:ml-0' : 'md:ml-auto ml-24 md:ml-0'}`}>
                    <div className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/20 p-6 hover:bg-card/60 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-medium text-foreground">
                              {step.title}
                            </h3>
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-foreground/70 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 総期間 */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-border/20 p-8">
            <h3 className="text-2xl font-light text-foreground mb-4">
              トータル製造期間
            </h3>
            <p className="text-4xl font-bold text-primary mb-2">
              約15営業日
            </p>
            <p className="text-foreground/60">
              お打ち合わせから納品まで（標準的なケース）
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}