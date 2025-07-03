"use client"

export default function ZigZagLabFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-secondary via-secondary/95 to-secondary text-secondary-foreground overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path
            d="M0,200 L100,150 L200,250 L300,100 L400,300 L500,50 L600,350 L700,75 L800,325 L900,100 L1000,275 L1100,125 L1200,225"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            strokeDasharray="15 10"
          />
          <path
            d="M0,150 L150,225 L250,75 L350,275 L450,50 L550,300 L650,100 L750,250 L850,75 L950,225 L1050,150 L1200,200"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="10 15"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className="relative container mx-auto px-6">
        {/* メインコンテンツ */}
        <div className="py-16">
          {/* ブランドセクション */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">
              ZIGZAGLab
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-secondary-foreground/80 max-w-3xl mx-auto leading-relaxed font-light">
              機構部品メーカーとして培った技術力で、
              <br className="hidden md:block" />
              お客様のアイディアを最高品質のグッズとして形にします。
            </p>
          </div>
        </div>

        {/* ボトムフッター */}
        <div className="py-8 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/60 font-light">
              © {currentYear} ZIGZAGLab. All rights reserved.
            </p>
            <div className="flex space-x-8">
              {/* <a href="/privacy" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors duration-300 font-light hover:underline">
                プライバシーポリシー
              </a>
              <a href="/terms" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors duration-300 font-light hover:underline">
                利用規約
              </a> */}
              <a href="#contact" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors duration-300 font-light hover:underline">
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* スクロールトップボタン */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-primary to-secondary text-white rounded-2xl flex items-center justify-center hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-xl hover:shadow-primary/30 z-50 group"
        aria-label="トップへ戻る"
      >
        <div className="w-5 h-5 border-2 border-current border-b-0 border-r-0 transform rotate-45 -translate-y-0.5 group-hover:scale-110 transition-transform duration-300"></div>
      </button>
    </footer>
  )
}