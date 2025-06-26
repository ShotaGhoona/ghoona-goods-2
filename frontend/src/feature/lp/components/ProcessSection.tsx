"use client"

import { useEffect, useState } from "react"

export default function ProcessSection() {
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

    const section = document.getElementById('process-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const processSteps = [
    {
      step: "01",
      title: "お見積り・ご相談",
      description: "お客様のご要望をお聞きし、最適なプランをご提案いたします。小さなことでもお気軽にご相談ください。",
      duration: "即日〜2営業日"
    },
    {
      step: "02", 
      title: "デザイン確認",
      description: "お客様からいただいたデザインデータを確認し、印刷に最適な形式に調整いたします。",
      duration: "1〜3営業日"
    },
    {
      step: "03",
      title: "サンプル制作",
      description: "ご希望に応じてサンプルを制作し、色味や品質をご確認いただきます。",
      duration: "3〜5営業日"
    },
    {
      step: "04",
      title: "本格生産",
      description: "確認後、機構部品メーカーの技術力を活かした高品質な製品を制作いたします。",
      duration: "5〜10営業日"
    },
    {
      step: "05",
      title: "品質検査・出荷",
      description: "厳格な品質検査を経て、丁寧に梱包してお客様のもとへお届けいたします。",
      duration: "1〜2営業日"
    }
  ]

  return (
    <section 
      id="process-section"
      className="py-24 px-6 bg-gradient-to-b from-secondary/5 to-background"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-light text-foreground mb-6">
            制作<span className="font-bold text-primary">プロセス</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
            お客様のアイディアが形になるまでの流れをご紹介します。
          </p>
        </div>

        <div className="relative">
          {/* プロセスライン */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/20 via-primary to-primary/20 hidden md:block"></div>

          <div className="space-y-16">
            {processSteps.map((process, index) => (
              <div 
                key={index}
                className={`relative grid md:grid-cols-2 gap-8 items-center transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200 + 300}ms` }}
              >
                {/* ステップ番号（中央） */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center z-10 hidden md:flex">
                  <span className="text-primary-foreground font-bold text-lg">{process.step}</span>
                </div>

                {/* 左側コンテンツ（偶数は右側） */}
                <div className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                  <div className={`${index % 2 === 0 ? 'md:ml-auto' : ''} max-w-md`}>
                    {/* モバイル用ステップ番号 */}
                    <div className="flex items-center space-x-4 mb-6 md:hidden">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">{process.step}</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-primary/20"></div>
                    </div>

                    <h3 className="text-2xl font-medium text-foreground mb-4">
                      {process.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed mb-4 font-light">
                      {process.description}
                    </p>
                    <div className="inline-flex items-center space-x-2 text-sm text-primary">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="font-medium">{process.duration}</span>
                    </div>
                  </div>
                </div>

                {/* 右側の空白（偶数時は左側） */}
                <div className={`hidden md:block ${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="px-10 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105">
            お見積りのご相談はこちら
          </button>
        </div>
      </div>
    </section>
  )
}