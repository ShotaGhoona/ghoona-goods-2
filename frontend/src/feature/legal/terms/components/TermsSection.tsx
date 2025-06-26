"use client"

import { useState, useEffect } from "react"
import { TermsSection as TermsSectionType } from "../data/termsData"

interface TermsSectionProps {
  section: TermsSectionType
  index: number
}

export default function TermsSection({ section, index }: TermsSectionProps) {
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

    const element = document.getElementById(`section-${section.id}`)
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [section.id])

  const getIconForSection = (sectionId: string) => {
    const iconMap: { [key: string]: string } = {
      'general-provisions': '📋',
      'service-usage': '🖥️',
      'orders-payments': '💳',
      'intellectual-property': '⚖️',
      'liability-disclaimer': '🛡️',
      'service-changes': '🔄',
      'dispute-resolution': '🤝',
      'miscellaneous': '📝'
    }
    return iconMap[sectionId] || '📄'
  }

  return (
    <section 
      id={`section-${section.id}`}
      className={`mb-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-2xl border border-border/30 p-8 hover:shadow-lg transition-all duration-500">
        {/* セクションタイトル */}
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
            <span className="text-primary text-xl">{getIconForSection(section.id)}</span>
          </div>
          <div>
            <span className="text-sm text-primary font-semibold block">第{index + 1}条</span>
            {section.title}
          </div>
        </h2>

        {/* メインコンテンツ */}
        <div className="space-y-4 mb-6">
          {section.content.map((paragraph, pIndex) => (
            <p key={pIndex} className="text-foreground/80 leading-relaxed pl-0 md:pl-16">
              {paragraph}
            </p>
          ))}
        </div>

        {/* サブセクション */}
        {section.subsections && (
          <div className="space-y-6 pl-0 md:pl-16">
            {section.subsections.map((subsection, subIndex) => (
              <div 
                key={subsection.id}
                className="bg-white/30 backdrop-blur-sm rounded-xl border border-border/20 py-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <div className="w-8 h-8 bg-primary/30 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-sm">{subIndex + 1}</span>
                  </div>
                  {subsection.title}
                </h3>
                
                <div className="space-y-3">
                  {subsection.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary/50 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-foreground/70 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}