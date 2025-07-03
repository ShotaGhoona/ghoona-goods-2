"use client"

import { useEffect, useState } from "react"

export default function ContactSection() {
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

    const section = document.getElementById('contact-section')
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])


  return (
    <section 
      id="contact-section"
      className="py-24 px-6 bg-gradient-to-b from-background to-secondary/5"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-light text-foreground mb-6">
            お<span className="font-bold text-primary">問い合わせ</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
            ご質問やご相談など、お気軽にお問い合わせください。
          </p>
        </div>

        {/* 連絡先カード */}

        {/* お問い合わせフォーム */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card/30 backdrop-blur-sm rounded-3xl border border-border/20 p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-light text-foreground mb-4">
                お問い合わせ<span className="font-bold text-primary">フォーム</span>
              </h3>
              <p className="text-foreground/70 font-light">
                下記フォームよりお気軽にお問い合わせください
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    会社名（個人事業主の場合は個人とご記入ください） <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    placeholder="株式会社サンプル"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    placeholder="example@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    電話番号
                  </label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    placeholder="03-1234-5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  商品カテゴリ
                </label>
                <select className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300">
                  <option value="">選択してください</option>
                  <option value="can-badge">缶バッジ</option>
                  <option value="acrylic">アクリルグッズ</option>
                  <option value="peripheral">周辺グッズ</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
                  placeholder="お問い合わせ内容をお書きください。"
                ></textarea>
              </div>

              <div className="text-center">
                <button 
                  type="submit"
                  className="px-12 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/30"
                >
                  お問い合わせを送信する
                </button>
                <p className="text-xs text-foreground/60 mt-4 font-light">
                  送信いただいた内容は、営業時間内にご返信いたします。
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/6 left-1/12 w-60 h-60 bg-gradient-to-r from-primary/15 via-secondary/10 to-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/6 right-1/12 w-48 h-48 bg-gradient-to-r from-secondary/15 via-primary/10 to-secondary/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  )
}