"use client"

import { useState, useEffect } from "react"
import { companyInfo } from "../data/termsData"

export default function TermsContact() {
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

    const element = document.getElementById('terms-contact')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const contactTypes = [
    {
      icon: "📋",
      title: "規約に関するお問い合わせ",
      description: "利用規約の内容・解釈についてのご質問",
      response: "3営業日以内"
    },
    {
      icon: "⚖️",
      title: "法的事項のご相談",
      description: "契約条件・権利関係についてのご相談", 
      response: "5営業日以内"
    },
    {
      icon: "🤝",
      title: "紛争・トラブルのご相談",
      description: "サービス利用に関するトラブル・苦情",
      response: "1営業日以内"
    }
  ]

  return (
    <section 
      id="terms-contact"
      className={`py-20 px-6 bg-gradient-to-br from-secondary/5 to-primary/5 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            利用規約に関する<span className="text-primary">お問い合わせ</span>
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            利用規約について不明な点がございましたら、お気軽にお問い合わせください。法務担当者が丁寧にお答えいたします。
          </p>
        </div>

        {/* お問い合わせ種別 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactTypes.map((type, index) => (
            <div 
              key={index}
              className={`bg-white/50 backdrop-blur-sm rounded-2xl border border-border/30 p-6 hover:shadow-lg transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{type.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {type.title}
                </h3>
                <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                  {type.description}
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-green-100/50 text-green-800 rounded-full text-xs font-medium">
                  <span className="mr-1">⏰</span>
                  回答目安: {type.response}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 連絡先情報 */}
        <div className="bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-sm rounded-2xl border border-border/30 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 基本情報 */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <span className="mr-3">🏢</span>
                事業者情報
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="w-20 text-sm font-medium text-foreground/60 flex-shrink-0">会社名</span>
                  <span className="text-foreground font-medium">{companyInfo.name}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-20 text-sm font-medium text-foreground/60 flex-shrink-0">所在地</span>
                  <span className="text-foreground">{companyInfo.address}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-20 text-sm font-medium text-foreground/60 flex-shrink-0">電話</span>
                  <span className="text-foreground">{companyInfo.phone}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-20 text-sm font-medium text-foreground/60 flex-shrink-0">FAX</span>
                  <span className="text-foreground">{companyInfo.fax}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-20 text-sm font-medium text-foreground/60 flex-shrink-0">メール</span>
                  <span className="text-foreground">{companyInfo.email}</span>
                </div>
                <div className="flex items-start">
                  <span className="w-20 text-sm font-medium text-foreground/60 flex-shrink-0">受付時間</span>
                  <span className="text-foreground">{companyInfo.businessHours}</span>
                </div>
              </div>
            </div>

            {/* 対応方針 */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <span className="mr-3">📞</span>
                対応方針
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/30">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <span className="mr-2">💬</span>
                    誠実な対応
                  </h4>
                  <p className="text-blue-700 text-sm">
                    お客様の立場に立った、丁寧で分かりやすい説明を心がけます
                  </p>
                </div>
                
                <div className="p-4 bg-green-50/50 rounded-xl border border-green-200/30">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <span className="mr-2">⚡</span>
                    迅速な回答
                  </h4>
                  <p className="text-green-700 text-sm">
                    法務担当者が速やかに確認し、適切な回答をお送りします
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-200/30">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                    <span className="mr-2">🔒</span>
                    機密保持
                  </h4>
                  <p className="text-purple-700 text-sm">
                    お客様の情報は適切に管理し、機密性を確保いたします
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* お問い合わせボタン */}
          <div className="mt-8 text-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 group"
            >
              <span className="mr-2">📧</span>
              利用規約について問い合わせる
              <svg 
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}