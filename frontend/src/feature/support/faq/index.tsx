"use client"

import { useState } from "react"
import Hero from "@/components/common/Hero"
import FAQCategories from "./components/FAQCategories"
import FAQContact from "./components/FAQContact"
import { faqCategories, faqData, searchFAQs, FAQItem } from "./data/faqData"

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<FAQItem[]>(faqData)

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setSearchResults(faqData)
      setSelectedCategory(null)
    } else {
      const results = searchFAQs(query)
      setSearchResults(results)
      setSelectedCategory(null)
    }
  }

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    setSearchResults(faqData)
  }

  return (
    <div className="min-h-screen">
      <main>
        {/* ヒーローセクション */}
        <Hero
          title="よくある"
          titleHighlight="質問"
          subtitle="迅速な問題解決をサポート"
          description="お客様からよくお寄せいただくご質問にお答えします。安心してご利用いただけるよう、分かりやすく説明いたします。"
          backgroundVariant="default"
          size="medium"
        />
        
        {/* カテゴリー別FAQ */}
        <FAQCategories
          categories={faqCategories}
          faqs={searchResults}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          onSearch={handleSearch}
        />
        
        {/* お問い合わせ誘導 */}
        <FAQContact />
      </main>
    </div>
  )
}