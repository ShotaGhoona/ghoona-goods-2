"use client"

import { useState } from "react"

interface FAQHeroProps {
  onSearch: (query: string) => void;
}

export default function FAQHero({ onSearch }: FAQHeroProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light text-foreground mb-6">
            よくある<span className="font-bold text-primary">質問</span>
          </h1>
          <p className="text-xl text-foreground/70 mb-12 leading-relaxed">
            お客様からよくお寄せいただくご質問にお答えします。<br />
            迅速な問題解決をサポートし、安心してご利用いただけるよう努めています。
          </p>

          {/* 検索フォーム */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="キーワードを入力して検索..."
                className="w-full px-6 py-4 pl-14 text-lg border border-border/30 rounded-2xl bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
              />
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors duration-300"
              >
                検索
              </button>
            </div>
          </form>

          {/* 利用メリット */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/20">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">迅速な解決</h3>
              <p className="text-foreground/60 text-sm">
                よくある質問を事前に確認することで、すぐに疑問を解決できます
              </p>
            </div>

            <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/20">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">24時間対応</h3>
              <p className="text-foreground/60 text-sm">
                営業時間外でも、FAQで疑問を解決していただけます
              </p>
            </div>

            <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/20">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">詳細な回答</h3>
              <p className="text-foreground/60 text-sm">
                専門的な内容も分かりやすく、詳細に解説しています
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}