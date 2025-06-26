"use client"

import Hero from "@/components/common/Hero"
import PrivacySection from "./components/PrivacySection"
import PrivacyTableOfContents from "./components/PrivacyTableOfContents"
import { privacyPolicyData, lastUpdated } from "./data/privacyData"

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <main>
        {/* ヒーローセクション */}
        <Hero
          title="プライバシー"
          titleHighlight="ポリシー"
          subtitle="個人情報保護への取り組み"
          description="機構部品製造で培った品質管理基準を個人情報保護にも適用し、お客様の大切な情報を最高水準のセキュリティで保護いたします。"
          backgroundVariant="default"
          size="medium"
        />

        {/* 最終更新日 */}
        <section className="py-8 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-foreground/60">
                最終更新日：<span className="font-semibold text-primary">{lastUpdated}</span>
              </p>
            </div>
          </div>
        </section>

        {/* メインコンテンツ */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* 目次（サイドバー） */}
              <div className="lg:col-span-1">
                <PrivacyTableOfContents sections={privacyPolicyData} />
              </div>

              {/* メインコンテンツ */}
              <div className="lg:col-span-3">
                <div className="space-y-0">
                  {privacyPolicyData.map((section, index) => (
                    <PrivacySection 
                      key={section.id}
                      section={section}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 関連リンク */}
        <section className="py-16 px-6 bg-gradient-to-br from-card/20 to-card/10">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              関連する法的文書
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="/terms"
                className="group p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-border/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">📜</span>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    利用規約
                  </h3>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  サービス利用に関する条件・規約について
                </p>
              </a>

              <a
                href="/law"
                className="group p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-border/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">⚖️</span>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    特定商取引法表記
                  </h3>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  事業者情報・販売条件等の法的表記
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}