"use client"

import { useState, useEffect } from "react"
import { PrivacySection as PrivacySectionType } from "../data/privacyData"

interface PrivacySectionProps {
  section: PrivacySectionType
  index: number
}

export default function PrivacySection({ section, index }: PrivacySectionProps) {
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

  return (
    <section 
      id={`section-${section.id}`}
      className={`mb-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm rounded-2xl border border-border/30 p-8 hover:shadow-lg transition-all duration-500">
        {/* セクションタイトル */}
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
            <span className="text-primary font-bold text-sm">{index + 1}</span>
          </div>
          {section.title}
        </h2>

        {/* メインコンテンツ */}
        <div className="space-y-4 mb-6">
          {section.content.map((paragraph, pIndex) => (
            <p key={pIndex} className="text-foreground/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* サブセクション */}
        {section.subsections && (
          <div className="space-y-6">
            {section.subsections.map((subsection, subIndex) => (
              <div 
                key={subsection.id}
                className="bg-white/30 backdrop-blur-sm rounded-xl border border-border/20 p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <div className="w-6 h-6 bg-primary/30 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold text-xs">{subIndex + 1}</span>
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