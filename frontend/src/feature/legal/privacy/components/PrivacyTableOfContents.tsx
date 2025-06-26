"use client"

import { useState } from "react"
import { FaList } from 'react-icons/fa'
import { PrivacySection } from "../data/privacyData"

interface PrivacyTableOfContentsProps {
  sections: PrivacySection[]
}

export default function PrivacyTableOfContents({ sections }: PrivacyTableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("")

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm rounded-2xl border border-border/30 p-6 sticky top-36">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
        <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
          <FaList className="w-4 h-4 text-primary" />
        </div>
        目次
      </h3>
      
      <nav className="space-y-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full text-left p-3 rounded-xl transition-all duration-300 group ${
              activeSection === section.id
                ? 'bg-primary/20 text-primary font-medium'
                : 'hover:bg-white/30 text-foreground/70 hover:text-foreground'
            }`}
          >
            <div className="flex items-center">
              <span className={`text-xs font-bold w-6 h-6 rounded-lg flex items-center justify-center mr-3 transition-colors duration-300 ${
                activeSection === section.id
                  ? 'bg-primary/30 text-primary'
                  : 'bg-gray-200/50 text-gray-600 group-hover:bg-primary/20 group-hover:text-primary'
              }`}>
                {index + 1}
              </span>
              <span className="text-sm">{section.title}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  )
}