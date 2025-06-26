"use client"

import Image from "next/image"
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6"

export default function RefinedFooter() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: {
      title: "会社情報",
      links: [
        { name: "私たちについて", href: "/about" },
        { name: "会社概要", href: "/company" },
        { name: "ポートフォリオ", href: "/portfolio" },
        { name: "お客様の声", href: "/testimonials" },
        { name: "ニュース・お知らせ", href: "/news" }
      ]
    },
    products: {
      title: "商品・サービス",
      links: [
        { name: "オリジナル缶バッジ", href: "/products/original-badge" },
        { name: "通常缶バッジ", href: "/products/standard-badge" },
        { name: "アクリルスタンド", href: "/products/acrylic-stand" },
        { name: "アクリルキーホルダー", href: "/products/acrylic-keychain" },
        { name: "材料・素材情報", href: "/materials" }
      ]
    },
    support: {
      title: "サポート・ガイド",
      links: [
        { name: "よくある質問", href: "/faq" },
        { name: "お問い合わせ", href: "/contact" },
        { name: "返品・交換ポリシー", href: "/return-policy" },
        { name: "データ入稿ガイド", href: "/data-guide" },
        { name: "製造工程ガイド", href: "/manufacturing-guide" }
      ]
    },
    legal: {
      title: "法的・仕様情報",
      links: [
        { name: "プライバシーポリシー", href: "/privacy" },
        { name: "利用規約", href: "/terms" },
        { name: "特定商取引法", href: "/law" },
        { name: "サイズ・仕様ガイド", href: "/size-guide" }
      ]
    }
  }

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6">
        {/* メインフッターコンテンツ */}
        <div className="py-20 grid lg:grid-cols-5 gap-12">
          {/* 会社情報セクション */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <Image src="/logo.png" alt="GhoonaGoods" width={36} height={36} />
              <span className="text-2xl font-bold">GhoonaGoods</span>
            </div>
            <p className="text-secondary-foreground/70 leading-relaxed mb-8 font-light">
              機構部品メーカーとして培った技術力で、お客様のアイディアを最高品質のグッズとして形にします。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* フッターリンク - 4カラム構成 */}
          <div className="lg:col-span-4 grid md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-lg font-medium mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-secondary-foreground/70 hover:text-primary transition-colors duration-300 text-sm font-light"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 連絡先情報 */}
        <div className="py-12 border-t border-secondary-foreground/20">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-medium mb-4">お電話でのお問い合わせ</h4>
              <p className="text-2xl font-bold text-primary mb-2">03-1234-5678</p>
              <p className="text-sm text-secondary-foreground/70 font-light">
                平日 9:00-18:00（土日祝除く）
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">メールでのお問い合わせ</h4>
              <p className="text-lg font-medium text-primary mb-2">info@ghoonagoods.com</p>
              <p className="text-sm text-secondary-foreground/70 font-light">
                24時間受付（返信は営業時間内）
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">所在地</h4>
              <p className="text-sm text-secondary-foreground/70 leading-relaxed font-light">
                〒100-0001<br />
                東京都千代田区千代田1-1-1<br />
                グーナビル 5F
              </p>
            </div>
          </div>
        </div>

        {/* ボトムフッター */}
        <div className="py-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-secondary-foreground/50 font-light">
              © {currentYear} GhoonaGoods. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-sm text-secondary-foreground/50 hover:text-primary transition-colors font-light">
                プライバシーポリシー
              </a>
              <a href="/terms" className="text-sm text-secondary-foreground/50 hover:text-primary transition-colors font-light">
                利用規約
              </a>
              <a href="/sitemap" className="text-sm text-secondary-foreground/50 hover:text-primary transition-colors font-light">
                サイトマップ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* スクロールトップボタン */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg z-50"
        aria-label="トップへ戻る"
      >
        <div className="w-4 h-4 border-2 border-current border-b-0 border-r-0 transform rotate-45 -translate-y-0.5"></div>
      </button>
    </footer>
  )
}