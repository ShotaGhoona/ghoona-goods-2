"use client"

import { useState } from "react"
import { FaBuilding, FaPhone, FaBox, FaDollarSign, FaCreditCard, FaTruck, FaUndo, FaChartLine, FaHandshake, FaBalanceScale } from 'react-icons/fa'
import { LawSection } from "../data/lawData"

interface LawTableOfContentsProps {
  sections: LawSection[]
}

export default function LawTableOfContents({ sections }: LawTableOfContentsProps) {
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
      'business-operator': <FaBuilding className="w-4 h-4" />,
      'contact-information': <FaPhone className="w-4 h-4" />,
      'product-service': <FaBox className="w-4 h-4" />,
      'pricing': <FaDollarSign className="w-4 h-4" />,
      'payment': <FaCreditCard className="w-4 h-4" />,
      'delivery': <FaTruck className="w-4 h-4" />,
      'returns': <FaUndo className="w-4 h-4" />,
      'additional-costs': <FaChartLine className="w-4 h-4" />,
      'complaints': <FaHandshake className="w-4 h-4" />
    }
    return iconComponents[sectionId] || <FaBalanceScale className="w-4 h-4" />
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm rounded-2xl border border-border/30 p-6 sticky top-36">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center">
        <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
          <FaBalanceScale className="w-4 h-4 text-primary" />
        </div>
        特定商取引法表記
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