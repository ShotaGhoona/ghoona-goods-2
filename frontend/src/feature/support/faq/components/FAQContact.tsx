"use client"

import Link from "next/link"

export default function FAQContact() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            解決しない場合は<span className="text-primary">お気軽にお問い合わせください</span>
          </h2>
          <p className="text-xl text-foreground/70 mb-12 leading-relaxed">
            FAQで解決できなかった疑問や、より詳細な技術相談は<br />
            専門スタッフが丁寧にサポートいたします
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* 専門スタッフ相談 */}
            <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">専門スタッフへの相談</h3>
              <p className="text-foreground/60 mb-6 leading-relaxed">
                技術的な疑問や仕様に関する詳細なご質問は、機構部品のプロフェッショナルが直接お答えします
              </p>
              <Link
                href="/support/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors duration-300 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                お問い合わせ
              </Link>
            </div>

            {/* 見積もり・技術相談 */}
            <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">見積もり・技術相談</h3>
              <p className="text-foreground/60 mb-6 leading-relaxed">
                具体的なプロジェクトのお見積もりや、特殊仕様への対応可能性について無料でご相談いただけます
              </p>
              <Link
                href="/support/contact?type=estimate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/90 transition-colors duration-300 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                見積もり依頼
              </Link>
            </div>

            {/* 電話サポート */}
            <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">お電話でのサポート</h3>
              <p className="text-foreground/60 mb-4 leading-relaxed">
                急ぎのご質問や複雑な内容は、お電話で直接ご相談いただけます
              </p>
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-primary mb-1">03-1234-5678</p>
                <p className="text-sm text-foreground/60">平日 9:00-18:00（土日祝除く）</p>
              </div>
              <a
                href="tel:03-1234-5678"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors duration-300 font-medium w-full justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                今すぐ電話
              </a>
            </div>
          </div>

          {/* 追加サポート情報 */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-xl font-semibold text-foreground mb-4">その他のサポート情報</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  技術資料・ガイド
                </h4>
                <ul className="space-y-2 text-foreground/60">
                  <li>• <Link href="/support/data-guide" className="hover:text-primary transition-colors">データ入稿ガイド</Link></li>
                  <li>• <Link href="/support/manufacturing-guide" className="hover:text-primary transition-colors">製造工程ガイド</Link></li>
                  <li>• <Link href="/legal/size-guide" className="hover:text-primary transition-colors">サイズ・仕様ガイド</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ポリシー・規約
                </h4>
                <ul className="space-y-2 text-foreground/60">
                  <li>• <Link href="/support/return-policy" className="hover:text-secondary transition-colors">返品・交換ポリシー</Link></li>
                  <li>• <Link href="/legal/privacy" className="hover:text-secondary transition-colors">プライバシーポリシー</Link></li>
                  <li>• <Link href="/legal/terms" className="hover:text-secondary transition-colors">利用規約</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}