"use client"

import { useState, useEffect } from "react"
import { FaBuilding, FaPhone, FaBox, FaDollarSign, FaCreditCard, FaTruck, FaUndo, FaChartLine, FaHandshake, FaBalanceScale, FaEnvelope } from 'react-icons/fa'
import { LawSection as LawSectionType } from "../data/lawData"

interface LawSectionProps {
  section: LawSectionType
  index: number
}

export default function LawSection({ section, index }: LawSectionProps) {
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
    const iconComponents: { [key: string]: React.ReactNode } = {
      'business-operator': <FaBuilding className="w-6 h-6" />,
      'contact-information': <FaPhone className="w-6 h-6" />,
      'product-service': <FaBox className="w-6 h-6" />,
      'pricing': <FaDollarSign className="w-6 h-6" />,
      'payment': <FaCreditCard className="w-6 h-6" />,
      'delivery': <FaTruck className="w-6 h-6" />,
      'returns': <FaUndo className="w-6 h-6" />,
      'additional-costs': <FaChartLine className="w-6 h-6" />,
      'complaints': <FaHandshake className="w-6 h-6" />
    }
    return iconComponents[sectionId] || <FaBalanceScale className="w-6 h-6" />
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
            <div className="text-primary">{getIconForSection(section.id)}</div>
          </div>
          <div>
            <span className="text-sm text-primary font-semibold block">項目 {index + 1}</span>
            {section.title}
          </div>
        </h2>

        {/* メインコンテンツ */}
        <div className="space-y-4 mb-8 pl-0 md:pl-16">
          {section.content.map((paragraph, pIndex) => (
            <p key={pIndex} className="text-foreground/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* テーブルデータ */}
        {section.tableData && (
          <div className="pl-0 md:pl-16">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-border/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {section.tableData.map((item, itemIndex) => (
                      <tr 
                        key={itemIndex}
                        className={`${itemIndex % 2 === 0 ? 'bg-white/30' : 'bg-transparent'} hover:bg-primary/5 transition-colors duration-200`}
                      >
                        <td className="px-6 py-4 font-semibold text-foreground/80 border-r border-border/20 w-1/4">
                          {item.label}
                        </td>
                        <td className="px-6 py-4 text-foreground">
                          <div className="space-y-1">
                            <div className="font-medium">{item.value}</div>
                            {item.note && (
                              <div className="text-sm text-foreground/60 italic">
                                ※ {item.note}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 連絡先情報（特別表示） */}
        {section.contactInfo && (
          <div className="pl-0 md:pl-16 mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50/50 backdrop-blur-sm rounded-xl border border-blue-200/30 p-6">
                <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                  <FaPhone className="w-4 h-4 mr-2" />
                  お電話でのお問い合わせ
                </h4>
                <div className="space-y-2 text-blue-700">
                  <div className="text-xl font-bold">{section.contactInfo.phone}</div>
                  <div className="text-sm">{section.contactInfo.hours}</div>
                </div>
              </div>
              
              <div className="bg-green-50/50 backdrop-blur-sm rounded-xl border border-green-200/30 p-6">
                <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  メールでのお問い合わせ
                </h4>
                <div className="space-y-2 text-green-700">
                  <div className="font-medium">{section.contactInfo.email}</div>
                  <div className="text-sm">24時間受付（回答は営業時間内）</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}