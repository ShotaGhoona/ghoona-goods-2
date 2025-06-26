"use client"

import Hero from "@/components/common/Hero"
import LawSection from "./components/LawSection"
import LawTableOfContents from "./components/LawTableOfContents"
import { FaBalanceScale } from 'react-icons/fa'
import { specialCommercialLawData, lastUpdated } from "./data/lawData"

export default function SpecialCommercialLaw() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <main>
        <Hero
          title="特定商取引法に基づく"
          titleHighlight="表記"
          subtitle="法的義務の履行・透明性確保"
          description="特定商取引法第11条（通信販売についての広告）の規定に基づき、販売事業者情報、取引条件等を明記いたします。"
          backgroundVariant="gradient"
          size="medium"
        />

        <section className="py-20 px-6 relative">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* 目次サイドバー */}
              <div className="lg:col-span-1">
                <LawTableOfContents sections={specialCommercialLawData} />
              </div>

              {/* メインコンテンツ */}
              <div className="lg:col-span-3">
                <div className="space-y-16">
                  {specialCommercialLawData.map((section, index) => (
                    <LawSection 
                      key={section.id} 
                      section={section} 
                      index={index} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 背景装飾 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-20 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>
    </div>
  )
}