"use client"

import { useState } from "react"
import { FaFileContract, FaDesktop, FaCreditCard, FaBalanceScale, FaSync, FaHandshake, FaFileAlt, FaScroll } from 'react-icons/fa'
import { TermsSection } from "../data/termsData"

interface TermsTableOfContentsProps {
  sections: TermsSection[]
}

export default function TermsTableOfContents({ sections }: TermsTableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("")

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  const getIconForSection = (sectionId: string) => {
    const iconComponents: { [key: string]: React.ReactNode } = {
      'general-provisions': <FaFileContract className="w-4 h-4" />,
      'service-usage': <FaDesktop className="w-4 h-4" />,
      'orders-payments': <FaCreditCard className="w-4 h-4" />,
      'intellectual-property': <FaBalanceScale className="w-4 h-4" />,
      'liability-disclaimer': <FaBalanceScale className="w-4 h-4" />,
      'service-changes': <FaSync className="w-4 h-4" />,
      'dispute-resolution': <FaHandshake className="w-4 h-4" />,
      'miscellaneous': <FaFileAlt className="w-4 h-4" />
    }
    return iconComponents[sectionId] || <FaFileAlt className="w-4 h-4" />
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm rounded-2xl border border-border/30 p-6 sticky top-24">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center">
        <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
          <FaScroll className="w-4 h-4 text-primary" />
        </div>
        利用規約 目次
      </h3>
      
      <nav className="space-y-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
              activeSection === section.id
                ? 'bg-primary/20 text-primary font-medium'
                : 'hover:bg-white/30 text-foreground/70 hover:text-foreground'
            }`}
          >
            <div className="flex items-center">
              <div className="text-primary mr-3">{getIconForSection(section.id)}</div>
              <span className="text-sm font-medium">{section.title}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  )
}