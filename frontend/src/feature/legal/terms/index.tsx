"use client"

import Hero from "@/components/common/Hero"
import TermsSection from "./components/TermsSection"
import TermsTableOfContents from "./components/TermsTableOfContents"
import TermsContact from "./components/TermsContact"
import { termsOfServiceData, lastUpdated } from "./data/termsData"

export default function Terms() {
  return (
    <div className="min-h-screen">
      <main>
        {/* ヒーローセクション */}
        <Hero
          title="利用"
          titleHighlight="規約"
          subtitle="サービス利用条件・規約"
          description="当社サービスをご利用いただくにあたっての条件・規約を定めております。ご利用前に必ずお読みください。"
          backgroundVariant="secondary"
          size="medium"
        />

        {/* 最終更新日・重要事項 */}
        <section className="py-8 px-6 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <p className="text-foreground/60">
                  最終更新日：<span className="font-semibold text-primary">{lastUpdated}</span>
                </p>
              </div>
              <div className="bg-orange-100/50 backdrop-blur-sm rounded-xl border border-orange-200/30 p-4">
                <div className="flex items-center">
                  <span className="text-orange-500 text-xl mr-3">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-orange-800 text-sm">重要</h4>
                    <p className="text-orange-700 text-xs">
                      サービス利用により本規約への同意とみなされます
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* メインコンテンツ */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* 目次（サイドバー） */}
              <div className="lg:col-span-1">
                <TermsTableOfContents sections={termsOfServiceData} />
              </div>

              {/* メインコンテンツ */}
              <div className="lg:col-span-3">
                <div className="space-y-0">
                  {termsOfServiceData.map((section, index) => (
                    <TermsSection 
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

        {/* お問い合わせセクション */}
        <TermsContact />

        {/* 関連リンク */}
        <section className="py-16 px-6 bg-gradient-to-br from-card/20 to-card/10">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              関連する法的文書
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="/privacy"
                className="group p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-border/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🔒</span>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    プライバシーポリシー
                  </h3>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  個人情報の取り扱いについて
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