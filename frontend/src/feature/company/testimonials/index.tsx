"use client"

import { useState, useMemo } from "react"
import Hero from "@/components/common/Hero"
import TestimonialCard from "./components/TestimonialCard"
import TestimonialStats from "./components/TestimonialStats"
import TestimonialFilter from "./components/TestimonialFilter"
import InspirationalSection from "./components/InspirationalSection"
import { 
  testimonialsData, 
  testimonialStats, 
  heroTestimonial,
  filterTestimonials,
  TestimonialCategory 
} from "./data/testimonialsData"

export default function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState<TestimonialCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // フィルタリングされたお客様の声
  const filteredTestimonials = useMemo(() => {
    const category = selectedCategory === 'all' ? undefined : selectedCategory
    return filterTestimonials(testimonialsData, category, searchQuery)
  }, [selectedCategory, searchQuery])

  // フィーチャードお客様の声（検索・フィルターが適用されていない場合のみ表示）
  const showFeatured = selectedCategory === 'all' && !searchQuery
  const displayTestimonials = showFeatured 
    ? filteredTestimonials.filter(t => t.id !== heroTestimonial.id)
    : filteredTestimonials

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <main>
        {/* ヒーローセクション */}
        <Hero
          title="お客様の"
          titleHighlight="声"
          subtitle="信頼と満足の証明"
          description="127名のお客様からいただいた貴重なお声。一つひとつが私たちの誇りであり、さらなる品質向上への原動力です。"
          backgroundVariant="gradient"
          size="large"
          actions={
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="#testimonials-grid"
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                お客様の声を見る
              </a>
              <a
                href="/support/contact"
                className="px-8 py-3 bg-white/80 hover:bg-white text-primary border border-primary/30 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                お問い合わせ
              </a>
            </div>
          }
        />

        {/* 統計セクション */}
        <TestimonialStats stats={testimonialStats} />

        {/* フィーチャードお客様の声 */}
        {showFeatured && (
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                </div>
                <h2 className="text-4xl font-light text-foreground mb-4">
                  フィーチャード<span className="font-bold text-primary">お客様の声</span>
                </h2>
                <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                  特に印象的なお客様からのメッセージをご紹介
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <TestimonialCard 
                  testimonial={heroTestimonial} 
                  index={0} 
                  featured={true}
                />
              </div>
            </div>
          </section>
        )}

        {/* お客様の声一覧 */}
        <section id="testimonials-grid" className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            
            {/* セクションヘッダー */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-foreground mb-4">
                すべての<span className="font-bold text-primary">お客様の声</span>
              </h2>
              <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                様々な業界・用途でご利用いただいているお客様からの生の声をお聞きください
              </p>
            </div>

            {/* フィルター */}
            <TestimonialFilter
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchQuery}
              totalResults={filteredTestimonials.length}
            />

            {/* 結果表示 */}
            {filteredTestimonials.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  該当するお客様の声が見つかりませんでした
                </h3>
                <p className="text-foreground/60 mb-6">
                  検索条件を変更してもう一度お試しください
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSearchQuery('')
                  }}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  フィルターをリセット
                </button>
              </div>
            ) : (
              <>
                {/* 結果サマリー */}
                <div className="mb-8 text-center">
                  <p className="text-foreground/70">
                    {filteredTestimonials.length}件のお客様の声
                    {selectedCategory !== 'all' && ` (${selectedCategory}カテゴリー)`}
                    {searchQuery && ` ("${searchQuery}"の検索結果)`}
                  </p>
                </div>

                {/* お客様の声グリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {displayTestimonials.map((testimonial, index) => (
                    <TestimonialCard 
                      key={testimonial.id} 
                      testimonial={testimonial} 
                      index={index}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* インスピレーショナルセクション */}
        <InspirationalSection />

        {/* お客様の声投稿促進セクション */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm rounded-3xl border border-border/30 p-12 text-center">
              
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
              </div>

              <h2 className="text-3xl font-light text-foreground mb-4">
                あなたの声も<span className="font-bold text-primary">聞かせてください</span>
              </h2>
              
              <p className="text-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
                GhoonaGoodsをご利用いただいたお客様の声は、私たちにとって何よりも貴重な財産です。
                ぜひあなたの体験もシェアしていただけませんか？
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 text-xl">📱</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">簡単投稿</h4>
                  <p className="text-sm text-foreground/60">お問い合わせフォームから簡単にご投稿いただけます</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 text-xl">🎁</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">特典あり</h4>
                  <p className="text-sm text-foreground/60">採用されたお客様には次回割引クーポンをプレゼント</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 text-xl">🌟</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">品質向上</h4>
                  <p className="text-sm text-foreground/60">いただいた声は全てサービス改善に活かします</p>
                </div>
              </div>

              <a
                href="/support/contact"
                className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                レビューを投稿する
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}